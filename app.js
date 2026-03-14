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

app.get('/manifest.json', (req, res) => {
    res.json({
        "short_name": "00 Ultra",
        "name": "00 Ultra Messenger Elite",
        "icons": [{"src": "https://cdn-icons-png.flaticon.com/512/2592/2592317.png", "type": "image/png", "sizes": "512x512"}],
        "start_url": "/", "display": "standalone", "theme_color": "#0b0e14", "background_color": "#0b0e14"
    });
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
    });
    socket.on('get_history', (t) => {
        if (!currentUser) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===currentUser) || (m.to===currentUser && m.from===t)).slice(-100);
        socket.emit('history', h);
    });
    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msg = { id: Math.random().toString(36).substr(2,9), from: currentUser, to: data.to||null, text: data.text||"", file: data.file||null, isVoice: data.isVoice||false, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) };
        db.messages.push(msg); saveDB();
        if (!data.to) io.emit('chat message', msg); else io.to(data.to).to(currentUser).emit('chat message', msg);
    });
    socket.on('delete_msg', (id) => {
        const idx = db.messages.findIndex(m => m.id === id && m.from === currentUser);
        if (idx !== -1) { db.messages.splice(idx, 1); saveDB(); io.emit('msg_deleted', id); }
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>00 Ultra</title>
    <style>
        :root { --bg: #0b0e14; --side: #171c26; --accent: #00aff0; --msg-in: #222b3a; --msg-out: #005c84; --text: #f5f5f5; }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { background: var(--bg); color: var(--text); font-family: sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 350px; background: var(--side); display: flex; flex-direction: column; border-right: 1px solid #222; z-index: 10; flex-shrink: 0; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #000; position: relative; height: 100%; }
        @media (max-width: 900px) {
            #sidebar { width: 100%; position: absolute; height: 100%; transition: 0.3s; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; }
            body.chat-open #sidebar { transform: translateX(-20%); opacity: 0.5; }
            body.chat-open #chat { transform: translateX(0); }
        }
        .header { padding: 15px; background: var(--side); display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #222; min-height: 65px; flex-shrink: 0; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 8px; background: #080a0f; }
        #auth { position: fixed; inset: 0; background: var(--bg); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .auth-card { background: var(--side); padding: 30px; border-radius: 20px; text-align: center; width: 90%; max-width: 380px; }
        input { background: #080a0f; border: 1px solid #333; color: #fff; padding: 12px; margin: 10px 0; border-radius: 10px; width: 100%; outline: none; }
        .btn { background: var(--accent); border: none; padding: 12px; border-radius: 10px; color: #fff; font-weight: bold; width: 100%; cursor: pointer; }
        .u-item { padding: 12px 18px; cursor: pointer; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #22232b; }
        .u-item.active { background: #222b3a; }
        .ava { width: 45px; height: 45px; border-radius: 50%; background: #3d4451; display: flex; align-items: center; justify-content: center; font-weight: bold; position: relative; flex-shrink: 0; }
        .status-dot { width: 12px; height: 12px; background: #444; border-radius: 50%; border: 2px solid var(--side); position: absolute; bottom: 0; right: 0; }
        .status-dot.on { background: #00ff88; }
        .m { max-width: 80%; padding: 10px; border-radius: 15px; position: relative; font-size: 15px; }
        .m.in { align-self: flex-start; background: var(--msg-in); }
        .m.out { align-self: flex-end; background: var(--msg-out); }
        .del-btn { position: absolute; top: -5px; right: -5px; background: #ff3b30; border-radius: 50%; width: 18px; height: 18px; font-size: 12px; display: none; align-items: center; justify-content: center; cursor: pointer; }
        .m.out:hover .del-btn { display: flex; }
        #input-area { padding: 15px; background: var(--side); display: flex; gap: 10px; align-items: center; flex-shrink: 0; }
        #msg-in { flex: 1; background: #080a0f; border: 1px solid #333; color: #fff; padding: 12px; border-radius: 20px; }
        .act-btn { font-size: 24px; cursor: pointer; }
        #call-ui { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 2000; flex-direction: column; align-items: center; justify-content: center; }
        .logout { padding: 10px; color: #ff3b30; cursor: pointer; font-size: 14px; text-align: center; border-top: 1px solid #222; }
    </style>
</head>
<body>
    <div id="auth">
        <div class="auth-card">
            <h1 style="color:var(--accent)">00 ULTRA</h1>
            <input type="text" id="user" placeholder="Логин">
            <input type="password" id="pass" placeholder="Пароль">
            <button class="btn" onclick="auth('login')">ВОЙТИ</button>
            <p onclick="auth('register')" style="font-size:12px; opacity:0.6; cursor:pointer">Регистрация</p>
        </div>
    </div>
    <div id="sidebar">
        <div class="header"><b>Чаты</b></div>
        <div id="u-list" style="flex:1; overflow-y:auto;"></div>
        <div class="logout" onclick="localStorage.clear(); location.reload();">ВЫЙТИ ИЗ АККАУНТА</div>
    </div>
    <div id="chat">
        <div class="header">
            <div onclick="document.body.classList.remove('chat-open')" style="cursor:pointer; font-size:20px;">←</div>
            <div class="ava" id="h-ava" style="width:35px; height:35px">G</div>
            <b id="h-name" style="flex:1">Чат</b>
            <div id="call-trigger" class="act-btn" style="display:none" onclick="makeCall()">📞</div>
        </div>
        <div id="msgs"></div>
        <div id="input-area">
            <label class="act-btn">📎<input type="file" id="f-in" style="display:none" onchange="upFile()"></label>
            <input type="text" id="msg-in" placeholder="Сообщение...">
            <div class="act-btn" onmousedown="startRec()" onmouseup="stopRec()" ontouchstart="startRec()" ontouchend="stopRec()">🎤</div>
            <div class="act-btn" onclick="send()">➤</div>
        </div>
    </div>
    <div id="call-ui">
        <div class="ava" id="c-ava" style="width:100px; height:100px; font-size:2em">?</div>
        <h2 id="c-status">Звонок...</h2>
        <div style="display:flex; gap:20px;">
            <div id="ans-btn" class="act-btn" style="background:#4cd964; padding:15px; border-radius:50%; display:none">📞</div>
            <div onclick="location.reload()" class="act-btn" style="background:#ff3b30; padding:15px; border-radius:50%">📵</div>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let me = "", target = null, recorder, chunks = [], peer;
        function auth(t) { socket.emit(t, { user: user.value, pass: pass.value }); }
        socket.on('login_success', d => {
            me = d.user; localStorage.setItem('00_u', d.user); localStorage.setItem('00_p', d.pass);
            document.getElementById('auth').style.display = 'none';
        });
        window.onload = () => {
            const u = localStorage.getItem('00_u'), p = localStorage.getItem('00_p');
            if(u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };
        function setChat(t) {
            target = t; document.body.classList.add('chat-open');
            document.getElementById('call-trigger').style.display = t ? 'block' : 'none';
            document.getElementById('h-name').innerText = t || "Общий чат";
            document.getElementById('msgs').innerHTML = ""; socket.emit('get_history', t);
        }
        socket.on('update_users', d => {
            const list = document.getElementById('u-list'); list.innerHTML = "";
            d.all.forEach(u => {
                if(u === me) return;
                const div = document.createElement('div');
                div.className = 'u-item' + (target === u ? ' active' : '');
                div.innerHTML = \`<div class="ava">\${u[0]}<div class="status-dot \${d.online.includes(u)?'on':''}"></div></div><b>\${u}</b>\`;
                div.onclick = () => setChat(u); list.appendChild(div);
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
            const s = await navigator.mediaDevices.getUserMedia({ audio: true });
            recorder = new MediaRecorder(s); chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
            recorder.onstop = () => {
                const b = new Blob(chunks, { type: 'audio/ogg' });
                const r = new FileReader();
                r.onload = () => socket.emit('chat message', { to: target, file: { data: r.result }, isVoice: true });
                r.readAsDataURL(b);
            }; recorder.start();
        }
        function stopRec() { if(recorder) recorder.stop(); }
        socket.on('chat message', m => { if((!target && !m.to) || (target && (m.from===target || m.to===target))) addM(m); });
        socket.on('history', h => h.forEach(addM));
        socket.on('msg_deleted', id => document.getElementById(id)?.remove());
        function addM(m) {
            const d = document.createElement('div'); d.className = 'm ' + (m.from === me ? 'out' : 'in'); d.id = m.id;
            let c = \`<b>\${m.from}</b><br>\`;
            if(m.from === me) c += \`<div class="del-btn" onclick="socket.emit('delete_msg', '\${m.id}')">×</div>\`;
            if(m.isVoice) c += \`<audio src="\${m.file.data}" controls></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) c += \`<img src="\${m.file.data}" style="max-width:100%">\`;
                else c += \`<a href="\${m.file.data}" download="\${m.file.name}" style="color:#fff">📄 \${m.file.name}</a>\`;
            }
            c += \`<div>\${m.text}</div>\`; d.innerHTML = c; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
        }
        async function makeCall() {
            call_ui.style.display = 'flex';
            peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            const s = await navigator.mediaDevices.getUserMedia({ audio: true });
            s.getTracks().forEach(t => peer.addTrack(t, s));
            const o = await peer.createOffer(); await peer.setLocalDescription(o);
            socket.emit('call-user', { to: target, offer: o });
            peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
        }
        socket.on('incoming-call', d => {
            call_ui.style.display = 'flex'; c_status.innerText = "Вызов от " + d.from; ans_btn.style.display = 'block';
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
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => console.log('🚀 00 ULTRA ELITE ONLINE ON PORT ' + PORT));