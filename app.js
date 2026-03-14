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
        if (d.type === 'reg') {
            if (db.users[d.user]) return socket.emit('err', 'Логин занят');
            db.users[d.user] = { pass: bcrypt.hashSync(d.pass, 10) };
            save(); socket.emit('sys', 'Готово');
        } else {
            const u = db.users[d.user];
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
        const h = db.messages.filter(m => {
            if (!t) return !m.to; 
            return (m.to === t && m.from === curr) || (m.to === curr && m.from === t);
        }).slice(-50);
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

        .header { padding: 15px 25px; border-bottom: 1px solid var(--brd); background: rgba(30,30,30,0.8); display: flex; align-items: center; justify-content: space-between; }
        
        #messages { flex: 1; overflow-y: auto; padding: 25px; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
        
        .msg { padding: 12px 16px; border-radius: 8px; max-width: 65%; font-size: 14px; position: relative; animation: slideUp 0.2s ease; }
        .msg.me { align-self: flex-end; background: #005fb8; border-bottom-right-radius: 2px; }
        .msg.them { align-self: flex-start; background: #333; border-bottom-left-radius: 2px; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .input-panel { background: var(--win-side); border-top: 1px solid var(--brd); padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .controls { display: flex; align-items: center; gap: 15px; }
        
        textarea#mi { flex: 1; background: #2d2d2d; border: 1px solid #444; color: white; padding: 10px; border-radius: 6px; resize: none; outline: none; font-family: inherit; }
        
        .u-card { padding: 15px 20px; cursor: pointer; transition: 0.2s; border-bottom: 1px solid #2d2d2d; display: flex; align-items: center; justify-content: space-between; }
        .u-card:hover { background: #333; }
        .u-card.active { background: #3d3d3d; border-left: 4px solid var(--win-acc); }

        .btn-icon { cursor: pointer; font-size: 20px; transition: 0.2s; user-select: none; }
        .btn-icon:hover { color: var(--win-acc); transform: scale(1.1); }
        
        #resizer { height: 6px; background: #333; cursor: ns-resize; border-radius: 3px; margin-bottom: 5px; }
        #resizer:hover { background: var(--win-acc); }

        #call-box { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; flex-direction: column; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--win-dark); z-index:10000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#2b2b2b; padding:40px; border-radius:12px; border:1px solid var(--brd); width:320px; text-align:center;">
            <h2 style="margin-bottom:25px">00 Messenger</h2>
            <input id="un" placeholder="Имя пользователя" style="width:100%; padding:12px; background:#1a1a1a; border:1px solid #444; color:white; margin-bottom:10px; border-radius:6px;">
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:12px; background:#1a1a1a; border:1px solid #444; color:white; margin-bottom:20px; border-radius:6px;">
            <button onclick="authReq('login')" style="width:100%; padding:12px; background:var(--win-acc); border:none; border-radius:6px; font-weight:bold; cursor:pointer">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer; margin-top:15px">Нет аккаунта? Зарегистрироваться</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="header"><b>Чаты</b> <span onclick="logout()" class="btn-icon">🚪</span></div>
        <div id="u-list" style="flex:1; overflow-y:auto"></div>
    </div>

    <div id="chat-area">
        <div class="header">
            <b id="chat-title">Общий чат</b>
            <div id="call-btn" style="display:none" onclick="startCall()" class="btn-icon">📞</div>
        </div>
        
        <div id="messages"></div>

        <div class="input-panel" id="panel">
            <div id="resizer"></div>
            <div class="controls">
                <label class="btn-icon">📎<input type="file" style="display:none" onchange="up(this)"></label>
                <textarea id="mi" placeholder="Сообщение..." rows="1" onkeypress="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();send();}"></textarea>
                <span id="rb" class="btn-icon" onclick="tRec()">🎤</span>
                <span class="btn-icon" onclick="send()" style="color:var(--win-acc)">➔</span>
            </div>
        </div>
    </div>

    <div id="call-box">
        <h2 id="call-status">Вызов...</h2>
        <div style="display:flex; gap:40px; margin-top:30px">
            <button id="accept-btn" style="background:#2ecc71; border:none; width:80px; height:80px; border-radius:50%; cursor:pointer; display:none; font-size:30px">📞</button>
            <button onclick="location.reload()" style="background:#e74c3c; border:none; width:80px; height:80px; border-radius:50%; cursor:pointer; font-size:30px">📵</button>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, chunks=[], isRec=false;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        // Ресайзер высоты
        const resizer = document.getElementById('resizer');
        const panel = document.getElementById('panel');
        resizer.onmousedown = (e) => {
            document.onmousemove = (e) => {
                let h = window.innerHeight - e.clientY;
                if(h > 60 && h < 400) panel.style.height = h + 'px';
            };
            document.onmouseup = () => document.onmousemove = null;
        };

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

        function up(el) { 
            const f = el.files[0]; const r = new FileReader();
            r.onload = () => socket.emit('msg', {to:target, file:{name:f.name, data:r.result, type:f.type}});
            r.readAsDataURL(f);
        }

        socket.on('msg', m => {
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) renderMsg(m);
        });

        socket.on('hist', h => h.forEach(renderMsg));

        function renderMsg(m) {
            const msgs = document.getElementById('messages');
            const div = document.createElement('div');
            div.className = 'msg ' + (m.from === me ? 'me' : 'them');
            let html = \`<small style="display:block; margin-bottom:4px; opacity:0.6">\${m.from}</small>\`;
            
            if(m.isVoice) html += \`<audio src="\${m.file.data}" controls style="width:210px; height:40px"></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) html += \`<img src="\${m.file.data}" style="max-width:100%; border-radius:4px">\`;
                else html += \`<a href="\${m.file.data}" download style="color:#60cdff">📄 \${m.file.name}</a>\`;
            }
            if(m.text) html += \`<div>\${m.text}</div>\`;
            
            div.innerHTML = html; msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }

        async function tRec() {
            if(!isRec) {
                const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); chunks=[];
                rec.ondataavailable=e=>chunks.push(e.data); rec.onstop=()=>{
                    const r=new FileReader(); r.onload=()=>socket.emit('msg',{to:target, file:{data:r.result}, isVoice:true});
                    r.readAsDataURL(new Blob(chunks,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
                }; rec.start(); isRec=true; document.getElementById('rb').style.color='#ff4444';
            } else { rec.stop(); isRec=false; document.getElementById('rb').style.color=''; }
        }

        async function startCall() {
            document.getElementById('call-box').style.display='flex'; peer = new RTCPeerConnection(config);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
            peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            document.getElementById('call-box').style.display='flex';
            document.getElementById('call-status').innerText = 'Входящий от: ' + d.from;
            const btn = document.getElementById('accept-btn'); btn.style.display='block';
            btn.onclick = async () => {
                btn.style.display='none'; peer = new RTCPeerConnection(config);
                const s = await navigator.mediaDevices.getUserMedia({audio:true});
                s.getTracks().forEach(t => peer.addTrack(t, s));
                peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const ans = await peer.createAnswer(); await peer.setLocalDescription(ans);
                socket.emit('ans', {to:d.from, ans});
                peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
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
http.listen(PORT, '0.0.0.0', () => { console.log('🚀 Messenger Ultra Running'); });