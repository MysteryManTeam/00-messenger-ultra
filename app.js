const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 }); // Лимит 100мб
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };

if (fs.existsSync(DB_FILE)) {
    try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch(e) { console.log("DB Error"); }
}
function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

let onlineUsers = {};

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('login', ({ user, pass, isAuto }) => {
        const found = db.users[user];
        if (found && (isAuto ? pass === found.password : bcrypt.compareSync(pass, found.password))) {
            currentUser = user;
            socket.join(user);
            onlineUsers[user] = socket.id;
            socket.emit('login_success', { user, pass: found.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) });
        } else { socket.emit('err', 'Access Denied'); }
    });

    socket.on('register', ({ user, pass }) => {
        if (!user || !pass || db.users[user]) return socket.emit('err', 'User exists');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Registered!');
    });

    socket.on('get_history', (target) => {
        if (!currentUser) return;
        const history = db.messages.filter(m => 
            (!target && !m.to) || (m.to === target && m.from === currentUser) || (m.to === currentUser && m.from === target)
        ).slice(-50);
        socket.emit('history', history);
    });

    // ОБРАБОТКА СООБЩЕНИЙ (ТЕКСТ, ФАЙЛЫ, ГОЛОС)
    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msg = {
            id: Math.random().toString(36).substr(2, 9),
            from: currentUser,
            to: data.to || null,
            text: data.text || "",
            file: data.file || null, // {name, data, type}
            isVoice: data.isVoice || false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        db.messages.push(msg);
        if (db.messages.length > 500) db.messages.shift();
        saveDB();
        if (!data.to) io.emit('chat message', msg);
        else io.to(data.to).to(currentUser).emit('chat message', msg);
    });

    // СИГНАЛИНГ ДЛЯ ЗВОНКОВ (WebRTC)
    socket.on('call-user', (data) => {
        io.to(data.to).emit('incoming-call', { from: currentUser, offer: data.offer });
    });
    socket.on('answer-call', (data) => {
        io.to(data.to).emit('call-accepted', { answer: data.answer });
    });
    socket.on('ice-candidate', (data) => {
        io.to(data.to).emit('ice-candidate', data.candidate);
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            delete onlineUsers[currentUser];
            io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) });
        }
    });
});

