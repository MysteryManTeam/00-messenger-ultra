const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 });
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };
if (fs.existsSync(DB_FILE)) { try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch(e) {} }
function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

let onlineUsers = {};

// --- СЛУЖЕБНЫЕ ФАЙЛЫ ДЛЯ PWA ---
app.get('/manifest.json', (req, res) => {
    res.json({
        "short_name": "00 Ultra",
        "name": "00 Ultra Messenger Elite",
        "icons": [{"src": "https://cdn-icons-png.flaticon.com/512/2592/2592317.png", "type": "image/png", "sizes": "512x512"}],
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#0b0e14",
        "background_color": "#0b0e14",
        "share_target": { "action": "/", "method": "GET", "params": { "title": "title", "text": "text", "url": "url" } }
    });
});

app.get('/sw.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`self.addEventListener('push', e => { const data = e.data.json(); self.registration.showNotification(data.title, { body: data.body }); });`);
});

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;
    socket.on('login', ({ user, pass, isAuto }) => {
        const found = db.users[user];
        if (found && (isAuto ? pass === found.password : bcrypt.compareSync(pass, found.password))) {
            currentUser = user; socket.join(user); onlineUsers[user] = socket.id;
            socket.emit('login_success', { user, pass: found.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) });
        }
    });
    socket.on('register', ({ user, pass }) => {
        if (!user || !pass || db.users[user]) return;
        db.users[user] = { password: bcrypt.hashSync(pass, 10) }; saveDB();
        socket.emit('system', 'Ready!');
    });
    socket.on('get_history', (t) => {
        if (!currentUser) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===currentUser) || (m.to===currentUser && m.from===t)).slice(-60);
        socket.emit('history', h);
    });
    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msg = { id: Math.random().toString(36).substr(2,9), from: currentUser, to: data.to||null, text: data.text||"", file: data.file||null, isVoice: data.isVoice||false, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) };
        db.messages.push(msg); if (db.messages.length > 500) db.messages.shift(); saveDB();
        if (!data.to) io.emit('chat message', msg); 
        else { io.to(data.to).to(currentUser).emit('chat message', msg); }
    });
    socket.on('call-user', (data) => io.to(data.to).emit('incoming-call', { from: currentUser, offer: data.offer }));
    socket.on('answer-call', (data) => io.to(data.to).emit('call-accepted', { answer: data.answer }));
    socket.on('ice-candidate', (d) => io.to(d.to).emit('ice-candidate', d.candidate));
    socket.on('disconnect', () => { if (currentUser) { delete onlineUsers[currentUser]; io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) }); } });
});

