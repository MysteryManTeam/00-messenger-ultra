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
            // Проверка: обычный пароль или сохраненный хэш для автовхода
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(curr); online[curr] = socket.id;
                // Отправляем обратно имя и хэш пароля для сохранения в localStorage
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
        if (!m.to) io.emit('msg', m); 
        else { 
            if (online[m.to]) io.to(m.to).emit('msg', m);
            socket.emit('msg', m); 
        }
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
    <title>00 Messenger Classic Fixed</title>
    <style>
        :root { --bg: #1c1c1c; --side: #252525; --acc: #60cdff; --brd: #333; }
        body { background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 300px; background: var(--side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat-area { flex: 1; display: flex; flex-direction: column; }
        .header { padding: 12px 20px; border-bottom: 1px solid var(--brd); background: rgba(30,30,30,0.8); display: flex; align-items: center; justify-content: space-between; }
        #messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .msg { padding: 10px 14px; border-radius: 8px; max-width: 70%; font-size: 14px; }
        .msg.me { align-self: flex-end; background: #005fb8; }
        .msg.them { align-self: flex-start; background: #333; }
        
        .input-panel { background: var(--side); border-top: 1px solid var(--brd); padding: 10px 20px; display: flex; align-items: flex-end; gap: 10px; }
        textarea { 
            flex: 1; background: #2d2d2d; border: 1px solid #444; color: white; padding: 10px; border-radius: 6px; 
            resize: none; outline: none; min-height: 40px; max-height: 200px; line-height: 20px; overflow: hidden;
        }
        
        .u-card { padding: 12px 20px; cursor: pointer; border-bottom: 1px solid #2d2d2d; }
        .u-card.active { background: #3d3d3d; border-left: 4px solid var(--acc); }
        .btn-icon { cursor: pointer; font-size: 20px; }
        #call-box { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; flex-direction: column; align-items: center; justify-content: center; }
        button { padding: 10px 20px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; background: var(--acc); }
        .logout-btn { background: #ff4d4d; padding: 5px 10px; font-size: 12px; margin-left: 10px; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:10000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#2b2b2b; padding:40px; border-radius:12px; width:320px; text-align:center; border:1px solid #444">
            <h2>00 Messenger</h2>
            <input id="un" placeholder="Логин" style="width:100%; padding:10px; margin-bottom:10px;"><br>
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:20px;"><br>
            <button onclick="authReq('login')" style="width:100%">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer; margin-top:15px">Регистрация</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header">
            <b>Чаты</b>
            <button class="logout-btn" onclick="logout()">Выход</button>
        </div>
        <div id="u-list"></div>
    </div>

    <div id="chat-area">
        <div class="header"><b id="chat-title">Общий чат</b><div id="call-btn" style="display:none" onclick="startCall()" class="btn-icon">📞</div></div>
        <div id="messages"></div>
        <div class="input-panel">
            <textarea id="mi" placeholder="Сообщение..." rows="1"></textarea>
            <button onclick="send()" style="height: 40px;">➔</button>
        </div>
    </div>

    <div id="call-box">
        <h2 id="call-status">Звонок...</h2>
        <div id="call-btns" style="display:flex; gap:20px; margin-top:30px"></div>
        <audio id="remoteAudio" autoplay></audio>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const mi = document.getElementById('mi');

        // ЛОГИКА АВТОВХОДА
        window.addEventListener('load', () => {
            const saved = localStorage.getItem('messenger_auth');
            if (saved) {
                const data = JSON.parse(saved);
                socket.emit('auth', { type: 'login', user: data.user, pass: data.pass, isAuto: true });
            }
        });

        function logout() {
            localStorage.removeItem('messenger_auth');
            location.reload();
        }

        mi.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            this.style.overflowY = this.scrollHeight > 200 ? 'auto' : 'hidden';
        });

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        
        socket.on('auth_ok', d => { 
            me = d.user; 
            auth.style.display = 'none'; 
            // Сохраняем данные для автовхода (имя и хэшированный пароль из БД)
            localStorage.setItem('messenger_auth', JSON.stringify({ user: d.user, pass: d.pass }));
            selectChat(null); 
        });

        socket.on('err', t => {
            alert(t);
            localStorage.removeItem('messenger_auth'); // Удаляем если данные устарели
        });

        function selectChat(u) {
            target = u;
            document.querySelectorAll('.u-card').forEach(c => c.classList.remove('active'));
            if(window.event && window.event.currentTarget && window.event.currentTarget.classList) {
                window.event.currentTarget.classList.add('active');
            }
            document.getElementById('chat-title').innerText = u || 'Общий чат';
            document.getElementById('call-btn').style.display = u ? 'block' : 'none';
            document.getElementById('messages').innerHTML = '';
            socket.emit('get_h', u);
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-card" onclick="selectChat(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { if(u !== me) list.innerHTML += \`<div class="u-card" onclick="selectChat('\${u}')">👤 \${u}</div>\`; });
        });

        function send() { 
            if(mi.value.trim()) { 
                socket.emit('msg', {text:mi.value, to:target}); 
                mi.value=''; mi.style.height = '40px';
            } 
        }

        socket.on('msg', m => {
            const isGeneral = !m.to && !target;
            const isMe = target && (m.from === target || (m.from === me && m.to === target));
            if(isGeneral || isMe) renderMsg(m);
        });

        socket.on('hist', h => h.forEach(renderMsg));
        function renderMsg(m) {
            const msgs = document.getElementById('messages');
            const div = document.createElement('div');
            div.className = 'msg ' + (m.from === me ? 'me' : 'them');
            div.innerHTML = \`<small style="display:block;opacity:0.5">\${m.from}</small>\${m.text}\`;
            msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
        }

        async function startCall() {
            document.getElementById('call-box').style.display='flex';
            document.getElementById('call-btns').innerHTML = '<button onclick="location.reload()" style="background:red">Отмена</button>';
            peer = new RTCPeerConnection(config);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
        }

        socket.on('in_call', async d => {
            document.getElementById('call-box').style.display='flex';
            document.getElementById('call-status').innerText = 'Звонит ' + d.from;
            const btns = document.getElementById('call-btns');
            btns.innerHTML = '<button id="acc" style="background:green">Принять</button><button onclick="location.reload()" style="background:red">Сброс</button>';
            document.getElementById('acc').onclick = async () => {
                peer = new RTCPeerConnection(config);
                const s = await navigator.mediaDevices.getUserMedia({audio:true});
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                peer.ontrack = e => { document.getElementById('remoteAudio').srcObject = e.streams[0]; };
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const ans = await peer.createAnswer(); await peer.setLocalDescription(ans);
                socket.emit('ans', {to:d.from, ans});
                btns.innerHTML = '<button onclick="location.reload()" style="background:red">Завершить</button>';
            };
        });
        socket.on('call_ok', d => peer.setRemoteDescription(new RTCSessionDescription(d.ans)));
        socket.on('ice', d => peer?.addIceCandidate(new RTCIceCandidate(d.cand)));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Messenger Restarted'); });