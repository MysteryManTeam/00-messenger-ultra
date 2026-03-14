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
        const m = { id: 'id'+Date.now(), from: curr, to: d.to || null, text: d.text || "" };
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

    socket.on('disconnect', () => { 
        if(curr){ delete online[curr]; io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) }); } 
    });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>00 Messenger Fix</title>
    <style>
        :root { --bg: #1a1a1a; --side: #252525; --acc: #60cdff; --brd: #333; }
        body { background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 280px; background: var(--side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat-main { flex: 1; display: flex; flex-direction: column; }
        .hdr { padding: 15px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; background: #202020; }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 8px; }
        .m { padding: 8px 12px; border-radius: 6px; max-width: 70%; font-size: 14px; }
        .m.me { align-self: flex-end; background: #005fb8; }
        .m.them { align-self: flex-start; background: #333; }
        #resizer { height: 8px; background: #333; cursor: ns-resize; display: flex; justify-content: center; align-items: center; }
        #resizer:hover { background: var(--acc); }
        #resizer::after { content: ""; width: 30px; height: 2px; background: #666; }
        .input-panel { background: var(--side); border-top: 1px solid var(--brd); display: flex; flex-direction: column; }
        .input-row { display: flex; padding: 10px; gap: 10px; flex: 1; }
        textarea { flex: 1; background: #111; border: 1px solid #444; color: white; padding: 8px; border-radius: 4px; resize: none; outline: none; }
        .u-item { padding: 12px; cursor: pointer; border-bottom: 1px solid #333; }
        .u-item:hover { background: #333; }
        .active { border-left: 3px solid var(--acc); background: #333; }
        #call-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 9999; flex-direction: column; align-items: center; justify-content: center; }
        button { padding: 8px 15px; border-radius: 4px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:10000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#222; padding:30px; border-radius:8px; border:1px solid #444; text-align:center;">
            <h2>Messenger</h2>
            <input id="un" placeholder="Логин" style="margin-bottom:10px; padding:8px; width:200px;"><br>
            <input id="pw" type="password" placeholder="Пароль" style="margin-bottom:20px; padding:8px; width:200px;"><br>
            <button onclick="authReq('login')" style="background:var(--acc); width:100%">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer">Регистрация</p>
        </div>
    </div>

    <div id="sidebar"><div class="hdr"><b>Чаты</b></div><div id="u-list"></div></div>
    <div id="chat-main">
        <div class="hdr">
            <b id="title">Общий чат</b>
            <button id="c-btn" style="display:none; background:#2ecc71; color:white;" onclick="startCall()">📞 Позвонить</button>
        </div>
        <div id="msgs"></div>
        <div class="input-panel" id="panel" style="height: 100px;">
            <div id="resizer"></div>
            <div class="input-row">
                <textarea id="mi" placeholder="Сообщение..."></textarea>
                <button onclick="send()" style="background:var(--acc); color:black">➔</button>
            </div>
        </div>
    </div>

    <div id="call-overlay">
        <h2 id="call-info">Вызов...</h2>
        <div id="call-controls" style="display:flex; gap:20px; margin-top:20px;"></div>
        <audio id="remoteAudio" autoplay></audio>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        // ПОДНИМАТЕЛЬ ПОЛЯ
        const resizer = document.getElementById('resizer');
        const panel = document.getElementById('panel');
        let dragging = false;
        resizer.onmousedown = () => dragging = true;
        document.onmousemove = (e) => {
            if(!dragging) return;
            let h = window.innerHeight - e.clientY;
            if(h > 60 && h < 500) panel.style.height = h + 'px';
        };
        document.onmouseup = () => dragging = false;

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        socket.on('auth_ok', d => { me=d.user; auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function select(u) {
            target = u;
            document.querySelectorAll('.u-item').forEach(el => el.classList.remove('active'));
            if(event) event.currentTarget?.classList.add('active');
            title.innerText = u || "Общий чат";
            c_btn.style.display = u ? "block" : "none";
            msgs.innerHTML = '';
            socket.emit('get_h', u);
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-item" onclick="select(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { if(u !== me) {
                list.innerHTML += \`<div class="u-item" onclick="select('\${u}')">👤 \${u} \${d.on.includes(u)?'●':''}</div>\`;
            }});
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }

        // ГЛАВНЫЙ ФИКС БАГА С ДУБЛИРОВАНИЕМ В ЛС
        socket.on('msg', m => {
            // Условие: если сообщение общее и мы в общем чате ИЛИ если сообщение личное и мы в чате с этим человеком
            const isGeneral = !m.to && !target;
            const isMyPrivate = target && (m.from === target || (m.from === me && m.to === target));
            
            if(isGeneral || isMyPrivate) {
                render(m);
            }
        });

        socket.on('hist', h => h.forEach(render));

        function render(m) {
            const d = document.createElement('div');
            d.className = 'm ' + (m.from === me ? 'me' : 'them');
            d.innerHTML = \`<small>\${m.from}</small><div>\${m.text}</div>\`;
            msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
        }

        async function startCall() {
            document.getElementById('call-overlay').style.display = 'flex';
            document.getElementById('call-info').innerText = "Звоним " + target + "...";
            document.getElementById('call-controls').innerHTML = '<button onclick="location.reload()" style="background:#e74c3c; color:white">Отмена</button>';
            peer = new RTCPeerConnection(conf);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
        }

        socket.on('in_call', async d => {
            document.getElementById('call-overlay').style.display = 'flex';
            document.getElementById('call-info').innerText = "Входящий от " + d.from;
            const ctrls = document.getElementById('call-controls');
            ctrls.innerHTML = '<button id="acc" style="background:#2ecc71; color:white">Принять</button><button onclick="location.reload()" style="background:#e74c3c; color:white">Отклонить</button>';
            document.getElementById('acc').onclick = async () => {
                ctrls.innerHTML = '<button onclick="location.reload()" style="background:#e74c3c; color:white">Завершить</button>';
                peer = new RTCPeerConnection(conf);
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
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Work'); });