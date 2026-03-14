const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { 
    cors: { origin: "*" }, 
    maxHttpBufferSize: 1e8 // Поддержка больших файлов до 100МБ
});
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// --- НАСТРОЙКИ БАЗЫ ДАННЫХ ---
const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };

// Загрузка данных при старте
if (fs.existsSync(DB_FILE)) { 
    try { 
        const rawData = fs.readFileSync(DB_FILE);
        db = JSON.parse(rawData); 
    } catch (error) {
        console.error("Ошибка чтения базы данных:", error);
    } 
}

// Функция сохранения
function saveDatabase() { 
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4)); 
    } catch (error) {
        console.error("Ошибка сохранения базы данных:", error);
    }
}

let onlineUsers = {};

// PWA Manifest
app.get('/manifest.json', (req, res) => {
    res.json({
        "short_name": "00 Ultra",
        "name": "00 Ultra Messenger Elite",
        "icons": [{
            "src": "https://cdn-icons-png.flaticon.com/512/2592/2592317.png", 
            "type": "image/png", 
            "sizes": "512x512"
        }],
        "start_url": "/", 
        "display": "standalone", 
        "theme_color": "#0b0e14", 
        "background_color": "#0b0e14"
    });
});

app.get('/', (req, res) => { 
    res.send(htmlContent); 
});

// --- ЛОГИКА СЕРВЕРА (SOCKET.IO) ---
io.on('connection', (socket) => {
    let currentUser = null;

    // Вход в систему
    socket.on('login', (payload) => {
        const { user, pass, isAuto } = payload;
        const foundUser = db.users[user];

        if (foundUser) {
            const isMatch = isAuto ? pass === foundUser.password : bcrypt.compareSync(pass, foundUser.password);
            
            if (isMatch) {
                currentUser = user; 
                socket.join(user); 
                onlineUsers[user] = socket.id;

                socket.emit('login_success', { 
                    user: user, 
                    pass: foundUser.password 
                });

                io.emit('update_users', { 
                    all: Object.keys(db.users), 
                    online: Object.keys(onlineUsers) 
                });
            } else {
                socket.emit('error_msg', 'Неверный пароль');
            }
        } else {
            socket.emit('error_msg', 'Пользователь не найден');
        }
    });

    // Регистрация
    socket.on('register', (payload) => {
        const { user, pass } = payload;
        if (!user || !pass) return;

        if (db.users[user]) {
            socket.emit('error_msg', 'Логин занят');
            return;
        }

        db.users[user] = { 
            password: bcrypt.hashSync(pass, 10) 
        }; 
        saveDatabase();
        socket.emit('register_success');
    });

    // История сообщений
    socket.on('get_history', (targetUser) => {
        if (!currentUser) return;
        
        const history = db.messages.filter(msg => {
            const isGeneral = (!targetUser && !msg.to);
            const isPrivate = (msg.to === targetUser && msg.from === currentUser) || 
                              (msg.to === currentUser && msg.from === targetUser);
            return isGeneral || isPrivate;
        }).slice(-150);

        socket.emit('history', history);
    });

    // Отправка сообщения
    socket.on('chat message', (data) => {
        if (!currentUser) return;

        const newMessage = { 
            id: 'msg_' + Math.random().toString(36).substr(2, 9), 
            from: currentUser, 
            to: data.to || null, 
            text: data.text || "", 
            file: data.file || null, 
            isVoice: data.isVoice || false, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };

        db.messages.push(newMessage); 
        saveDatabase();

        if (!data.to) {
            io.emit('chat message', newMessage); 
        } else {
            io.to(data.to).to(currentUser).emit('chat message', newMessage); 
        }
    });

    // Удаление сообщений
    socket.on('delete_msg', (messageId) => {
        const index = db.messages.findIndex(m => m.id === messageId && m.from === currentUser);
        if (index !== -1) { 
            db.messages.splice(index, 1); 
            saveDatabase(); 
            io.emit('msg_deleted', messageId); 
        }
    });

    // Сигналинг для звонков
    socket.on('call-user', (data) => {
        io.to(data.to).emit('incoming-call', { from: currentUser, offer: data.offer });
    });

    socket.on('answer-call', (data) => {
        io.to(data.to).emit('call-accepted', { answer: data.answer });
    });

    socket.on('ice-candidate', (data) => {
        io.to(data.to).emit('ice-candidate', { candidate: data.candidate });
    });

    // Отключение
    socket.on('disconnect', () => { 
        if (currentUser) { 
            delete onlineUsers[currentUser]; 
            io.emit('update_users', { 
                all: Object.keys(db.users), 
                online: Object.keys(onlineUsers) 
            }); 
        } 
    });
});

