const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 });
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_FILE = './database.json';
let db = { users: {}, messages: [] };
if (fs.existsSync(DB_FILE)) { try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch (e) {} }

function save() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4)); }
let online = {};

app.get('/', (req, res) => { res.send(ui); });

io.on('connection', (socket) => {
    let curr = null;
    socket.on('auth', (d) => {
        const u = db.users[d.user];
        if (d.type === 'reg') {
            if (u) return socket.emit('err', 'Логин занят');
            db.users[d.user] = { pass: bcrypt.hashSync(d.pass, 10) };
            save(); socket.emit('sys', 'Готово');
        } else {
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(d.user); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'Ошибка входа');
        }
    });

    socket.on('get_h', (t) => {
        if (!curr) return;
        const h = db.messages.filter(m => !t ? !m.to : (m.to === t && m.from === curr) || (m.to === curr && m.from === t)).slice(-60);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now(), from: curr, to: d.to || null, text: d.text || "", file: d.file || null, isVoice: d.isVoice || false };
        db.messages.push(m); save();
        if (!d.to) io.emit('msg', m); 
        else { 
            if (online[d.to]) io.to(online[d.to]).emit('msg', m);
            socket.emit('msg', m); 
        }
    });

    socket.on('call', d => { if(online[d.to]) io.to(online[d.to]).emit('in_call', { from: curr, offer: d.offer }); });
    socket.on('ans', d => { if(online[d.to]) io.to(online[d.to]).emit('call_ok', { ans: d.ans }); });
    socket.on('ice', d => { if(online[d.to]) io.to(online[d.to]).emit('ice', { cand: d.cand }); });
    socket.on('disconnect', () => { if(curr){ delete online[curr]; io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) }); } });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>00 Messenger Ultra</title>
    <style>
        :root { --win-dark: #1c1c1c; --win-side: #252525; --win-acc: #60cdff; --brd: #333; }
        body { background: var(--win-dark); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 300px; background: var(--win-side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat-area { flex: 1; display: flex; flex-direction: column; position: relative; }
        .header { padding: 12px 20px; border-bottom: 1px solid var(--brd); background: rgba(30,30,30,0.8); display: flex; align-items: center; justify-content: space-between; }
        #messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .msg { padding: 10px 14px; border-radius: 8px; max-width: 70%; font-size: 14px; }
        .msg.me { align-self: flex-end; background: #005fb8; }
        .msg.them { align-self: flex-start; background: #333; }
        .input-panel { background: var(--win-side); border-top: 1px solid var(--brd); padding: 10px 20px; display: flex; flex-direction: column; }
        #height-slider { width: 100%; height: 15px; cursor: ns-resize; display: flex; align-items: center; justify-content: center; }
        #height-slider::after { content: ""; width: 30px; height: 3px; background: #555; border-radius: 2px; }
        .controls { display: flex; align-items: center; gap: 15px; flex: 1; margin-top: 5px; }
        textarea#mi { flex: 1; background: #2d2d2d; border: 1px solid #444; color: white; padding: 10px; border-radius: 6px; resize: none; outline: none; font-size: 14px; }
        .u-card { padding: 12px 20px; cursor: pointer; border-bottom: 1px solid #2d2d2d; display: flex; align-items: center; justify-content: space-between; }
        .u-card.active { background: #3d3d3d; border-left: 4px solid var(--win-acc); }
        .btn-icon { cursor: pointer; font-size: 20px; }
        #call-box { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; flex-direction: column; align-items: center; justify-content: center; }
        button { padding: 10px 20px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--win-dark); z-index:10000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#2b2b2b; padding:40px; border-radius:12px; width:320px; text-align:center; border:1px solid #444">
            <h2 style="margin-top:0">00 Messenger</h2>
            <input id="un" placeholder="Логин" style="width:100%; padding:10px; margin-bottom:10px; background:#111; color:white; border:1px solid #444"><br>
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:20px; background:#111; color:white; border:1px solid #444"><br>
            <button onclick="authReq('login')" style="background:var(--win-acc); color:#000; width:100%">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer; margin-top:15px">Создать аккаунт</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header"><b>Чаты</b> <span onclick="logout()" class="btn-icon">🚪</span></div>
        <div id="u-list"></div>
    </div>

    <div id="chat-area">
        <div class="header">
            <b id="chat-title">Общий чат</b>
            <div id="call-btn" style="display:none" onclick="startCall()" class="btn-icon">📞</div>
        </div>
        <div id="messages"></div>
        <div class="input-panel" id="panel" style="height: 100px;">
            <div id="height-slider"></div>
            <div class="controls">
                <textarea id="mi" placeholder="Сообщение..." onkeypress="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();send();}"></textarea>
                <span class="btn-icon" onclick="send()" style="color:var(--win-acc)">➔</span>
            </div>
        </div>
    </div>

    <div id="call-box">
        <h2 id="call-status">Входящий звонок!</h2>
        <div style="display:flex; gap:40px; margin-top:30px">
            <button id="accept-btn" style="background:#2ecc71; color:white; font-size:20px">Принять</button>
            <button onclick="location.reload()" style="background:#e74c3c; color:white; font-size:20px">Сбросить</button>
        </div>
        <audio id="remoteAudio" autoplay></audio>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        
        // Звук уведомления
        const notifySound = new Audio('https://actions.google.com/sounds/v1/foley/beeps_short_marimba_resampled.ogg');

        // Запрос разрешений
        if (Notification.permission !== 'granted') Notification.requestPermission();

        function showNotify(title, body) {
            if (Notification.permission === 'granted') {
                new Notification(title, { body: body, icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' });
            }
            notifySound.play().catch(()=> { console.log('Кликни по странице для активации звука'); });
        }

        // Ресайзер
        const slider = document.getElementById('height-slider');
        const panel = document.getElementById('panel');
        let isDragging = false;
        slider.onmousedown = () => isDragging = true;
        document.onmousemove = (e) => {
            if (isDragging) {
                let h = window.innerHeight - e.clientY;
                if (h > 60 && h < 500) panel.style.height = h + 'px';
            }
        };
        document.onmouseup = () => isDragging = false;

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function selectChat(u) {
            target = u;
            document.querySelectorAll('.u-card').forEach(c => c.classList.remove('active'));
            event.currentTarget?.classList.add('active');
            document.getElementById('chat-title').innerText = u || 'Общий чат';
            document.getElementById('call-btn').style.display = u ? 'block' : 'none';
            document.getElementById('messages').innerHTML = '';
            socket.emit('get_h', u);
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-card" onclick="selectChat(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { if(u !== me) {
                let div = document.createElement('div'); div.className = 'u-card';
                div.innerHTML = \`<span>👤 \${u}</span> <span style="color:\${d.on.includes(u)?'#2ecc71':'#555'}">●</span>\`;
                div.onclick = (e) => selectChat(u); list.appendChild(div);
            }});
        });

        function send() { if(mi.value.trim()) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }

        socket.on('msg', m => {
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) {
                renderMsg(m);
            } else if (m.from !== me) {
                showNotify("Новое сообщение", m.from + ": " + m.text);
            }
        });

        socket.on('hist', h => h.forEach(renderMsg));

        function renderMsg(m) {
            const msgs = document.getElementById('messages');
            const div = document.createElement('div');
            div.className = 'msg ' + (m.from === me ? 'me' : 'them');
            div.innerHTML = \`<small style="opacity:0.6">\${m.from}</small><div>\${m.text}</div>\`;
            msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
        }

        async function startCall() {
            document.getElementById('call-box').style.display='flex';
            peer = new RTCPeerConnection(config);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
        }

        socket.on('in_call', async d => {
            showNotify("Входящий звонок", "Вам звонит " + d.from);
            document.getElementById('call-box').style.display='flex';
            document.getElementById('call-status').innerText = 'Звонит: ' + d.from;
            const btn = document.getElementById('accept-btn'); btn.style.display='block';
            btn.onclick = async () => {
                btn.style.display='none'; peer = new RTCPeerConnection(config);
                const s = await navigator.mediaDevices.getUserMedia({audio:true});
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const ans = await peer.createAnswer(); await peer.setLocalDescription(ans);
                socket.emit('ans', {to:d.from, ans});
            };
        });
        socket.on('call_ok', d => peer.setRemoteDescription(new RTCSessionDescription(d.ans)));
        socket.on('ice', d => peer?.addIceCandidate(new RTCIceCandidate(d.cand)));

        window.onload = () => {
            const u = localStorage.getItem('u'), p = localStorage.getItem('p');
            if(u && p) socket.emit('auth', {type:'login', user:u, pass:p, isAuto:true});
        };
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Server started'); });