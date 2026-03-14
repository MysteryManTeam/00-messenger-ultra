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
            if (db.users[d.user]) return socket.emit('err', 'Этот логин уже занят');
            db.users[d.user] = { pass: bcrypt.hashSync(d.pass, 10) };
            save(); socket.emit('sys', 'Аккаунт создан');
        } else {
            const u = db.users[d.user];
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(d.user); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'Неверный логин или пароль');
        }
    });

    socket.on('get_h', (t) => {
        if (!curr) return;
        // Фильтрация: или общие (to: null), или личные между curr и t
        const h = db.messages.filter(m => {
            if (!t) return !m.to; 
            return (m.to === t && m.from === curr) || (m.to === curr && m.from === t);
        }).slice(-100);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now()+Math.random(), from: curr, to: d.to || null, text: d.text || "", file: d.file || null, isVoice: d.isVoice || false };
        db.messages.push(m); save();
        if (!d.to) io.emit('msg', m); 
        else { 
            if (online[d.to]) io.to(online[d.to]).emit('msg', m);
            socket.emit('msg', m); 
        }
    });

    socket.on('del', (id) => {
        const i = db.messages.findIndex(m => m.id === id && m.from === curr);
        if (i !== -1) { db.messages.splice(i, 1); save(); io.emit('del_ok', id); }
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
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>Messenger W11</title>
    <style>
        :root { --bg: #1c1c1c; --sidebar: #202020; --item-hover: #2d2d2d; --accent: #60cdff; --text: #ffffff; --msg-me: #005fb8; --msg-them: #2d2d2d; }
        body { background: var(--bg); color: var(--text); font-family: 'Segoe UI Variable Text', 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        
        #sidebar { width: 320px; background: var(--sidebar); border-right: 1px solid #333; display: flex; flex-direction: column; transition: 0.3s; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #1c1c1c; position: relative; }

        .hdr { padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; height: 50px; border-bottom: 1px solid #333; background: rgba(32,32,32,0.8); backdrop-filter: blur(10px); }
        .hdr b { font-size: 14px; font-weight: 500; }

        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 8px; }
        
        .m { padding: 10px 14px; border-radius: 8px; max-width: 75%; position: relative; font-size: 14px; line-height: 1.5; animation: fadeIn 0.2s ease; }
        .m.me { align-self: flex-end; background: var(--msg-me); border-bottom-right-radius: 2px; }
        .m.them { align-self: flex-start; background: var(--msg-them); border-bottom-left-radius: 2px; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        .del-btn { opacity: 0; position: absolute; top: -8px; right: -8px; background: #ff4444; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; transition: 0.2s; border: 2px solid var(--bg); }
        .m:hover .del-btn { opacity: 1; }

        .in-box { padding: 16px 20px; background: var(--sidebar); display: flex; gap: 12px; align-items: center; border-top: 1px solid #333; }
        input#mi { flex: 1; background: #2d2d2d; border: 1px solid #3d3d3d; border-bottom: 2px solid var(--accent); color: white; padding: 10px 16px; border-radius: 4px; outline: none; font-size: 14px; }
        
        .u-item { padding: 12px 16px; margin: 4px 8px; border-radius: 6px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 12px; }
        .u-item:hover { background: var(--item-hover); }
        .u-item.active { background: #333; border-left: 3px solid var(--accent); }
        
        .icon-btn { cursor: pointer; padding: 8px; border-radius: 4px; transition: 0.2s; display: flex; align-items: center; }
        .icon-btn:hover { background: #333; }
        
        #auth { position: fixed; inset: 0; background: #1c1c1c; z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .auth-card { background: #2b2b2b; padding: 32px; border-radius: 12px; border: 1px solid #3d3d3d; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 300px; text-align: center; }
        .auth-card input { width: 100%; padding: 10px; margin-bottom: 12px; background: #1c1c1c; border: 1px solid #3d3d3d; color: white; border-radius: 4px; box-sizing: border-box; }
        .auth-card button { width: 100%; padding: 10px; background: var(--accent); border: none; border-radius: 4px; font-weight: 600; cursor: pointer; color: #000; }

        @media (max-width: 700px) {
            #sidebar { width: 100%; }
            #chat { position: fixed; inset: 0; transform: translateX(100%); transition: 0.3s cubic-bezier(0.1, 0.9, 0.2, 1); }
            body.chat-open #chat { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div id="auth">
        <div class="auth-card">
            <h2 style="margin-top:0">Вход</h2>
            <input id="un" placeholder="Имя пользователя">
            <input id="pw" type="password" placeholder="Пароль">
            <button onclick="authReq('login')">Войти</button>
            <p style="font-size:12px; color:#aaa; cursor:pointer" onclick="authReq('reg')">Нет аккаунта? Создать</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr"><b>Чаты</b> <span class="icon-btn" onclick="logout()">🚪</span></div>
        <div id="u-list" style="overflow-y:auto; flex:1"></div>
    </div>

    <div id="chat">
        <div class="hdr">
            <span class="icon-btn" onclick="document.body.classList.remove('chat-open')">⬅</span>
            <b id="t-n">Выберите чат</b>
            <span id="c-btn" style="display:none" class="icon-btn" onclick="startCall()">📞</span>
        </div>
        <div id="msgs"></div>
        <div class="in-box">
            <label class="icon-btn">📎<input type="file" style="display:none" onchange="up(this)"></label>
            <input id="mi" placeholder="Введите сообщение..." onkeypress="if(event.key==='Enter')send()">
            <span id="rb" class="icon-btn" onclick="tRec()">🎤</span>
            <span class="icon-btn" onclick="send()" style="color:var(--accent)">▶</span>
        </div>
    </div>

    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:2000; flex-direction:column; align-items:center; justify-content:center;">
        <div style="text-align:center">
            <div style="width:80px; height:80px; background:#444; border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:30px">👤</div>
            <h2 id="cs">Звонок...</h2>
            <div style="display:flex; gap:20px; margin-top:30px">
                <button id="ab" style="background:#2ecc71; border:none; width:60px; height:60px; border-radius:50%; cursor:pointer; display:none">📞</button>
                <button onclick="location.reload()" style="background:#e74c3c; border:none; width:60px; height:60px; border-radius:50%; cursor:pointer">📵</button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, chunks=[], isR=false;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        window.onload = () => {
            const u = localStorage.getItem('u'), p = localStorage.getItem('p');
            if(u && p) socket.emit('auth', {type:'login', user:u, pass:p, isAuto:true});
            if ("Notification" in window) Notification.requestPermission();
        };

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function set(u) {
            target = u; document.body.classList.add('chat-open');
            t_n.innerText = u || 'Общий чат';
            c_btn.style.display = u ? 'block' : 'none';
            msgs.innerHTML = '';
            socket.emit('get_h', u);
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-item" onclick="set(null)">🌐 Общий чат</div>';
            d.all.forEach(u => { if(u !== me) {
                let div = document.createElement('div'); div.className = 'u-item';
                div.innerHTML = \`<span>👤</span> <div>\${u} <br><small style="color:\${d.on.includes(u)?'#2ecc71':'#888'}">\${d.on.includes(u)?'В сети':'Оффлайн'}</small></div>\`;
                div.onclick = () => set(u); list.appendChild(div);
            }});
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }
        function up(el) { 
            const f = el.files[0]; const reader = new FileReader();
            reader.onload = () => socket.emit('msg', {to:target, file:{name:f.name, data:reader.result, type:f.type}});
            reader.readAsDataURL(f);
        }

        socket.on('msg', m => {
            if(m.from !== me && document.hidden) new Notification("Чат: " + m.from, {body: m.text});
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m);
        });

        socket.on('del_ok', id => document.getElementById(id)?.remove());
        socket.on('hist', h => h.forEach(add));

        function add(m) {
            const div = document.createElement('div'); div.id = m.id;
            div.className = 'm ' + (m.from === me ? 'me' : 'them');
            let content = \`<small style="opacity:0.6; font-size:10px">\${m.from}</small><br>\`;
            if(m.from === me) content += \`<div class="del-btn" onclick="socket.emit('del','\${m.id}')">×</div>\`;
            if(m.isVoice) content += \`<audio src="\${m.file.data}" controls style="width:200px"></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) content += \`<img src="\${m.file.data}" style="max-width:100%; border-radius:4px; margin-top:5px">\`;
                else content += \`<a href="\${m.file.data}" download style="color:var(--accent)">📄 \${m.file.name}</a>\`;
            }
            if(m.text) content += \`<div>\${m.text}</div>\`;
            div.innerHTML = content; msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
        }

        async function tRec() {
            if(!isR) {
                const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); chunks=[];
                rec.ondataavailable=e=>chunks.push(e.data); rec.onstop=()=>{
                    const r=new FileReader(); r.onload=()=>socket.emit('msg',{to:target, file:{data:r.result}, isVoice:true});
                    r.readAsDataURL(new Blob(chunks,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
                }; rec.start(); isR=true; rb.style.color='#ff4444';
            } else { rec.stop(); isR=false; rb.style.color=''; }
        }

        async function startCall() {
            c_ui.style.display='flex'; peer = new RTCPeerConnection(config);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
            peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            c_ui.style.display='flex'; cs.innerText = 'Входящий звонок: ' + d.from; ab.style.display='block';
            ab.onclick = async () => {
                ab.style.display='none'; peer = new RTCPeerConnection(config);
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
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Windows 11 Messenger Running'); });