// --- ИНТЕРФЕЙС (HTML/CSS/JS) ---
const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>00 Ultra Elite</title>
    <style>
        :root { 
            --bg: #0b0e14; 
            --side: #171c26; 
            --accent: #00aff0; 
            --msg-in: #222b3a; 
            --msg-out: #005c84; 
            --text: #f5f5f5; 
            --danger: #ff3b30;
        }

        * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; -webkit-tap-highlight-color: transparent; }
        
        body { 
            background: var(--bg); 
            color: var(--text); 
            margin: 0; 
            display: flex; 
            height: 100vh; 
            overflow: hidden; 
        }

        /* Боковая панель */
        #sidebar { 
            width: 350px; 
            background: var(--side); 
            display: flex; 
            flex-direction: column; 
            border-right: 1px solid #222; 
            flex-shrink: 0; 
            transition: all 0.3s ease;
        }

        /* Основной чат */
        #chat { 
            flex: 1; 
            display: flex; 
            flex-direction: column; 
            background: #000; 
            position: relative; 
        }

        /* Мобильная адаптация */
        @media (max-width: 900px) {
            #sidebar { width: 100%; position: absolute; height: 100%; z-index: 10; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; }
            body.chat-open #sidebar { transform: translateX(-20%); opacity: 0.5; }
            body.chat-open #chat { transform: translateX(0); z-index: 20; }
        }

        .header { 
            padding: 15px; 
            background: var(--side); 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            border-bottom: 1px solid #222; 
            min-height: 65px; 
        }

        #msgs { 
            flex: 1; 
            overflow-y: auto; 
            padding: 15px; 
            display: flex; 
            flex-direction: column; 
            gap: 12px; 
            background: #080a0f; 
            scroll-behavior: smooth;
        }

        #input-area { 
            padding: 15px; 
            background: var(--side); 
            display: flex; 
            gap: 12px; 
            align-items: center; 
            transition: margin-bottom 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
        }

        #msg-in { 
            flex: 1; 
            background: #080a0f; 
            border: 1px solid #333; 
            color: #fff; 
            padding: 12px 18px; 
            border-radius: 25px; 
            outline: none; 
            font-size: 16px;
        }

        .act-btn { 
            font-size: 26px; 
            cursor: pointer; 
            user-select: none; 
            transition: transform 0.1s;
        }

        .act-btn:active { transform: scale(0.9); }

        .act-btn.recording { 
            color: var(--danger); 
            animation: pulse-red 1.2s infinite; 
        }

        @keyframes pulse-red {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }

        /* Сообщения */
        .m { 
            max-width: 80%; 
            padding: 12px; 
            border-radius: 18px; 
            position: relative; 
            font-size: 15px; 
            line-height: 1.4;
            word-wrap: break-word; 
        }

        .m.in { align-self: flex-start; background: var(--msg-in); border-bottom-left-radius: 4px; }
        .m.out { align-self: flex-end; background: var(--msg-out); border-bottom-right-radius: 4px; }

        .del-btn { 
            position: absolute; 
            top: -8px; 
            right: -8px; 
            background: var(--danger); 
            border-radius: 50%; 
            width: 20px; 
            height: 20px; 
            font-size: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            cursor: pointer; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        /* Звонки */
        #call-ui { 
            display: none; 
            position: fixed; 
            inset: 0; 
            background: rgba(0,0,0,0.98); 
            z-index: 5000; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
        }

        .btn-exit { 
            background: var(--danger); 
            color: white; 
            border: none; 
            padding: 6px 12px; 
            border-radius: 8px; 
            font-size: 12px; 
            margin-left: auto; 
            cursor: pointer; 
            font-weight: bold;
        }

        #v-meter { width: 200px; height: 10px; background: #333; margin-top: 20px; border-radius: 10px; overflow: hidden; }
        #v-level { width: 0%; height: 100%; background: #00ff88; transition: 0.1s; }

        .u-item { 
            padding: 15px; 
            border-bottom: 1px solid #222; 
            cursor: pointer; 
            transition: 0.2s; 
        }
        .u-item:hover { background: #1e2533; }
        .u-item.active { background: #222b3a; border-left: 4px solid var(--accent); }

        #lift-container {
            background: var(--side); 
            padding: 8px 15px; 
            border-top: 1px solid #222; 
            display: flex; 
            align-items: center; 
            gap: 10px;
        }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:9000; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--side); padding:40px; border-radius:25px; text-align:center; width:90%; max-width:380px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <h1 style="color:var(--accent); margin-bottom: 30px; letter-spacing: 2px;">00 ULTRA</h1>
            <input type="text" id="user" placeholder="Логин" style="width:100%; background:#080a0f; border:1px solid #333; color:#fff; padding:12px; border-radius:10px; margin-bottom:15px; outline:none;">
            <input type="password" id="pass" placeholder="Пароль" style="width:100%; background:#080a0f; border:1px solid #333; color:#fff; padding:12px; border-radius:10px; margin-bottom:25px; outline:none;">
            <button onclick="handleAuth('login')" style="width:100%; padding:14px; background:var(--accent); border:none; color:#fff; border-radius:12px; font-weight:bold; cursor:pointer; font-size:16px;">ВОЙТИ</button>
            <p onclick="handleAuth('register')" style="font-size:13px; margin-top:20px; opacity:0.6; cursor:pointer; text-decoration: underline;">Нет аккаунта? Создать</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header">
            <b style="font-size: 18px;">Чаты</b> 
            <button class="btn-exit" onclick="userLogout()">ВЫЙТИ</button>
        </div>
        <div id="u-list" style="flex:1; overflow-y:auto;"></div>
    </div>

    <div id="chat">
        <div class="header">
            <div onclick="document.body.classList.remove('chat-open')" style="cursor:pointer; font-size:24px; padding-right: 10px;">←</div>
            <b id="h-name" style="flex:1; font-size: 18px;">Общий чат</b>
            <div id="call-trigger" class="act-btn" style="display:none" onclick="startCallSession()">📞</div>
        </div>
        
        <div id="msgs"></div>

        <div id="lift-container">
            <span style="font-size:11px; font-weight: bold; opacity: 0.7;">ПОДЪЕМ КЛАВИАТУРЫ:</span>
            <input type="range" id="slider-lift" min="0" max="400" value="0" style="flex:1; cursor: pointer;">
        </div>

        <div id="input-area">
            <label class="act-btn">📎<input type="file" id="f-in" style="display:none" onchange="uploadFileAction()"></label>
            <input type="text" id="msg-in" placeholder="Введите сообщение..." autocomplete="off">
            <div id="rec-btn" class="act-btn" onclick="handleVoiceRecord()">🎤</div>
            <div class="act-btn" onclick="sendMessageAction()" style="color: var(--accent);">➤</div>
        </div>
    </div>

    <div id="call-ui">
        <div style="font-size: 50px; margin-bottom: 20px;">👤</div>
        <h2 id="c-status">Звонок...</h2>
        <div id="v-meter"><div id="v-level"></div></div>
        <div style="display:flex; gap:40px; margin-top:50px;">
            <div id="ans-btn" class="act-btn" style="background:#4cd964; padding:25px; border-radius:50%; display:none; box-shadow: 0 0 20px #4cd964;">📞</div>
            <div onclick="location.reload()" class="act-btn" style="background:var(--danger); padding:25px; border-radius:50%; box-shadow: 0 0 20px var(--danger);">📵</div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "", activeTarget = null, rtcPeer, mediaRecorder, voiceChunks = [], isRecordingVoice = false;
        const iceServersConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };

        // Инициализация уведомлений
        function initNotifications() {
            if ("Notification" in window) {
                if (Notification.permission !== "granted") {
                    Notification.requestPermission();
                }
            }
        }

        // Авторизация
        function handleAuth(type) {
            const u = document.getElementById('user').value;
            const p = document.getElementById('pass').value;
            if(!u || !p) return alert("Заполните все поля");
            socket.emit(type, { user: u, pass: p });
        }

        socket.on('login_success', data => { 
            myName = data.user; 
            localStorage.setItem('00_u', data.user); 
            localStorage.setItem('00_p', data.pass); 
            document.getElementById('auth').style.display = 'none';
            initNotifications();
        });

        socket.on('error_msg', msg => alert(msg));
        socket.on('register_success', () => alert("Успешная регистрация! Теперь войдите."));

        window.onload = () => { 
            const savedU = localStorage.getItem('00_u');
            const savedP = localStorage.getItem('00_p');
            if(savedU) socket.emit('login', { user: savedU, pass: savedP, isAuto: true }); 
            
            // Слайдер высоты
            document.getElementById('slider-lift').oninput = function() {
                document.getElementById('input-area').style.marginBottom = this.value + 'px';
            };
        };

        function userLogout() {
            localStorage.clear();
            location.reload();
        }

        // Работа с чатами
        function openChat(user) { 
            activeTarget = user; 
            document.body.classList.add('chat-open'); 
            document.getElementById('h-name').innerText = user || "Общий чат"; 
            document.getElementById('call-trigger').style.display = user ? 'block' : 'none'; 
            document.getElementById('msgs').innerHTML = ""; 
            socket.emit('get_history', user); 

            document.querySelectorAll('.u-item').forEach(el => {
                el.classList.toggle('active', el.innerText === user);
            });
        }

        socket.on('update_users', data => {
            const list = document.getElementById('u-list');
            list.innerHTML = "";
            // Сначала общий чат
            const general = document.createElement('div');
            general.className = 'u-item' + (!activeTarget ? ' active' : '');
            general.innerHTML = '<b>🌍 Общий чат</b>';
            general.onclick = () => openChat(null);
            list.appendChild(general);

            data.all.forEach(u => { 
                if(u !== myName) { 
                    const div = document.createElement('div'); 
                    div.className = 'u-item' + (activeTarget === u ? ' active' : ''); 
                    const status = data.online.includes(u) ? ' (онлайн)' : '';
                    div.innerHTML = \`<b>\${u}</b><span style="font-size:10px; opacity:0.5">\${status}</span>\`; 
                    div.onclick = () => openChat(u); 
                    list.appendChild(div); 
                } 
            });
        });

        // Отправка данных
        function sendMessageAction() { 
            const input = document.getElementById('msg-in');
            if(input.value.trim()) { 
                socket.emit('chat message', { text: input.value, to: activeTarget }); 
                input.value = ''; 
            } 
        }

        function uploadFileAction() { 
            const file = document.getElementById('f-in').files[0]; 
            if(!file) return;
            const reader = new FileReader(); 
            reader.onload = () => {
                socket.emit('chat message', { 
                    to: activeTarget, 
                    file: { name: file.name, data: reader.result, type: file.type } 
                }); 
            };
            reader.readAsDataURL(file); 
        }

        // Прием сообщений
        socket.on('chat message', msg => { 
            const isRelevant = (!activeTarget && !msg.to) || (activeTarget && (msg.from === activeTarget || msg.to === activeTarget));
            if(isRelevant) renderMessage(msg); 
            
            if(msg.from !== myName && document.hidden) {
                new Notification("00 Ultra: " + msg.from, { body: msg.text || "Прикрепленный файл" });
            }
        });

        socket.on('history', list => list.forEach(renderMessage));
        socket.on('msg_deleted', id => {
            const el = document.getElementById(id);
            if(el) el.remove();
        });

        function renderMessage(m) {
            const box = document.getElementById('msgs');
            const div = document.createElement('div'); 
            div.className = 'm ' + (m.from === myName ? 'out' : 'in'); 
            div.id = m.id;
            
            let content = \`<div style="font-size:11px; opacity:0.6; margin-bottom:4px;">\${m.from} • \${m.time}</div>\`;
            
            if(m.from === myName) {
                content += \`<div class="del-btn" onclick="socket.emit('delete_msg', '\${m.id}')">×</div>\`;
            }

            if(m.isVoice) {
                content += \`<audio src="\${m.file.data}" controls style="width:200px; height:40px;"></audio>\`;
            } else if(m.file) { 
                if(m.file.type.startsWith('image')) {
                    content += \`<img src="\${m.file.data}" style="max-width:100%; border-radius:10px; cursor:pointer;" onclick="window.open(this.src)">\`;
                } else {
                    content += \`<a href="\${m.file.data}" download="\${m.file.name}" style="color:#fff; text-decoration:none;">📄 \${m.file.name}</a>\`; 
                }
            }

            if(m.text) content += \`<div style="margin-top:5px;">\${m.text}</div>\`; 
            
            div.innerHTML = content; 
            box.appendChild(div); 
            box.scrollTop = box.scrollHeight;
        }

        // --- ЛОГИКА ГОЛОСА (НАЖАТЬ/ОТПУСТИТЬ) ---
        async function handleVoiceRecord() {
            const btn = document.getElementById('rec-btn');
            
            if(!isRecordingVoice) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream); 
                    voiceChunks = [];
                    
                    mediaRecorder.ondataavailable = e => voiceChunks.push(e.data);
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(voiceChunks, { type: 'audio/ogg; codecs=opus' });
                        const reader = new FileReader();
                        reader.onload = () => {
                            socket.emit('chat message', { 
                                to: activeTarget, 
                                file: { data: reader.result }, 
                                isVoice: true 
                            });
                        };
                        reader.readAsDataURL(blob);
                        stream.getTracks().forEach(t => t.stop());
                    };
                    
                    mediaRecorder.start(); 
                    isRecordingVoice = true;
                    btn.classList.add('recording');
                } catch(err) {
                    alert("Ошибка доступа к микрофону: " + err);
                }
            } else {
                mediaRecorder.stop(); 
                isRecordingVoice = false;
                btn.classList.remove('recording');
            }
        }

        // --- ЛОГИКА ЗВОНКОВ ---
        async function startCallSession() {
            document.getElementById('call-ui').style.display = 'flex';
            document.getElementById('c-status').innerText = "Вызов: " + activeTarget;
            
            rtcPeer = new RTCPeerConnection(iceServersConfig);
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => rtcPeer.addTrack(track, stream));
                visualizeVolume(stream);
                
                rtcPeer.onicecandidate = e => {
                    if(e.candidate) socket.emit('ice-candidate', { to: activeTarget, candidate: e.candidate });
                };

                const offer = await rtcPeer.createOffer();
                await rtcPeer.setLocalDescription(offer);
                socket.emit('call-user', { to: activeTarget, offer: offer });
                
                rtcPeer.ontrack = event => {
                    const audio = new Audio();
                    audio.srcObject = event.streams[0];
                    audio.play();
                };
            } catch(e) {
                alert("Ошибка звонка: " + e);
                location.reload();
            }
        }

        socket.on('incoming-call', async data => {
            document.getElementById('call-ui').style.display = 'flex';
            document.getElementById('c-status').innerText = "Входящий от " + data.from;
            const aBtn = document.getElementById('ans-btn');
            aBtn.style.display = 'block';
            
            aBtn.onclick = async () => {
                aBtn.style.display = 'none';
                rtcPeer = new RTCPeerConnection(iceServersConfig);
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => rtcPeer.addTrack(track, stream));
                visualizeVolume(stream);

                rtcPeer.onicecandidate = e => {
                    if(e.candidate) socket.emit('ice-candidate', { to: data.from, candidate: e.candidate });
                };

                await rtcPeer.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await rtcPeer.createAnswer();
                await rtcPeer.setLocalDescription(answer);
                socket.emit('answer-call', { to: data.from, answer: answer });

                rtcPeer.ontrack = event => {
                    const audio = new Audio();
                    audio.srcObject = event.streams[0];
                    audio.play();
                };
            };
        });

        socket.on('call-accepted', data => {
            rtcPeer.setRemoteDescription(new RTCSessionDescription(data.answer));
            document.getElementById('c-status').innerText = "В эфире";
        });

        socket.on('ice-candidate', data => {
            if(rtcPeer) rtcPeer.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        function visualizeVolume(stream) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const source = context.createMediaStreamSource(stream);
            const analyser = context.createAnalyser();
            source.connect(analyser);
            const buffer = new Uint8Array(analyser.frequencyBinCount);

            function update() {
                analyser.getByteFrequencyData(buffer);
                const val = buffer.reduce((a, b) => a + b) / buffer.length;
                document.getElementById('v-level').style.width = Math.min(val * 4, 100) + '%';
                if(document.getElementById('call-ui').style.display === 'flex') requestAnimationFrame(update);
            }
            update();
        }

        // Обработка Enter
        document.getElementById('msg-in').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') sendMessageAction();
        });
    </script>
</body>
</html>
\`;

// --- ЗАПУСК ---
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('==============================================');
    console.log('🚀 00 ULTRA ELITE v3.0 успешно запущен!');
    console.log('📍 Порт: ' + PORT);
    console.log('🌐 Доступ открыт для всех устройств в сети.');
    console.log('==============================================');
});