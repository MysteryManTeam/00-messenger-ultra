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
        // Фильтруем историю: либо общий (to: null), либо строго между мной и t
        const h = db.messages.filter(m => {
            if (!t) return !m.to;
            return (m.to === t && m.from === curr) || (m.to === curr && m.from === t);
        }).slice(-80);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now(), from: curr, to: d.to || null, text: d.text || "" };
        db.messages.push(m); save();
        if (!d.to) {
            io.emit('msg', m); // В общий всем
        } else {
            if (online[d.to]) io.to(online[d.to]).emit('msg', m); // Получателю
            socket.emit('msg', m); // Себе
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
    <meta charset="UTF-8">
    <title>00 Messenger Clean Edition</title>
    <style>
        :root { --bg: #121212; --side: #1e1e1e; --acc: #00a2ff; --brd: #2a2a2a; }
        body { background: var(--bg); color: #e0e0e0; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        
        #sidebar { width: 260px; background: var(--side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat-main { flex: 1; display: flex; flex-direction: column; position: relative; }

        .hdr { padding: 15px; border-bottom: 1px solid var(--brd); background: #1a1a1a; display: flex; justify-content: space-between; align-items: center; }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; background: #121212; }
        
        .m { padding: 10px 14px; border-radius: 8px; max-width: 75%; font-size: 14px; line-height: 1.4; position: relative; }
        .m.me { align-self: flex-end; background: #0056b3; color: white; border-bottom-right-radius: 2px; }
        .m.them { align-self: flex-start; background: #2d2d2d; color: #eee; border-bottom-left-radius: 2px; }
        .m small { display: block; margin-bottom: 4px; opacity: 0.7; font-size: 11px; font-weight: bold; }

        /* ПОЛЗУНОК-РЕЗАЙЗЕР */
        #resizer { height: 10px; background: #222; cursor: ns-resize; display: flex; justify-content: center; align-items: center; border-top: 1px solid var(--brd); }
        #resizer:hover { background: #333; }
        #resizer::after { content: ""; width: 40px; height: 3px; background: #444; border-radius: 2px; }

        .input-panel { background: var(--side); display: flex; flex-direction: column; }
        .input-row { display: flex; padding: 12px; gap: 12px; flex: 1; }
        textarea { flex: 1; background: #000; border: 1px solid #333; color: white; padding: 10px; border-radius: 6px; resize: none; outline: none; font-family: inherit; }

        .u-item { padding: 14px; cursor: pointer; border-bottom: 1px solid #252525; transition: 0.2s; }
        .u-item:hover { background: #252525; }
        .u-item.active { background: #2d2d2d; border-left: 4px solid var(--acc); }

        button { padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; font-weight: bold; transition: 0.2s; }
        button:active { transform: scale(0.95); }

        #call-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; flex-direction: column; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:10000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#1e1e1e; padding:35px; border-radius:12px; border:1px solid #333; text-align:center; width:300px;">
            <h2 style="margin-bottom:25px; color:var(--acc)">00 Messenger</h2>
            <input id="un" placeholder="Логин" style="width:100%; padding:10px; margin-bottom:12px; background:#000; border:1px solid #333; color:white;">
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:25px; background:#000; border:1px solid #333; color:white;">
            <button onclick="authReq('login')" style="background:var(--acc); color:white; width:100%">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#666; cursor:pointer; margin-top:20px">Нет аккаунта? Создать</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr"><b>Диалоги</b></div>
        <div id="u-list" style="overflow-y:auto; flex:1"></div>
    </div>

    <div id="chat-main">
        <div class="hdr">
            <b id="title">Общий чат</b>
            <button id="c-btn" style="display:none; background:#28a745; color:white;" onclick="startCall()">📞 Позвонить</button>
        </div>
        <div id="msgs"></div>
        <div class="input-panel" id="panel" style="height: 110px;">
            <div id="resizer"></div>
            <div class="input-row">
                <textarea id="mi" placeholder="Ваше сообщение..."></textarea>
                <button onclick="send()" style="background:var(--acc); color:white; width:50px">➔</button>
            </div>
        </div>
    </div>

    <div id="call-overlay">
        <h2 id="call-info" style="margin-bottom:30px">Вызов...</h2>
        <div id="call-controls" style="display:flex; gap:25px;"></div>
        <audio id="remoteAudio" autoplay></audio>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        // ЛОГИКА РЕЗАЙЗЕРА
        const resizer = document.getElementById('resizer');
        const panel = document.getElementById('panel');
        let isResizing = false;

        resizer.onmousedown = () => isResizing = true;
        document.onmousemove = (e) => {
            if (!isResizing) return;
            let newHeight = window.innerHeight - e.clientY;
            if (newHeight > 70 && newHeight < 500) panel.style.height = newHeight + 'px';
        };
        document.onmouseup = () => isResizing = false;

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
            list.innerHTML = '<div class="u-item active" onclick="select(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { 
                if(u !== me) {
                    list.innerHTML += \`<div class="u-item" onclick="select('\${u}')">👤 \${u} \${d.on.includes(u)?'<span style="color:#28a745">●</span>':''}</div>\`;
                }
            });
        });

        function send() { if(mi.value.trim()) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }

        // ЧИСТАЯ ФИЛЬТРАЦИЯ СООБЩЕНИЙ
        socket.on('msg', m => {
            const isForGeneral = !m.to && !target;
            const isForCurrentPrivate = target && (m.from === target || (m.from === me && m.to === target));
            
            if (isForGeneral || isForCurrentPrivate) {
                render(m);
            }
        });

        socket.on('hist', h => h.forEach(render));

        function render(m) {
            const div = document.createElement('div');
            div.className = 'm ' + (m.from === me ? 'me' : 'them');
            div.innerHTML = \`<small>\${m.from}</small><div>\${m.text}</div>\`;
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }

        // ЗВОНКИ
        async function startCall() {
            document.getElementById('call-overlay').style.display = 'flex';
            document.getElementById('call-info').innerText = "Исходящий звонок: " + target;
            document.getElementById('call-controls').innerHTML = '<button onclick="location.reload()" style="background:#dc3545; color:white">Отмена</button>';
            
            peer = new RTCPeerConnection(conf);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };

            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
        }

        socket.on('in_call', async d => {
            document.getElementById('call-overlay').style.display = 'flex';
            document.getElementById('call-info').innerText = "Входящий звонок от: " + d.from;
            const ctrls = document.getElementById('call-controls');
            ctrls.innerHTML = '<button id="a_btn" style="background:#28a745; color:white">Принять</button><button onclick="location.reload()" style="background:#dc3545; color:white">Отклонить</button>';
            
            document.getElementById('a_btn').onclick = async () => {
                ctrls.innerHTML = '<button onclick="location.reload()" style="background:#dc3545; color:white">Завершить</button>';
                peer = new RTCPeerConnection(conf);
                const s = await navigator.mediaDevices.getUserMedia({audio:true});
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const ans = await peer.createAnswer();
                await peer.setLocalDescription(ans);
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
http.listen(PORT, '0.0.0.0', () => { console.log('Messenger Running on Port ' + PORT); });