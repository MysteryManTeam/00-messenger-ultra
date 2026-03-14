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
            save(); socket.emit('sys', 'ГОТОВО К ВХОДУ');
        } else {
            const u = db.users[d.user];
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(d.user); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'ОТКАЗАНО');
        }
    });

    socket.on('get_h', (t) => {
        if (!curr) return;
        const h = db.messages.filter(m => (!t && !m.to) || (m.to===t && m.from===curr) || (m.to===curr && m.from===t)).slice(-60);
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
    <title>00 ULTRA NEON RU</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        :root { 
            --bg: #05000a; --panel: #120024; --neon: #bc00ff; 
            --neon-glow: 0 0 10px #bc00ff, 0 0 20px #700099; --text: #e0b0ff;
        }
        body { 
            background: var(--bg); color: var(--text); 
            font-family: 'Press Start 2P', cursive, sans-serif; font-size: 10px;
            margin: 0; display: flex; height: 100vh; overflow: hidden; 
        }
        #sidebar { width: 280px; background: var(--panel); border-right: 3px solid var(--neon); box-shadow: var(--neon-glow); z-index: 5; display: flex; flex-direction: column; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #080014; position: relative; }
        @media (max-width: 800px) {
            #sidebar { width: 100%; position: absolute; height: 100%; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s steps(5); z-index: 20; }
            body.open #chat { transform: translateX(0); }
        }
        .hdr { padding: 15px; background: #1a0033; border-bottom: 3px solid var(--neon); display: flex; align-items: center; justify-content: space-between; text-shadow: var(--neon-glow); }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 15px; }
        .m { background: #1a0033; border: 2px solid var(--neon); padding: 12px; max-width: 80%; align-self: flex-start; position: relative; box-shadow: 4px 4px 0px #4a0080; }
        .m.me { align-self: flex-end; border-color: #00faff; box-shadow: 4px 4px 0px #005c84; }
        .del-btn { position: absolute; top: -12px; right: -12px; background: #ff0055; color: #fff; width: 28px; height: 28px; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 2px 2px 0px #000; z-index: 10; font-size: 14px; }
        .in-box { padding: 15px; background: var(--panel); border-top: 3px solid var(--neon); display: flex; gap: 15px; align-items: center; }
        input { background: #000; color: #00faff; border: 2px solid var(--neon); padding: 10px; font-family: 'Press Start 2P'; font-size: 8px; outline: none; }
        .btn { cursor: pointer; text-shadow: var(--neon-glow); font-size: 10px; white-space: nowrap; }
        .exit-btn { color: #ff0055; cursor: pointer; border: 2px solid #ff0055; padding: 5px; font-size: 8px; }
        .u-item { padding: 15px; border-bottom: 2px solid #1a0033; cursor: pointer; font-size: 8px; }
        .u-item:hover { background: #26004d; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: var(--neon); }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:100; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--panel); border:4px solid var(--neon); padding:30px; text-align:center; box-shadow: var(--neon-glow);">
            <h2 style="color:#00faff; text-shadow: 0 0 10px #00faff; font-size:14px;">00 ULTRA</h2>
            <input id="un" placeholder="ЛОГИН" style="width:100%; margin-bottom:10px;"><br>
            <input id="pw" type="password" placeholder="ПАРОЛЬ" style="width:100%; margin-bottom:15px;"><br>
            <button onclick="authReq('login')" style="width:100%; padding:15px; background:var(--neon); color:#fff; border:none; font-family:'Press Start 2P'; cursor:pointer;">ВХОД</button>
            <p onclick="authReq('reg')" style="font-size:7px; cursor:pointer; color:#888; margin-top:20px;">[ РЕГИСТРАЦИЯ ]</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr">
            <span>ЧАТЫ</span>
            <div class="exit-btn" onclick="logout()">ВЫХОД</div>
        </div>
        <div id="u-list"></div>
    </div>

    <div id="chat">
        <div class="hdr">
            <span onclick="document.body.classList.remove('open')" class="btn"> < </span> 
            <b id="t-n">ОБЩИЙ</b> 
            <span id="c-btn" style="display:none; margin-left:auto" onclick="startCall()" class="btn">ЗВОНОК</span>
        </div>
        <div id="msgs"></div>
        <div style="padding:10px; background:var(--panel); border-top:1px solid #333;">
            <input type="range" min="0" max="300" value="0" style="width:100%" oninput="document.querySelector('.in-box').style.marginBottom=this.value+'px'">
        </div>
        <div class="in-box">
            <label class="btn">СКРЕПКА<input type="file" style="display:none" onchange="up(this)"></label>
            <input id="mi" placeholder="ТЕКСТ..." onkeypress="if(event.key==='Enter')send()">
            <span id="rb" class="btn" onclick="tRec()">МИК</span>
            <span class="btn" onclick="send()">ПОСЛАТЬ</span>
        </div>
    </div>

    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:200; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="cs" style="font-size:12px;">ВЫЗОВ...</h2>
        <button id="ab" style="background:#00ff00; color:#000; padding:20px; font-family:'Press Start 2P'; border:none; cursor:pointer; display:none;">ОТВЕТИТЬ</button>
        <button onclick="location.reload()" style="background:#ff0055; color:#fff; padding:20px; font-family:'Press Start 2P'; border:none; cursor:pointer; margin-top:20px;">СБРОС</button>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, ch=[], isR=false;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        
        // Звук уведомления (Пиксельный бип)
        const notifySound = new Audio('https://actions.google.com/sounds/v1/foley/beeps_short_confirm.ogg');

        window.onload = () => {
            const savedU = localStorage.getItem('u');
            const savedP = localStorage.getItem('p');
            if(savedU && savedP) socket.emit('auth', {type:'login', user:savedU, pass:savedP, isAuto:true});
            
            // Запрос разрешения на уведомления
            if ("Notification" in window) Notification.requestPermission();
        }

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { 
            me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; 
        });

        socket.on('err', t => alert(t)); socket.on('sys', t => alert(t));
        
        function set(u) { 
            target=u; document.body.classList.add('open'); 
            t_n.innerText=u||'ОБЩИЙ'; c_btn.style.display=u?'block':'none'; 
            msgs.innerHTML=''; socket.emit('get_h', u); 
        }

        socket.on('upd_u', d => {
            const list = document.getElementById('u-list');
            list.innerHTML = '<div class="u-item" onclick="set(null)">[ МИРОВОЙ_ЧАТ ]</div>';
            d.all.forEach(u => { 
                if(u!==me) { 
                    let v=document.createElement('div'); 
                    v.className='u-item'; 
                    v.innerHTML=(d.on.includes(u)?'> [ОНЛАЙН] ':'  ')+u; 
                    v.onclick=()=>set(u); 
                    list.appendChild(v); 
                } 
            });
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }
        function up(el) { const f=el.files[0]; const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{name:f.name, data:r.result, type:f.type}}); r.readAsDataURL(f); }

        socket.on('msg', m => { 
            // Обработка уведомления
            if (m.from !== me) {
                notifySound.play().catch(e => {});
                if (document.hidden && Notification.permission === "granted") {
                    new Notification("Новое сообщение от " + m.from, { body: m.text || "Файл или ГС" });
                }
            }
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m); 
        });

        socket.on('hist', h => h.forEach(add));
        socket.on('del_ok', id => document.getElementById(id)?.remove());

        function add(m) {
            const v=document.createElement('div'); v.className='m '+(m.from===me?'me':''); v.id=m.id;
            let c = '<small style="color:#00faff; font-size:7px;">'+m.from+'</small><br>';
            if(m.from===me) c+='<div class="del-btn" onclick="socket.emit(\\'del\\',\\''+m.id+'\\')">X</div>';
            if(m.isVoice) c+='<audio src="'+m.file.data+'" controls style="width:180px; filter: invert(1) hue-rotate(180deg);"></audio>';
            else if(m.file) { if(m.file.type.startsWith('image')) c+='<img src="'+m.file.data+'" style="max-width:100%; border:1px solid var(--neon); margin-top:5px;">'; else c+='<a href="'+m.file.data+'" download style="color:#00faff; display:block; font-size:7px; margin-top:5px;">ФАЙЛ: '+m.file.name+'</a>'; }
            if(m.text) c+='<div style="margin-top:8px; font-size:8px; line-height:1.4">'+m.text+'</div>'; v.innerHTML=c; msgs.appendChild(v); msgs.scrollTop=msgs.scrollHeight;
        }

        async function tRec() {
            if(!isR) {
                try {
                    const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); ch=[];
                    rec.ondataavailable=e=>ch.push(e.data); rec.onstop=()=>{
                        const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{data:r.result}, isVoice:true});
                        r.readAsDataURL(new Blob(ch,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
                    }; rec.start(); isR=true; rb.style.color='#ff0055'; rb.innerText='ЗАПИСЬ';
                } catch(e) { alert('ОШИБКА МИКРОФОНА'); }
            } else { rec.stop(); isR=false; rb.style.color=''; rb.innerText='МИК'; }
        }

        async function startCall() {
            c_ui.style.display='flex'; peer=new RTCPeerConnection(conf);
            const s=await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>peer.addTrack(t,s));
            peer.onicecandidate=e=>e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const o=await peer.createOffer(); await peer.setLocalDescription(o); socket.emit('call', {to:target, offer:o});
            peer.ontrack=e=>{ const a=new Audio(); a.srcObject=e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            notifySound.play().catch(e => {});
            c_ui.style.display='flex'; cs.innerText='ВХОДЯЩИЙ: '+d.from; ab.style.display='block';
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
http.listen(PORT, '0.0.0.0', () => { console.log('NEON ULTRA ONLINE WITH NOTIFICATIONS'); });