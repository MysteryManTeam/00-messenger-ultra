const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 });
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };

if (fs.existsSync(DB_FILE)) { 
    try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch (e) { console.log("DB Error"); } 
}

function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4)); }
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

    socket.on('login', (d) => {
        const found = db.users[d.user];
        if (found && (d.isAuto ? d.pass === found.password : bcrypt.compareSync(d.pass, found.password))) {
            currentUser = d.user; socket.join(d.user); onlineUsers[d.user] = socket.id;
            socket.emit('login_success', { user: d.user, pass: found.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Object.keys(onlineUsers) });
        }
    });

    socket.on('register', (d) => {
        if (!d.user || !d.pass || db.users[d.user]) return;
        db.users[d.user] = { password: bcrypt.hashSync(d.pass, 10) };
        saveDB(); socket.emit('register_success');
    });

    socket.on('get_history', (t) => {
        if (!currentUser) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===currentUser) || (m.to===currentUser && m.from===t)).slice(-100);
        socket.emit('history', h);
    });

    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msg = { 
            id: 'id' + Date.now() + Math.random(), from: currentUser, to: data.to || null, 
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>00 Ultra</title>
    <style>
        :root { --bg: #0b0e14; --side: #171c26; --accent: #00aff0; --text: #f5f5f5; }
        body { background: var(--bg); color: var(--text); margin: 0; font-family: sans-serif; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 300px; background: var(--side); border-right: 1px solid #222; display: flex; flex-direction: column; flex-shrink: 0; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #000; position: relative; }
        @media (max-width: 800px) {
            #sidebar { width: 100%; position: absolute; height: 100%; z-index: 10; transition: 0.3s; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; }
            body.chat-open #sidebar { transform: translateX(-20%); opacity: 0.5; }
            body.chat-open #chat { transform: translateX(0); z-index: 20; }
        }
        .header { padding: 15px; background: var(--side); display: flex; align-items: center; border-bottom: 1px solid #222; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: #080a0f; }
        #input-area { padding: 15px; background: var(--side); display: flex; gap: 10px; align-items: center; }
        #msg-in { flex: 1; background: #080a0f; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 15px; outline: none; }
        .m { max-width: 80%; padding: 10px; border-radius: 12px; position: relative; font-size: 14px; }
        .m.in { align-self: flex-start; background: #222b3a; }
        .m.out { align-self: flex-end; background: #005c84; }
        .act-btn { font-size: 24px; cursor: pointer; }
        .recording { color: #ff3b30; animation: pulse 1s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:5000; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--side); padding:30px; border-radius:15px; text-align:center;">
            <h2>00 ULTRA</h2>
            <input id="user" placeholder="Логин" style="display:block; width:100%; margin-bottom:10px; padding:10px;">
            <input id="pass" type="password" placeholder="Пароль" style="display:block; width:100%; margin-bottom:10px; padding:10px;">
            <button onclick="socket.emit('login', {user:user.value, pass:pass.value})" style="width:100%; padding:10px; background:var(--accent); color:#fff; border:none;">ВОЙТИ</button>
            <p onclick="socket.emit('register', {user:user.value, pass:pass.value})" style="cursor:pointer; font-size:12px; margin-top:10px;">Регистрация</p>
        </div>
    </div>
    <div id="sidebar">
        <div class="header"><b>Чаты</b></div>
        <div id="u-list"></div>
    </div>
    <div id="chat">
        <div class="header">
            <span onclick="document.body.classList.remove('chat-open')" style="cursor:pointer; margin-right:15px;">←</span>
            <b id="h-name">Выберите чат</b>
            <span id="call-trigger" style="margin-left:auto; display:none; cursor:pointer;" onclick="startCall()">📞</span>
        </div>
        <div id="msgs"></div>
        <div style="padding:5px; background:var(--side); display:flex; align-items:center;">
            <input type="range" min="0" max="350" value="0" style="flex:1" oninput="document.getElementById('input-area').style.marginBottom=this.value+'px'">
        </div>
        <div id="input-area">
            <label class="act-btn">📎<input type="file" id="f-in" style="display:none" onchange="const f=this.files[0]; const r=new FileReader(); r.onload=()=>socket.emit('chat message', {to:target, file:{name:f.name, data:r.result, type:f.type}}); r.readAsDataURL(f)"></label>
            <input id="msg-in" placeholder="Сообщение...">
            <div id="rec-btn" class="act-btn" onclick="toggleRec()">🎤</div>
            <div class="act-btn" onclick="const i=document.getElementById('msg-in'); if(i.value){socket.emit('chat message',{text:i.value, to:target}); i.value='' }">➤</div>
        </div>
    </div>
    <div id="call-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:6000; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="c-status">Звонок...</h2>
        <div style="display:flex; gap:20px; margin-top:20px;">
            <button id="ans-btn" style="background:#4cd964; border:none; padding:20px; border-radius:50%; display:none;">📞</button>
            <button onclick="location.reload()" style="background:#ff3b30; border:none; padding:20px; border-radius:50%;">📵</button>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let me="", target=null, peer, recorder, chunks=[], isRec=false;
        const ice = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        socket.on('login_success', d => { me=d.user; localStorage.setItem('00_u', d.user); localStorage.setItem('00_p', d.pass); auth.style.display='none'; });
        window.onload = () => { if(localStorage.getItem('00_u')) socket.emit('login', {user:localStorage.getItem('00_u'), pass:localStorage.getItem('00_p'), isAuto:true}); };
        function setChat(u) { target=u; document.body.classList.add('chat-open'); h_name.innerText=u||"Общий чат"; call_trigger.style.display=u?'block':'none'; msgs.innerHTML=""; socket.emit('get_history', u); }
        socket.on('update_users', d => {
            u_list.innerHTML = '<div onclick="setChat(null)" style="padding:15px; border-bottom:1px solid #222; cursor:pointer;">🌍 Общий чат</div>';
            d.all.forEach(u => { if(u!==me) { const div=document.createElement('div'); div.style.padding="15px"; div.style.borderBottom="1px solid #222"; div.innerHTML=\`<b>\${u}</b> \${d.online.includes(u)?'🟢':''}\`; div.onclick=()=>setChat(u); u_list.appendChild(div); } });
        });
        socket.on('chat message', m => { if((!target && !m.to) || (target && (m.from===target || m.to===target))) addM(m); });
        socket.on('history', h => h.forEach(addM));
        socket.on('msg_deleted', id => document.getElementById(id)?.remove());
        function addM(m) {
            const d=document.createElement('div'); d.className='m '+(m.from===me?'out':'in'); d.id=m.id;
            let c = \`<small>\${m.from}</small><br>\`;
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
                    const r = new FileReader(); r.onload = () => socket.emit('chat message', { to: target, file: { data: r.result }, isVoice: true });
                    r.readAsDataURL(new Blob(chunks, { type: 'audio/ogg' })); s.getTracks().forEach(t => t.stop());
                };
                recorder.start(); isRec = true; rec_btn.classList.add('recording');
            } else { recorder.stop(); isRec = false; rec_btn.classList.remove('recording'); }
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
            call_ui.style.display='flex'; c_status.innerText="Вызов от "+d.from; ans_btn.style.display='block';
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
    console.log('Server is online');
});