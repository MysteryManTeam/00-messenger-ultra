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
            if (db.users[d.user]) return socket.emit('err', 'ЗАНЯТО');
            db.users[d.user] = { pass: bcrypt.hashSync(d.pass, 10) };
            save(); socket.emit('sys', 'ГОТОВО');
        } else {
            const u = db.users[d.user];
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(d.user); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'ОШИБКА');
        }
    });

    socket.on('get_h', (t) => {
        if (!curr) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===curr) || (m.to===curr && m.from===t)).slice(-100);
        socket.emit('hist', h);
    });

    socket.on('msg', (d) => {
        if (!curr) return;
        const m = { id: 'id'+Date.now()+Math.random(), from: curr, to: d.to || null, text: d.text || "", file: d.file || null, isVoice: d.isVoice || false };
        db.messages.push(m); save();
        if (!d.to) io.emit('msg', m); else { io.to(d.to).emit('msg', m); socket.emit('msg', m); }
    });

    socket.on('del', (id) => {
        const i = db.messages.findIndex(m => m.id === id && m.from === curr);
        if (i !== -1) { db.messages.splice(i, 1); save(); io.emit('del_ok', id); }
    });

    socket.on('call', d => io.to(d.to).emit('in_call', { from: curr, offer: d.offer }));
    socket.on('ans', d => io.to(d.to).emit('call_ok', { ans: d.ans }));
    socket.on('ice', d => io.to(d.to).emit('ice', { cand: d.cand }));

    socket.on('disconnect', () => { if(curr){ delete online[curr]; io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) }); } });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>00 ULTRA NEON</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        :root { --bg: #05000a; --panel: #120024; --neon: #bc00ff; --text: #e0b0ff; }
        body { background: var(--bg); color: var(--text); font-family: 'Press Start 2P', cursive; font-size: 10px; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 280px; background: var(--panel); border-right: 3px solid var(--neon); display: flex; flex-direction: column; z-index: 5; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #080014; }
        .hdr { padding: 15px; background: #1a0033; border-bottom: 3px solid var(--neon); display: flex; align-items: center; justify-content: space-between; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 15px; }
        .m { background: #1a0033; border: 2px solid var(--neon); padding: 12px; max-width: 80%; align-self: flex-start; position: relative; box-shadow: 4px 4px 0px #4a0080; }
        .m.me { align-self: flex-end; border-color: #00faff; box-shadow: 4px 4px 0px #005c84; }
        .in-box { padding: 15px; background: var(--panel); border-top: 3px solid var(--neon); display: flex; gap: 10px; align-items: center; }
        input#mi { flex: 1; background: #000; color: #00faff; border: 2px solid var(--neon); padding: 12px; font-family: 'Press Start 2P'; font-size: 10px; outline: none; }
        .btn-icon { cursor: pointer; font-size: 20px; text-shadow: 0 0 10px var(--neon); transition: 0.2s; }
        .btn-icon:hover { transform: scale(1.1); }
        .u-item { padding: 15px; border-bottom: 2px solid #1a0033; cursor: pointer; font-size: 8px; }
        .u-item:hover { background: #26004d; }
        .del-btn { position: absolute; top: -10px; right: -10px; background: #ff0055; color: #fff; width: 24px; height: 24px; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; }
        @media (max-width: 800px) {
            #sidebar { width: 100%; position: absolute; height: 100%; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); z-index: 20; }
            body.open #chat { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:100; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--panel); border:4px solid var(--neon); padding:30px; text-align:center;">
            <h2 style="color:#00faff;">00 ULTRA</h2>
            <input id="un" placeholder="ЛОГИН" style="width:200px; background:#000; color:#fff; border:2px solid var(--neon); padding:10px; margin-bottom:10px;"><br>
            <input id="pw" type="password" placeholder="ПАРОЛЬ" style="width:200px; background:#000; color:#fff; border:2px solid var(--neon); padding:10px; margin-bottom:15px;"><br>
            <button onclick="authReq('login')" style="padding:10px 20px; background:var(--neon); color:#fff; border:none; font-family:'Press Start 2P'; cursor:pointer;">ВХОД</button>
            <p onclick="authReq('reg')" style="font-size:7px; cursor:pointer; color:#888; margin-top:20px;">[ РЕГИСТРАЦИЯ ]</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr"><span>ЧАТЫ</span><div onclick="logout()" style="cursor:pointer; color:#ff0055; font-size:8px;">ВЫХОД</div></div>
        <div id="u-list"></div>
    </div>

    <div id="chat">
        <div class="hdr">
            <span onclick="document.body.classList.remove('open')" style="cursor:pointer;"> < </span> 
            <b id="t-n">ОБЩИЙ ЧАТ</b> 
            <span id="c-btn" style="display:none; margin-left:auto; cursor:pointer;" onclick="startCall()">📞</span>
        </div>
        <div id="msgs"></div>
        <div class="in-box">
            <label class="btn-icon">📎<input type="file" style="display:none" onchange="up(this)"></label>
            <input id="mi" placeholder="СООБЩЕНИЕ..." onkeypress="if(event.key==='Enter')send()">
            <span id="rb" class="btn-icon" onclick="tRec()">🎤</span>
            <span class="btn-icon" onclick="send()">➔</span>
        </div>
    </div>

    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:200; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="cs">ВЫЗОВ...</h2>
        <button id="ab" style="background:#00ff00; padding:20px; font-family:'Press Start 2P'; border:none; display:none;">ОТВЕТИТЬ</button>
        <button onclick="location.reload()" style="background:#ff0055; color:#fff; padding:20px; font-family:'Press Start 2P'; border:none; margin-top:20px;">СБРОС</button>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, ch=[], isR=false;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const notifySound = new Audio('https://actions.google.com/sounds/v1/foley/beeps_short_confirm.ogg');

        window.onload = () => {
            const savedU = localStorage.getItem('u'), savedP = localStorage.getItem('p');
            if(savedU && savedP) socket.emit('auth', {type:'login', user:savedU, pass:savedP, isAuto:true});
            if ("Notification" in window) Notification.requestPermission();
        }

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function set(u) { 
            target=u; document.body.classList.add('open'); 
            t_n.innerText=u||'ОБЩИЙ ЧАТ'; c_btn.style.display=u?'block':'none'; 
            msgs.innerHTML=''; socket.emit('get_h', u); 
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-item" onclick="set(null)">[ МИРОВОЙ ЧАТ ]</div>';
            d.all.forEach(u => { if(u!==me) { 
                let v=document.createElement('div'); v.className='u-item';
                v.innerHTML=(d.on.includes(u)?'> [ОНЛАЙН] ':'  ')+u; v.onclick=()=>set(u); list.appendChild(v); 
            }});
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }
        function up(el) { const f=el.files[0]; const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{name:f.name, data:r.result, type:f.type}}); r.readAsDataURL(f); }

        socket.on('msg', m => { 
            if (m.from !== me) { notifySound.play().catch(e=>{}); if (document.hidden) new Notification("Чат: "+m.from, {body:m.text||"Файл"}); }
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m); 
        });

        socket.on('hist', h => h.forEach(add));
        socket.on('del_ok', id => document.getElementById(id)?.remove());

        function add(m) {
            const v=document.createElement('div'); v.className='m '+(m.from===me?'me':''); v.id=m.id;
            let c = '<small style="color:#00faff; font-size:7px;">'+m.from+'</small><br>';
            if(m.from===me) c+='<div class="del-btn" onclick="socket.emit(\\'del\\',\\''+m.id+'\\')">X</div>';
            if(m.isVoice) c+='<audio src="'+m.file.data+'" controls style="width:180px; filter: invert(1);"></audio>';
            else if(m.file) { if(m.file.type.startsWith('image')) c+='<img src="'+m.file.data+'" style="max-width:100%; margin-top:5px; border:1px solid #bc00ff">'; else c+='<a href="'+m.file.data+'" download style="color:#00faff; font-size:7px;">ФАЙЛ</a>'; }
            if(m.text) c+='<div style="margin-top:5px">'+m.text+'</div>'; v.innerHTML=c; msgs.appendChild(v); msgs.scrollTop=msgs.scrollHeight;
        }

        async function tRec() {
            if(!isR) {
                const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); ch=[];
                rec.ondataavailable=e=>ch.push(e.data); rec.onstop=()=>{
                    const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{data:r.result}, isVoice:true});
                    r.readAsDataURL(new Blob(ch,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
                }; rec.start(); isR=true; rb.style.color='red';
            } else { rec.stop(); isR=false; rb.style.color=''; }
        }

        async function startCall() {
            c_ui.style.display='flex'; peer=new RTCPeerConnection(conf);
            const s=await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>peer.addTrack(t,s));
            peer.onicecandidate=e=>e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const o=await peer.createOffer(); await peer.setLocalDescription(o); socket.emit('call', {to:target, offer:o});
            peer.ontrack=e=>{ const a=new Audio(); a.srcObject=e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            c_ui.style.display='flex'; cs.innerText='ВХОДЯЩИЙ ОТ '+d.from; ab.style.display='block';
            ab.onclick=async()=>{
                ab.style.display='none'; peer=new RTCPeerConnection(conf);
                const s=await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>peer.addTrack(t,s));
                peer.onicecandidate=e=>e.candidate && socket.emit('ice', {to:d.from, cand:e.candidate});
                await peer.setRemoteDescription(new RTCSessionDescription(d.offer));
                const a=await peer.createAnswer(); await peer.setLocalDescription(a); socket.emit('ans', {to:d.from, ans:a});
                peer.ontrack=e=>{ const au=new Audio(); au.srcObject=e.streams[0]; au.play(); };
            };
        });
        socket.on('call_ok', d=>peer.setRemoteDescription(new RTCSessionDescription(d.ans)));
        socket.on('ice', d=>peer?.addIceCandidate(new RTCIceCandidate(d.cand)));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('SERVER READY'); });