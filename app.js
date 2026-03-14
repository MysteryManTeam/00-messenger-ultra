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
                curr = d.user; socket.join(curr); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'Ошибка входа');
        }
    });

    socket.on('get_h', (t) => {
        if (!curr) return;
        const h = db.messages.filter(m => !t ? !m.to : (m.to === t && m.from === curr) || (m.to === curr && m.from === t)).slice(-80);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now(), from: curr, to: d.to || null, text: d.text || "" };
        db.messages.push(m); save();
        if (!m.to) io.emit('msg', m); 
        else { if (online[m.to]) io.to(m.to).emit('msg', m); socket.emit('msg', m); }
    });

    socket.on('call', d => { if(online[d.to]) io.to(d.to).emit('in_call', { from: curr, offer: d.offer }); });
    socket.on('ans', d => { if(online[d.to]) io.to(d.to).emit('call_ok', { ans: d.ans }); });
    socket.on('ice', d => { if(online[d.to]) io.to(d.to).emit('ice', { cand: d.cand }); });
    socket.on('disconnect', () => { if(curr){ delete online[curr]; io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) }); } });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>00 Messenger Smart</title>
    <style>
        :root { --bg: #121212; --side: #1a1a1a; --acc: #00a2ff; --brd: #333; }
        body { background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; }
        #sidebar { width: 280px; background: var(--side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat-main { flex: 1; display: flex; flex-direction: column; }
        .hdr { padding: 15px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .m { padding: 10px; border-radius: 8px; max-width: 70%; font-size: 14px; }
        .m.me { align-self: flex-end; background: #0056b3; }
        .m.them { align-self: flex-start; background: #333; }
        
        .input-panel { background: var(--side); border-top: 1px solid var(--brd); padding: 10px 15px; display: flex; align-items: flex-end; gap: 10px; }
        textarea { 
            flex: 1; background: #000; color: white; border: 1px solid #444; 
            padding: 10px; border-radius: 8px; resize: none; outline: none; 
            min-height: 40px; max-height: 200px; line-height: 20px; overflow-y: hidden;
        }
        .u-item { padding: 15px; cursor: pointer; border-bottom: 1px solid #222; }
        .u-item.active { border-left: 4px solid var(--acc); background: #222; }
        button { padding: 10px 15px; border: none; border-radius: 8px; cursor: pointer; background: var(--acc); color: white; font-weight: bold; height: 40px; }
        #call-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; flex-direction: column; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:2000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#222; padding:30px; border-radius:10px; text-align:center; width:300px;">
            <h2>Messenger</h2>
            <input id="un" placeholder="Логин" style="width:90%; padding:8px; margin-bottom:10px;"><br>
            <input id="pw" type="password" placeholder="Пароль" style="width:90%; padding:8px; margin-bottom:20px;"><br>
            <button onclick="authReq('login')" style="width:100%">Войти</button>
            <p onclick="authReq('reg')" style="cursor:pointer; color:#888; font-size:12px">Регистрация</p>
        </div>
    </div>

    <div id="sidebar"><div class="hdr">Чаты</div><div id="u-list"></div></div>
    <div id="chat-main">
        <div class="hdr"><b id="title">Общий чат</b><button id="c-btn" style="display:none; background:#28a745" onclick="startCall()">📞</button></div>
        <div id="msgs"></div>
        <div class="input-panel">
            <textarea id="mi" placeholder="Сообщение..." rows="1"></textarea>
            <button onclick="send()">➔</button>
        </div>
    </div>

    <div id="call-overlay">
        <h2 id="call-info">Звонок...</h2>
        <div id="call-controls"></div>
        <audio id="remoteAudio" autoplay></audio>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const mi = document.getElementById('mi');

        // АВТОМАТИЧЕСКИЙ РАЗМЕР ПОЛЯ
        mi.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if (this.scrollHeight > 200) this.style.overflowY = 'auto';
            else this.style.overflowY = 'hidden';
        });

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        socket.on('auth_ok', d => { me=d.user; auth.style.display='none'; select(null); });
        socket.on('err', t => alert(t));

        function select(u) {
            target = u;
            document.querySelectorAll('.u-item').forEach(el => el.classList.remove('active'));
            if(event && event.currentTarget) event.currentTarget.classList.add('active');
            title.innerText = u || "Общий чат";
            c_btn.style.display = u ? "block" : "none";
            msgs.innerHTML = '';
            socket.emit('get_h', u);
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-item" onclick="select(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { if(u !== me) list.innerHTML += \`<div class="u-item" onclick="select('\${u}')">👤 \${u}</div>\`; });
        });

        function send() { 
            if(mi.value.trim()) { 
                socket.emit('msg', {text:mi.value, to:target}); 
                mi.value=''; 
                mi.style.height = '40px'; // Сброс высоты
            } 
        }

        socket.on('msg', m => {
            const forGeneral = !m.to && !target;
            const forMe = target && (m.from === target || (m.from === me && m.to === target));
            if (forGeneral || forMe) render(m);
        });

        socket.on('hist', h => h.forEach(render));
        function render(m) {
            const d = document.createElement('div');
            d.className = 'm ' + (m.from === me ? 'me' : 'them');
            d.innerHTML = \`<small style="display:block;opacity:0.6">\${m.from}</small>\${m.text}\`;
            msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
        }

        // ЗВОНКИ (оставлены без изменений)
        async function startCall() {
            document.getElementById('call-overlay').style.display = 'flex';
            peer = new RTCPeerConnection(conf);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
            document.getElementById('call-controls').innerHTML = '<button onclick="location.reload()" style="background:red">Отмена</button>';
        }

        socket.on('in_call', async d => {
            document.getElementById('call-overlay').style.display = 'flex';
            document.getElementById('call-info').innerText = "Звонит: " + d.from;
            const ctrls = document.getElementById('call-controls');
            ctrls.innerHTML = '<button id="a_btn" style="background:green">Принять</button><button onclick="location.reload()" style="background:red">Отклонить</button>';
            document.getElementById('a_btn').onclick = async () => {
                peer = new RTCPeerConnection(conf);
                const s = await navigator.mediaDevices.getUserMedia({audio:true});
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const ans = await peer.createAnswer(); await peer.setLocalDescription(ans);
                socket.emit('ans', {to:d.from, ans});
                ctrls.innerHTML = '<button onclick="location.reload()" style="background:red">Завершить</button>';
            };
        });
        socket.on('call_ok', d => peer.setRemoteDescription(new RTCSessionDescription(d.ans)));
        socket.on('ice', d => peer?.addIceCandidate(new RTCIceCandidate(d.cand)));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Messenger live'); });