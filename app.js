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
            save(); socket.emit('sys', 'Успешно');
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
            if (!t) return !m.to; // Общий чат
            return (m.to === t && m.from === curr) || (m.to === curr && m.from === t); // Личка
        }).slice(-60);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now()+Math.random(), from: curr, to: d.to || null, text: d.text || "", file: d.file || null, isVoice: d.isVoice || false };
        db.messages.push(m); save();
        
        if (!d.to) {
            io.emit('msg', m); // В общий всем
        } else {
            if (online[d.to]) io.to(online[d.to]).emit('msg', m); // Собеседнику
            socket.emit('msg', m); // Себе
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
    <title>Messenger 00 W11</title>
    <style>
        :root { --bg: #1c1c1c; --sidebar: #202020; --accent: #60cdff; --msg-me: #005fb8; }
        body { background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 300px; background: var(--sidebar); border-right: 1px solid #333; display: flex; flex-direction: column; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #1c1c1c; }
        .hdr { padding: 10px 20px; background: rgba(32,32,32,0.9); border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: space-between; min-height: 50px; }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .m { padding: 10px 14px; border-radius: 8px; max-width: 70%; position: relative; font-size: 14px; }
        .m.me { align-self: flex-end; background: var(--msg-me); }
        .m.them { align-self: flex-start; background: #333; }
        .del-btn { position: absolute; top: -5px; right: -5px; background: #ff4444; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; border: 1px solid white; }
        .in-box { padding: 10px 20px; background: var(--sidebar); border-top: 1px solid #333; display: flex; gap: 10px; align-items: center; transition: 0.2s; }
        input#mi { flex: 1; background: #2d2d2d; border: 1px solid #444; color: white; padding: 10px; border-radius: 6px; outline: none; }
        .u-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #2d2d2d; }
        .u-item:hover { background: #2d2d2d; }
        .icon { cursor: pointer; font-size: 18px; padding: 5px; border-radius: 5px; }
        .icon:hover { background: #444; }
        input[type="range"] { width: 100%; height: 4px; accent-color: var(--accent); cursor: pointer; }
        @media (max-width: 700px) {
            #sidebar { width: 100%; position: absolute; height: 100%; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; z-index: 10; }
            body.open #chat { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:#1c1c1c; z-index:1000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#2b2b2b; padding:30px; border-radius:10px; border:1px solid #444; text-align:center;">
            <h2>Вход</h2>
            <input id="un" placeholder="Логин" style="width:100%; padding:10px; margin-bottom:10px; background:#1c1c1c; border:1px solid #444; color:white;"><br>
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:20px; background:#1c1c1c; border:1px solid #444; color:white;"><br>
            <button onclick="authReq('login')" style="width:100%; padding:10px; background:var(--accent); border:none; border-radius:5px; font-weight:bold; cursor:pointer;">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer; margin-top:15px;">Создать аккаунт</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr"><b>Чаты</b> <span onclick="logout()" style="cursor:pointer; font-size:12px">Выход</span></div>
        <div id="u-list" style="overflow-y:auto; flex:1"></div>
    </div>

    <div id="chat">
        <div class="hdr">
            <span onclick="document.body.classList.remove('open')" class="icon">⬅</span>
            <b id="t-n">Общий чат</b>
            <span id="c-btn" style="display:none" class="icon" onclick="startCall()">📞</span>
        </div>
        <div id="msgs"></div>
        <div style="padding: 5px 20px; background: var(--sidebar);">
            <input type="range" min="50" max="300" value="70" oninput="document.querySelector('.in-box').style.height = this.value + 'px'">
        </div>
        <div class="in-box" style="height: 70px;">
            <label class="icon">📎<input type="file" style="display:none" onchange="up(this)"></label>
            <input id="mi" placeholder="Сообщение..." onkeypress="if(event.key==='Enter')send()">
            <span id="rb" class="icon" onclick="tRec()">🎤</span>
            <span class="icon" onclick="send()" style="color:var(--accent)">➔</span>
        </div>
    </div>

    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:2000; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="cs">Звонок...</h2>
        <div style="display:flex; gap:20px; margin-top:20px">
            <button id="ab" style="background:#2ecc71; border:none; width:60px; height:60px; border-radius:50%; cursor:pointer; display:none">📞</button>
            <button onclick="location.reload()" style="background:#e74c3c; border:none; width:60px; height:60px; border-radius:50%; cursor:pointer">📵</button>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, ch=[], isR=false;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        window.onload = () => {
            const u = localStorage.getItem('u'), p = localStorage.getItem('p');
            if(u && p) socket.emit('auth', {type:'login', user:u, pass:p, isAuto:true});
        };

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function set(u) {
            target = u; document.body.classList.add('open');
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
                div.innerHTML = \`👤 \${u} <small style="color:\${d.on.includes(u)?'#2ecc71':'#888'}">\${d.on.includes(u)?'●':'○'}</small>\`;
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
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m);
        });

        socket.on('del_ok', id => document.getElementById(id)?.remove());
        socket.on('hist', h => h.forEach(add));

        function add(m) {
            const div = document.createElement('div'); div.id = m.id;
            div.className = 'm ' + (m.from === me ? 'me' : 'them');
            let cont = \`<small style="opacity:0.5; font-size:10px">\${m.from}</small><br>\`;
            if(m.from === me) cont += \`<div class="del-btn" onclick="socket.emit('del','\${m.id}')">×</div>\`;
            if(m.isVoice) cont += \`<audio src="\${m.file.data}" controls style="width:200px"></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) cont += \`<img src="\${m.file.data}" style="max-width:100%; border-radius:5px; margin-top:5px">\`;
                else cont += \`<a href="\${m.file.data}" download style="color:var(--accent)">📄 \${m.file.name}</a>\`;
            }
            if(m.text) cont += \`<div>\${m.text}</div>\`;
            div.innerHTML = cont; msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
        }

        async function tRec() {
            if(!isR) {
                const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); ch=[];
                rec.ondataavailable=e=>ch.push(e.data); rec.onstop=()=>{
                    const r=new FileReader(); r.onload=()=>socket.emit('msg',{to:target, file:{data:r.result}, isVoice:true});
                    r.readAsDataURL(new Blob(ch,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
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
            c_ui.style.display='flex'; cs.innerText = 'Входящий: ' + d.from; ab.style.display='block';
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
http.listen(PORT, '0.0.0.0', () => { console.log('Messenger 00 Ready'); });