const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>00 Ultra Messenger</title>
    <style>
        :root { --bg: #0e0e12; --side: #15151c; --accent: #00d9ff; --msg-in: #1c1c27; --msg-out: #2a2a3d; --text: #e0e0e0; }
        body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        
        #auth { position: fixed; inset: 0; background: var(--bg); z-index: 1000; display: flex; align-items: center; justify-content: center; flex-direction: column; }
        .card { background: var(--side); padding: 40px; border-radius: 20px; text-align: center; border: 1px solid #333; box-shadow: 0 0 20px rgba(0,217,255,0.1); }
        input { background: #000; border: 1px solid #333; color: #fff; padding: 12px; margin: 8px; border-radius: 10px; outline: none; }
        button { background: var(--accent); border: none; padding: 12px 25px; border-radius: 10px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        button:hover { box-shadow: 0 0 15px var(--accent); }

        #sidebar { width: 320px; background: var(--side); border-right: 1px solid #222; display: flex; flex-direction: column; }
        .u-item { padding: 15px 20px; cursor: pointer; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #1a1a1a; }
        .u-item.active { background: #222530; border-left: 4px solid var(--accent); }
        .ava { width: 45px; height: 45px; border-radius: 50%; background: #333; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: #444; }
        .dot.on { background: #00ff88; box-shadow: 0 0 8px #00ff88; }

        #chat { flex: 1; display: flex; flex-direction: column; position: relative; }
        #header { padding: 15px 25px; background: var(--side); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        
        .m { max-width: 75%; padding: 12px 18px; border-radius: 18px; position: relative; animation: pop 0.2s ease-out; word-wrap: break-word; }
        @keyframes pop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .m.in { align-self: flex-start; background: var(--msg-in); border-bottom-left-radius: 4px; }
        .m.out { align-self: flex-end; background: var(--msg-out); border-bottom-right-radius: 4px; color: #fff; }
        .m img { max-width: 100%; border-radius: 10px; margin-top: 5px; cursor: pointer; }
        .m audio { height: 35px; margin-top: 5px; filter: invert(1); }
        .m .time { font-size: 0.7em; opacity: 0.5; margin-left: 10px; float: right; }

        #input-panel { padding: 15px 25px; background: var(--side); display: flex; gap: 12px; align-items: center; }
        #msg-in { flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 12px 20px; border-radius: 25px; outline: none; }
        .icon-btn { font-size: 1.4em; cursor: pointer; opacity: 0.7; transition: 0.2s; user-select: none; }
        .icon-btn:hover { opacity: 1; color: var(--accent); }
        .icon-btn.recording { color: #ff003c; animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }

        #call-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 2000; flex-direction: column; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <div id="auth">
        <div class="card">
            <h2 style="color:var(--accent)">00 ULTRA</h2>
            <input type="text" id="user" placeholder="Логин">
            <input type="password" id="pass" placeholder="Пароль"><br><br>
            <button onclick="doAuth('login')">ВОЙТИ</button>
            <button onclick="doAuth('register')" style="background:#222; color:#fff">РЕГИСТРАЦИЯ</button>
        </div>
    </div>

    <div id="sidebar">
        <div style="padding:20px; font-weight:bold; color:var(--accent)">ЧАТЫ</div>
        <div class="u-item active" id="g-chat" onclick="setChat(null)">
            <div class="ava" style="background:var(--accent)">G</div>
            <div style="flex:1">Общий чат</div>
        </div>
        <div id="user-list"></div>
    </div>

    <div id="chat">
        <div id="header">
            <div style="display:flex; align-items:center; gap:15px;">
                <div class="ava" id="h-ava">G</div>
                <b id="h-name">Общий чат</b>
            </div>
            <div id="call-btn" class="icon-btn" onclick="startCall()" style="display:none">📞</div>
        </div>
        <div id="msgs"></div>
        <div id="input-panel">
            <label class="icon-btn">📎<input type="file" id="f-in" style="display:none" onchange="sendFile()"></label>
            <input type="text" id="msg-in" placeholder="Сообщение...">
            <div id="mic-btn" class="icon-btn" onmousedown="startVoice()" onmouseup="stopVoice()" ontouchstart="startVoice()" ontouchend="stopVoice()">🎤</div>
            <button onclick="sendText()">➤</button>
        </div>
    </div>

    <div id="call-overlay">
        <div class="ava" id="call-ava" style="width:100px; height:100px; font-size:2em">?</div>
        <h2 id="call-status">Звонок...</h2>
        <div style="display:flex; gap:20px;">
            <button id="ans-btn" style="background:#00ff88; display:none">Ответить</button>
            <button onclick="endCall()" style="background:#ff003c">Сбросить</button>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "", target = null, mediaRecorder, voiceChunks = [], peer;

        function doAuth(type) { socket.emit(type, { user: user.value, pass: pass.value }); }
        
        socket.on('login_success', d => {
            myName = d.user; localStorage.setItem('00_u', d.user); localStorage.setItem('00_p', d.pass);
            auth.style.display = 'none';
            setChat(null);
        });

        window.onload = () => {
            const u = localStorage.getItem('00_u'), p = localStorage.getItem('00_p');
            if(u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };

        function setChat(t) {
            target = t;
            document.querySelectorAll('.u-item').forEach(e => e.classList.remove('active'));
            document.getElementById('call-btn').style.display = t ? 'block' : 'none';
            if(!t) {
                document.getElementById('g-chat').classList.add('active');
                h_name.innerText = "Общий чат"; h_ava.innerText = "G";
            } else {
                document.getElementById('u-'+t).classList.add('active');
                h_name.innerText = t; h_ava.innerText = t[0].toUpperCase();
            }
            msgs.innerHTML = "";
            socket.emit('get_history', t);
        }

        socket.on('update_users', d => {
            const list = document.getElementById('user-list'); list.innerHTML = "";
            d.all.forEach(u => {
                if(u === myName) return;
                const div = document.createElement('div');
                div.className = 'u-item' + (target === u ? ' active' : '');
                div.id = 'u-' + u;
                const on = d.online.includes(u);
                div.innerHTML = \`<div class="ava">\${u[0].toUpperCase()}</div><div style="flex:1">\${u}</div><div class="dot \${on?'on':''}"></div>\`;
                div.onclick = () => setChat(u);
                list.appendChild(div);
            });
        });

        function sendText() {
            if(document.getElementById('msg-in').value.trim()) {
                socket.emit('chat message', { text: document.getElementById('msg-in').value, to: target });
                document.getElementById('msg-in').value = '';
            }
        }

        function sendFile() {
            const file = document.getElementById('f-in').files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                socket.emit('chat message', { 
                    to: target, 
                    file: { name: file.name, data: reader.result, type: file.type } 
                });
            };
            reader.readAsDataURL(file);
        }

        async function startVoice() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                voiceChunks = [];
                document.getElementById('mic-btn').classList.add('recording');
                mediaRecorder.ondataavailable = e => voiceChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    const blob = new Blob(voiceChunks, { type: 'audio/ogg; codecs=opus' });
                    const reader = new FileReader();
                    reader.onload = () => {
                        socket.emit('chat message', { to: target, file: { data: reader.result }, isVoice: true });
                    };
                    reader.readAsDataURL(blob);
                    stream.getTracks().forEach(t => t.stop());
                };
                mediaRecorder.start();
            } catch(e) { alert("Микрофон недоступен"); }
        }

        function stopVoice() { if(mediaRecorder) { mediaRecorder.stop(); document.getElementById('mic-btn').classList.remove('recording'); } }

        socket.on('chat message', addM);
        socket.on('history', h => h.forEach(addM));

        function addM(m) {
            const wrap = document.createElement('div');
            wrap.className = 'm ' + (m.from === myName ? 'out' : 'in');
            let content = \`<b>\${m.from}</b><br>\`;
            
            if(m.isVoice) {
                content += \`<audio src="\${m.file.data}" controls></audio>\`;
            } else if(m.file) {
                if(m.file.type.startsWith('image')) content += \`<img src="\${m.file.data}" onclick="window.open(this.src)">\`;
                else content += \`<a href="\${m.file.data}" download="\${m.file.name}" style="color:var(--accent)">📄 \${m.file.name}</a>\`;
            }
            
            content += \`<div style="margin-top:5px">\${m.text}</div><span class="time">\${m.time}</span>\`;
            wrap.innerHTML = content;
            msgs.appendChild(wrap);
            msgs.scrollTop = msgs.scrollHeight;
        }

        // --- ЛОГИКА ЗВОНКОВ ---
        async function startCall() {
            call_overlay.style.display = 'flex';
            call_status.innerText = "Вызов " + target + "...";
            call_ava.innerText = target[0];
            
            peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(t => peer.addTrack(t, stream));
            
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            socket.emit('call-user', { to: target, offer });
            
            peer.ontrack = e => { const audio = new Audio(); audio.srcObject = e.streams[0]; audio.play(); };
        }

        socket.on('incoming-call', async d => {
            call_overlay.style.display = 'flex';
            call_status.innerText = "Входящий от " + d.from;
            ans_btn.style.display = 'block';
            ans_btn.onclick = async () => {
                ans_btn.style.display = 'none';
                peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => peer.addTrack(t, stream));
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                socket.emit('answer-call', { to: d.from, answer });
                peer.ontrack = e => { const audio = new Audio(); audio.srcObject = e.streams[0]; audio.play(); };
            };
        });

        socket.on('call-accepted', d => peer.setRemoteDescription(new RTCSessionDescription(d.answer)));
        function endCall() { call_overlay.style.display = 'none'; if(peer) peer.close(); location.reload(); }

        socket.on('err', e => alert(e));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => console.log('00 ULTRA ELITE ACTIVE ON PORT ' + PORT));