const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="manifest" href="/manifest.json">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>00 Ultra</title>
    <style>
        :root { --bg: #0b0e14; --side: #171c26; --accent: #00aff0; --msg-in: #222b3a; --msg-out: #005c84; --text: #f5f5f5; --rgb-border: linear-gradient(45deg, #00f, #f0f, #00f); }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        
        /* Layout */
        #sidebar { width: 350px; background: var(--side); display: flex; flex-direction: column; border-right: 1px solid #222; transition: 0.3s; z-index: 10; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #000; position: relative; }
        
        /* Mobile logic */
        @media (max-width: 800px) {
            #sidebar { width: 100%; position: absolute; height: 100%; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; }
            body.chat-open #sidebar { transform: translateX(-20%); opacity: 0.5; }
            body.chat-open #chat { transform: translateX(0); }
        }

        /* UI Elements */
        .header { padding: 15px 20px; background: var(--side); display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #222; min-height: 65px; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 8px; background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-blend-mode: overlay; background-color: #080a0f; }
        
        /* Auth */
        #auth { position: fixed; inset: 0; background: var(--bg); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .auth-card { background: var(--side); padding: 40px; border-radius: 25px; text-align: center; width: 90%; max-width: 400px; box-shadow: 0 15px 35px rgba(0,0,0,0.5); }
        input { background: #080a0f; border: 1px solid #333; color: #fff; padding: 14px; margin: 10px 0; border-radius: 12px; width: 100%; outline: none; font-size: 16px; }
        .btn { background: var(--accent); border: none; padding: 14px; border-radius: 12px; color: #fff; font-weight: bold; width: 100%; cursor: pointer; transition: 0.2s; }

        /* Items */
        .u-item { padding: 12px 18px; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
        .u-item:hover { background: rgba(255,255,255,0.05); }
        .u-item.active { background: #222b3a; }
        .ava { width: 48px; height: 48px; border-radius: 50%; background: #3d4451; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; position: relative; flex-shrink: 0; }
        .status-dot { width: 12px; height: 12px; background: #444; border-radius: 50%; border: 2px solid var(--side); position: absolute; bottom: 0; right: 0; }
        .status-dot.on { background: #00ff88; box-shadow: 0 0 8px #00ff88; }

        /* Messages */
        .m { max-width: 80%; padding: 10px 14px; border-radius: 16px; font-size: 15px; position: relative; line-height: 1.4; animation: slideUp 0.2s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } }
        .m.in { align-self: flex-start; background: var(--msg-in); border-bottom-left-radius: 4px; }
        .m.out { align-self: flex-end; background: var(--msg-out); border-bottom-right-radius: 4px; }
        .m audio { height: 35px; width: 200px; filter: invert(0.9); margin-top: 5px; }
        .m img { max-width: 100%; border-radius: 10px; margin-top: 5px; }

        /* Input area */
        #input-area { padding: 10px 15px; background: var(--side); display: flex; gap: 10px; align-items: center; padding-bottom: calc(10px + env(safe-area-inset-bottom)); }
        #msg-in { flex: 1; background: #080a0f; border: 1px solid #333; color: #fff; padding: 12px 18px; border-radius: 25px; outline: none; }
        .act-btn { font-size: 24px; cursor: pointer; opacity: 0.8; transition: 0.2s; user-select: none; }
        .act-btn:hover { transform: scale(1.1); opacity: 1; }
        .act-btn.recording { color: #ff3b30; animation: pulse 1s infinite; }
        @keyframes pulse { 50% { opacity: 0.4; } }

        /* Overlay */
        #call-ui { display: none; position: fixed; inset: 0; background: rgba(11,14,20,0.98); z-index: 2000; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .back-btn { display: none; font-size: 24px; margin-right: 10px; cursor: pointer; }
        @media (max-width: 800px) { .back-btn { display: block; } }
    </style>
</head>
<body>
    <div id="auth">
        <div class="auth-card">
            <h1 style="color:var(--accent); margin-top:0;">00 ULTRA</h1>
            <input type="text" id="user" placeholder="Имя пользователя">
            <input type="password" id="pass" placeholder="Пароль">
            <button class="btn" onclick="auth('login')">ВОЙТИ</button>
            <p style="opacity:0.5; font-size:14px; cursor:pointer" onclick="auth('register')">Или создать аккаунт</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header"><b>00 Ultra</b></div>
        <div class="u-item active" onclick="setChat(null)">
            <div class="ava" style="background:var(--accent)">G</div>
            <b>Общий чат</b>
        </div>
        <div id="u-list" style="flex:1; overflow-y:auto;"></div>
    </div>

    <div id="chat">
        <div class="header">
            <div class="back-btn" onclick="closeChat()">←</div>
            <div class="ava" id="h-ava" style="width:40px; height:40px; font-size:16px;">G</div>
            <b id="h-name" style="flex:1">Общий чат</b>
            <div class="act-btn" id="call-trigger" style="display:none" onclick="makeCall()">📞</div>
        </div>
        <div id="msgs"></div>
        <div id="voice-timer" style="display:none; text-align:center; padding:5px; color:#ff3b30; font-weight:bold;">● 00:00</div>
        <div id="input-area">
            <label class="act-btn">📎<input type="file" id="f-in" style="display:none" onchange="upFile()"></label>
            <input type="text" id="msg-in" placeholder="Сообщение...">
            <div class="act-btn" id="mic-btn" onmousedown="startRec()" onmouseup="stopRec()" ontouchstart="startRec()" ontouchend="stopRec()">🎤</div>
            <div class="act-btn" onclick="send()">➤</div>
        </div>
    </div>

    <div id="call-ui">
        <div class="ava" id="c-ava" style="width:120px; height:120px; font-size:3em; margin-bottom:20px;">?</div>
        <h2 id="c-status">Звонок...</h2>
        <div style="display:flex; gap:30px;">
            <div class="act-btn" id="ans-btn" style="background:#4cd964; padding:20px; border-radius:50%; display:none">📞</div>
            <div class="act-btn" onclick="endCall()" style="background:#ff3b30; padding:20px; border-radius:50%">📵</div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let me = "", target = null, recorder, chunks = [], peer, vTime = 0, vInterval;

        // PWA & Notifications
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
            Notification.requestPermission();
        }

        function auth(t) { socket.emit(t, { user: user.value, pass: pass.value }); }
        socket.on('login_success', d => {
            me = d.user; localStorage.setItem('00_u', d.user); localStorage.setItem('00_p', d.pass);
            document.getElementById('auth').style.display = 'none';
            checkShare();
        });

        function checkShare() {
            const p = new URLSearchParams(window.location.search);
            const txt = p.get('text') || p.get('url');
            if(txt) { document.getElementById('msg-in').value = txt; window.history.replaceState({}, '', '/'); }
        }

        window.onload = () => {
            const u = localStorage.getItem('00_u'), p = localStorage.getItem('00_p');
            if(u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };

        function setChat(t) {
            target = t;
            document.body.classList.add('chat-open');
            document.getElementById('call-trigger').style.display = t ? 'block' : 'none';
            document.getElementById('h-name').innerText = t || "Общий чат";
            document.getElementById('h-ava').innerText = (t || "G")[0];
            document.getElementById('msgs').innerHTML = "";
            socket.emit('get_history', t);
        }

        function closeChat() { document.body.classList.remove('chat-open'); }

        socket.on('update_users', d => {
            const list = document.getElementById('u-list'); list.innerHTML = "";
            d.all.forEach(u => {
                if(u === me) return;
                const div = document.createElement('div');
                div.className = 'u-item' + (target === u ? ' active' : '');
                div.innerHTML = \`<div class="ava">\${u[0]}<div class="status-dot \${d.online.includes(u)?'on':''}"></div></div><b>\${u}</b>\`;
                div.onclick = () => setChat(u);
                list.appendChild(div);
            });
        });

        function send() {
            const val = document.getElementById('msg-in').value;
            if(val.trim()) { socket.emit('chat message', { text: val, to: target }); document.getElementById('msg-in').value = ''; }
        }

        function upFile() {
            const f = document.getElementById('f-in').files[0];
            const r = new FileReader();
            r.onload = () => socket.emit('chat message', { to: target, file: { name: f.name, data: r.result, type: f.type } });
            r.readAsDataURL(f);
        }

        async function startRec() {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                recorder = new MediaRecorder(s);
                chunks = []; vTime = 0;
                document.getElementById('mic-btn').classList.add('recording');
                document.getElementById('voice-timer').style.display = 'block';
                vInterval = setInterval(() => { vTime++; document.getElementById('voice-timer').innerText = "● 00:" + (vTime<10?'0':'') + vTime; }, 1000);
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const b = new Blob(chunks, { type: 'audio/ogg' });
                    const r = new FileReader();
                    r.onload = () => socket.emit('chat message', { to: target, file: { data: r.result }, isVoice: true });
                    r.readAsDataURL(b);
                    s.getTracks().forEach(t => t.stop());
                };
                recorder.start();
            } catch(e) { alert("Mic error"); }
        }

        function stopRec() { 
            if(recorder) recorder.stop(); 
            document.getElementById('mic-btn').classList.remove('recording');
            document.getElementById('voice-timer').style.display = 'none';
            clearInterval(vInterval);
        }

        socket.on('chat message', m => {
            if((!target && !m.to) || (target && (m.from===target || m.to===target))) addM(m);
            if(m.from !== me && Notification.permission === 'granted') new Notification(m.from, { body: m.text || "Файл" });
        });
        socket.on('history', h => h.forEach(addM));

        function addM(m) {
            const d = document.createElement('div');
            d.className = 'm ' + (m.from === me ? 'out' : 'in');
            let c = \`<b>\${m.from}</b><br>\`;
            if(m.isVoice) c += \`<audio src="\${m.file.data}" controls></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) c += \`<img src="\${m.file.data}">\`;
                else c += \`<a href="\${m.file.data}" download="\${m.file.name}" style="color:#fff">📄 \${m.file.name}</a>\`;
            }
            c += \`<div>\${m.text}</div><small style="opacity:0.5">\${m.time}</small>\`;
            d.innerHTML = c;
            msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
        }

        // --- CALLS ---
        async function makeCall() {
            call_ui.style.display = 'flex'; c_status.innerText = "Calling " + target; c_ava.innerText = target[0];
            peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            const s = await navigator.mediaDevices.getUserMedia({ audio: true });
            s.getTracks().forEach(t => peer.addTrack(t, s));
            const o = await peer.createOffer();
            await peer.setLocalDescription(o);
            socket.emit('call-user', { to: target, offer: o });
            peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
        }

        socket.on('incoming-call', async d => {
            call_ui.style.display = 'flex'; c_status.innerText = "Incoming from " + d.from; ans_btn.style.display = 'block';
            ans_btn.onclick = async () => {
                ans_btn.style.display = 'none';
                peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                s.getTracks().forEach(t => peer.addTrack(t, s));
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const a = await peer.createAnswer(); await peer.setLocalDescription(a);
                socket.emit('answer-call', { to: d.from, answer: a });
                peer.ontrack = e => { const au = new Audio(); au.srcObject = e.streams[0]; au.play(); };
            };
        });
        socket.on('call-accepted', d => peer.setRemoteDescription(new RTCSessionDescription(d.answer)));
        function endCall() { call_ui.style.display = 'none'; location.reload(); }
        socket.on('err', e => alert(e));
    </script>
</body>
</html>
// ... (весь предыдущий код выше остается без изменений)

// ИСПРАВЛЕННЫЙ ЗАПУСК С ПРИВЯЗКОЙ К IP ДЛЯ RAILWAY
const PORT = process.env.PORT || 3000;

http.listen(PORT, '0.0.0.0', () => {
    console.log('-------------------------------------------');
    console.log('🚀 00 ULTRA MESSENGER ELITE ЗАПУЩЕН!');
    console.log('📡 Порт: ' + PORT);
    console.log('🌍 Доступ: 0.0.0.0 (Все интерфейсы)');
    console.log('-------------------------------------------');
});