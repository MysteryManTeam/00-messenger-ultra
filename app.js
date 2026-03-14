const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { 
    cors: { origin: "*" }, 
    maxHttpBufferSize: 1e8 
});
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// --- РАБОТА С ДАННЫМИ ---
const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };

if (fs.existsSync(DB_FILE)) { 
    try { 
        db = JSON.parse(fs.readFileSync(DB_FILE)); 
    } catch (e) { console.log("Ошибка БД"); } 
}

function saveDB() { 
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4)); 
}

let onlineUsers = {};

// --- МАРШРУТЫ ---
app.get('/manifest.json', (req, res) => {
    res.json({
        "short_name": "00 Ultra",
        "name": "00 Ultra Messenger Elite",
        "icons": [{"src": "https://cdn-icons-png.flaticon.com/512/2592/2592317.png", "type": "image/png", "sizes": "512x512"}],
        "start_url": "/", "display": "standalone", "theme_color": "#0b0e14", "background_color": "#0b0e14"
    });
});

app.get('/', (req, res) => { res.send(htmlContent); });

// --- СОКЕТЫ ---
io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('login', (d) => {
        const found = db.users[d.user];
        if (found && (d.isAuto ? d.pass === found.password : bcrypt.compareSync(d.pass, found.password))) {
            currentUser = d.user;
            socket.join(d.user);
            onlineUsers[d.user] = socket.id;
            socket.emit('login_success', { user: d.user, pass: found.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) });
        }
    });

    socket.on('register', (d) => {
        if (!d.user || !d.pass || db.users[d.user]) return;
        db.users[d.user] = { password: bcrypt.hashSync(d.pass, 10) };
        saveDB();
        socket.emit('register_success');
    });

    socket.on('get_history', (t) => {
        if (!currentUser) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===currentUser) || (m.to===currentUser && m.from===t)).slice(-150);
        socket.emit('history', h);
    });

    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msg = { 
            id: 'id' + Date.now(), from: currentUser, to: data.to || null, 
            text: data.text || "", file: data.file || null, isVoice: data.isVoice || false, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        db.messages.push(msg); saveDB();
        if (!data.to) io.emit('chat message', msg); else io.to(data.to).to(currentUser).emit('chat message', msg);
    });

    socket.on('delete_msg', (id) => {
        const idx = db.messages.findIndex(m => m.id === id && m.from === currentUser);
        if (idx !== -1) { db.messages.splice(idx, 1); saveDB(); io.emit('msg_deleted', id); }
    });

    socket.on('call-user', (d) => io.to(d.to).emit('incoming-call', { from: currentUser, offer: d.offer }));
    socket.on('answer-call', (d) => io.to(d.to).emit('call-accepted', { answer: d.answer }));
    socket.on('ice-candidate', (d) => io.to(d.to).emit('ice-candidate', { candidate: d.candidate }));

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>00 Ultra Elite</title>
    <style>
        :root { --bg: #0b0e14; --side: #171c26; --accent: #00aff0; --msg-in: #222b3a; --msg-out: #005c84; --text: #f5f5f5; }
        * { box-sizing: border-box; font-family: sans-serif; }
        body { background: var(--bg); color: var(--text); margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 350px; background: var(--side); display: flex; flex-direction: column; border-right: 1px solid #222; flex-shrink: 0; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #000; position: relative; }
        @media (max-width: 900px) {
            #sidebar { width: 100%; position: absolute; height: 100%; z-index: 10; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; }
            body.chat-open #sidebar { transform: translateX(-20%); opacity: 0.5; }
            body.chat-open #chat { transform: translateX(0); z-index: 20; }
        }
        .header { padding: 15px; background: var(--side); display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #222; min-height: 65px; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: #080a0f; }
        #input-area { padding: 15px; background: var(--side); display: flex; gap: 10px; align-items: center; transition: margin-bottom 0.2s; }
        #msg-in { flex: 1; background: #080a0f; border: 1px solid #333; color: #fff; padding: 12px; border-radius: 20px; outline: none; }
        .act-btn { font-size: 24px; cursor: pointer; user-select: none; }
        .act-btn.recording { color: #ff3b30; animation: blink 1s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .m { max-width: 80%; padding: 12px; border-radius: 15px; position: relative; font-size: 15px; word-wrap: break-word; }
        .m.in { align-self: flex-start; background: var(--msg-in); }
        .m.out { align-self: flex-end; background: var(--msg-out); }
        .del-btn { position: absolute; top: -5px; right: -5px; background: #ff3b30; border-radius: 50%; width: 18px; height: 18px; font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        #call-ui { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 3000; flex-direction: column; align-items: center; justify-content: center; }
        #v-meter { width: 150px; height: 8px; background: #333; margin-top: 15px; border-radius: 10px; overflow: hidden; }
        #v-level { width: 0%; height: 100%; background: #00ff88; transition: 0.1s; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:4000; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--side); padding:30px; border-radius:20px; text-align:center; width:90%; max-width:350px;">
            <h1 style="color:var(--accent)">00 ULTRA</h1>
            <input type="text" id="user" placeholder="Логин" style="width:100%; margin-bottom:10px; padding:10px; background:#000; color:#fff; border:1px solid #333;">
            <input type="password" id="pass" placeholder="Пароль" style="width:100%; margin-bottom:15px; padding:10px; background:#000; color:#fff; border:1px solid #333;">
            <button onclick="doAuth('login')" style="width:100%; padding:12px; background:var(--accent); color:#fff; border:none; font-weight:bold; cursor:pointer;">ВОЙТИ</button>
            <p onclick="doAuth('register')" style="font-size:12px; margin-top:15px; cursor:pointer; opacity:0.6;">Регистрация</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header"><b>Чаты</b> <button onclick="localStorage.clear(); location.reload();" style="margin-left:auto; background:#ff3b30; color:#fff; border:none; padding:5px; border-radius:5px; font-size:10px;">ВЫХОД</button></div>
        <div id="u-list"></div>
    </div>

    <div id="chat">
        <div class="header">
            <div onclick="document.body.classList.remove('chat-open')" style="cursor:pointer; font-size:24px;">←</div>
            <b id="h-name" style="flex:1">Чат</b>
            <div id="call-trigger" class="act-btn" style="display:none" onclick="startCall()">📞</div>
        </div>
        <div id="msgs"></div>
        <div style="background:var(--side); padding:5px 15px; display:flex; align-items:center; gap:10px;">
            <span style="font-size:10px">ПОДЪЕМ:</span>
            <input type="range" min="0" max="350" value="0" style="flex:1" oninput="document.getElementById('input-area').style.marginBottom = this.value+'px'">
        </div>
        <div id="input-area">
            <label class="act-btn">📎<input type="file" id="f-in" style="display:none" onchange="upF()"></label>
            <input type="text" id="msg-in" placeholder="Сообщение...">
            <div id="rec-btn" class="act-btn" onclick="toggleRec()">🎤</div>
            <div class="act-btn" onclick="sendMsg()">➤</div>
        </div>
    </div>

    <div id="call-ui">
        <h2 id="c-status">Звонок...</h2>
        <div id="v-meter"><div id="v-level"></div></div>
        <div style="display:flex; gap:30px; margin-top:40px;">
            <div id="ans-btn" class="act-btn" style="background:#4cd964; padding:20px; border-radius:50%; display:none">📞</div>
            <div onclick="location.reload()" class="act-btn" style="background:#ff3b30; padding:20px; border-radius:50%">📵</div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let me="", target=null, peer, recorder, chunks=[], isRec=false;
        const ice = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        if ("Notification" in window) Notification.requestPermission();

        function doAuth(t) { socket.emit(t, { user: user.value, pass: pass.value }); }
        socket.on('login_success', d => { me=d.user; localStorage.setItem('00_u', d.user); localStorage.setItem('00_p', d.pass); auth.style.display='none'; });
        window.onload = () => { if(localStorage.getItem('00_u')) socket.emit('login', { user: localStorage.getItem('00_u'), pass: localStorage.getItem('00_p'), isAuto: true }); };

        function setChat(u) { target=u; document.body.classList.add('chat-open'); h_name.innerText=u||"Общий чат"; call_trigger.style.display=u?'block':'none'; msgs.innerHTML=""; socket.emit('get_history', u); }
        socket.on('update_users', d => {
            u_list.innerHTML = '<div onclick="setChat(null)" style="padding:15px; border-bottom:1px solid #222; cursor:pointer;"><b>🌍 Общий чат</b></div>';
            d.all.forEach(u => { if(u!==me) { const div=document.createElement('div'); div.style.padding="15px"; div.style.borderBottom="1px solid #222"; div.innerHTML=\`<b>\${u}</b> \${d.online.includes(u)?'🟢':''}\`; div.onclick=()=>setChat(u); u_list.appendChild(div); } });
        });

        function sendMsg() { if(msg_in.value.trim()) { socket.emit('chat message', { text: msg_in.value, to: target }); msg_in.value=''; } }
        function upF() { const f=f_in.files[0]; const r=new FileReader(); r.onload=()=>socket.emit('chat message', { to: target, file: { name: f.name, data: r.result, type: f.type } }); r.readAsDataURL(f); }

        socket.on('chat message', m => { 
            if((!target && !m.to) || (target && (m.from===target || m.to===target))) addM(m); 
            if(m.from!==me && document.hidden) new Notification("00 Ultra", { body: m.from + ": " + (m.text||"Файл") });
        });
        socket.on('history', h => h.forEach(addM));
        socket.on('msg_deleted', id => document.getElementById(id)?.remove());

        function addM(m) {
            const d=document.createElement('div'); d.className='m '+(m.from===me?'out':'in'); d.id=m.id;
            let c = \`<b style="font-size:10px">\${m.from}</b><br>\`;
            if(m.from===me) c+=\`<div class="del-btn" onclick="socket.emit('delete_msg', '\${m.id}')">×</div>\`;
            if(m.isVoice) c+=\`<audio src="\${m.file.data}" controls style="width:100%"></audio>\`;
            else if(m.file) { if(m.file.type.startsWith('image')) c+=\`<img src="\${m.file.data}" style="max-width:100%">\`; else c+=\`<a href="\${m.file.data}" download="\${m.file.name}" style="color:#fff">📄 \${m.file.name}</a>\`; }
            if(m.text) c+=\`<div>\${m.text}</div>\`; d.innerHTML=c; msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
        }

        async function toggleRec() {
            if(!isRec) {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                recorder = new MediaRecorder(s); chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const b = new Blob(chunks, { type: 'audio/ogg' });
                    const r = new FileReader();
                    r.onload = () => socket.emit('chat message', { to: target, file: { data: r.result }, isVoice: true });
                    r.readAsDataURL(b); s.getTracks().forEach(t => t.stop());
                };
                recorder.start(); isRec = true; rec_btn.classList.add('recording');
            } else {
                recorder.stop(); isRec = false; rec_btn.classList.remove('recording');
            }
        }

        async function startCall() {
            call_ui.style.display='flex'; peer = new RTCPeerConnection(ice);
            const s = await navigator.mediaDevices.getUserMedia({ audio: true });
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice-candidate', { to: target, candidate: e.candidate });
            const o = await peer.createOffer(); await peer.setLocalDescription(o);
            socket.emit('call-user', { to: target, offer: o });
            peer.ontrack = e => { const a=new Audio(); a.srcObject=e.streams[0]; a.play(); };
        }

        socket.on('incoming-call', async d => {
            call_ui.style.display='flex'; c_status.innerText="Вызов: "+d.from; ans_btn.style.display='block';
            ans_btn.onclick = async () => {
                ans_btn.style.display='none'; peer = new RTCPeerConnection(ice);
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice-candidate', { to: d.from, candidate: e.candidate });
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const a = await peer.createAnswer(); await peer.setLocalDescription(a);
                socket.emit('answer-call', { to: d.from, answer: a });
                peer.ontrack = e => { const au=new Audio(); au.srcObject=e.streams[0]; au.play(); };
            };
        });
        socket.on('call-accepted', d => peer.setRemoteDescription(new RTCSessionDescription(d.answer)));
        socket.on('ice-candidate', d => peer?.addIceCandidate(new RTCIceCandidate(d.candidate)));
    </script>
</body>
</html>
\`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 00 ULTRA запущен на порту: ' + PORT);
});