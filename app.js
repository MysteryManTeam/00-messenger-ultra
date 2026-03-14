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
            save(); socket.emit('sys', 'Регистрация завершена! Входите.');
        } else {
            const u = db.users[d.user];
            // Поддержка автовхода (передача уже хэшированного пароля) или обычного входа
            const isMatch = d.isAuto ? (d.pass === u?.pass) : (u && bcrypt.compareSync(d.pass, u.pass));
            if (u && isMatch) {
                curr = d.user; socket.join(d.user); online[curr] = socket.id;
                socket.emit('auth_ok', {user: curr, pass: u.pass});
                io.emit('upd_u', { all: Object.keys(db.users), on: Object.keys(online) });
            } else socket.emit('err', 'Ошибка доступа');
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
    <title>00 ULTRA</title>
    <style>
        :root { --bg: #0b0e14; --side: #171c26; --acc: #00aff0; }
        body { background: var(--bg); color: #fff; font-family: sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 300px; background: var(--side); border-right: 1px solid #222; display: flex; flex-direction: column; flex-shrink: 0; }
        #chat { flex: 1; display: flex; flex-direction: column; background: #000; position: relative; }
        @media (max-width: 800px) {
            #sidebar { width: 100%; position: absolute; height: 100%; z-index: 10; }
            #chat { width: 100%; position: absolute; height: 100%; transform: translateX(100%); transition: 0.3s; z-index: 20; }
            body.open #chat { transform: translateX(0); }
        }
        .hdr { padding: 15px; background: var(--side); border-bottom: 1px solid #222; display: flex; align-items: center; gap: 10px; }
        #msgs { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .m { background: #222b3a; padding: 12px; border-radius: 12px; max-width: 85%; align-self: flex-start; position: relative; word-break: break-word; }
        .m.me { align-self: flex-end; background: #005c84; }
        .del-btn { position: absolute; top: -5px; right: -5px; background: #ff3b30; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; border: 2px solid var(--bg); font-weight: bold; }
        .in-box { padding: 15px; background: var(--side); display: flex; gap: 10px; align-items: center; }
        input { flex: 1; background: #000; color: #fff; border: 1px solid #333; padding: 12px; border-radius: 10px; outline: none; }
        .btn { cursor: pointer; font-size: 22px; user-select: none; }
        .exit-btn { margin-left: auto; color: #ff3b30; font-size: 14px; cursor: pointer; border: 1px solid #ff3b30; padding: 4px 8px; border-radius: 5px; }
        .rec { color: red; animation: b 1s infinite; } @keyframes b { 50% { opacity: 0.5; } }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:100; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--side); padding:30px; border-radius:15px; text-align:center; width: 280px;">
            <h2 style="color:var(--acc)">00 ULTRA</h2>
            <input id="un" placeholder="Логин" style="width:100%; margin-bottom:10px;">
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; margin-bottom:10px;">
            <button onclick="authReq('login')" style="width:100%; padding:12px; background:var(--acc); color:#fff; border:none; border-radius:8px; font-weight:bold;">ВХОД</button>
            <p onclick="authReq('reg')" style="font-size:12px; cursor:pointer; color:#888; margin-top:15px;">Создать аккаунт</p>
        </div>
    </div>
    <div id="sidebar">
        <div class="hdr">
            <b>Чаты</b>
            <div class="exit-btn" onclick="logout()">ВЫХОД</div>
        </div>
        <div id="u-list" style="overflow-y:auto"></div>
    </div>
    <div id="chat">
        <div class="hdr">
            <span onclick="document.body.classList.remove('open')" class="btn">←</span> 
            <b id="t-n">Общий чат</b> 
            <span id="c-btn" style="display:none; margin-left:auto" onclick="startCall()" class="btn">📞</span>
        </div>
        <div id="msgs"></div>
        <div style="padding:5px; background:var(--side)"><input type="range" min="0" max="350" value="0" oninput="document.querySelector('.in-box').style.marginBottom=this.value+'px'"></div>
        <div class="in-box">
            <label class="btn">📎<input type="file" style="display:none" onchange="up(this)"></label>
            <input id="mi" placeholder="Сообщение..." onkeypress="if(event.key==='Enter')send()">
            <span id="rb" class="btn" onclick="tRec()">🎤</span>
            <span class="btn" onclick="send()">➤</span>
        </div>
    </div>
    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:200; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="cs">Вызов...</h2>
        <button id="ab" style="background:green; color:#fff; padding:20px; border-radius:50%; display:none; border:none; font-size:24px;">📞</button>
        <button onclick="location.reload()" style="background:red; color:#fff; padding:20px; border-radius:50%; margin-top:20px; border:none; font-size:24px;">📵</button>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, ch=[], isR=false;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        
        // Автовход
        window.onload = () => {
            const savedU = localStorage.getItem('u');
            const savedP = localStorage.getItem('p');
            if(savedU && savedP) socket.emit('auth', {type:'login', user:savedU, pass:savedP, isAuto:true});
        }

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { 
            me=d.user; 
            localStorage.setItem('u', d.user); 
            localStorage.setItem('p', d.pass); 
            auth.style.display='none'; 
        });

        socket.on('err', t => alert(t)); socket.on('sys', t => alert(t));
        
        function set(u) { 
            target=u; document.body.classList.add('open'); 
            t_n.innerText=u||'Общий'; c_btn.style.display=u?'block':'none'; 
            msgs.innerHTML=''; socket.emit('get_h', u); 
        }

        socket.on('upd_u', d => {
            u_list.innerHTML = '<div onclick="set(null)" style="padding:15px; cursor:pointer; border-bottom:1px solid #222;">🌍 Общий чат</div>';
            d.all.forEach(u => { if(u!==me) { let v=document.createElement('div'); v.style.cssText='padding:15px; cursor:pointer; border-bottom:1px solid #222;'; v.innerHTML=u+(d.on.includes(u)?' 🟢':''); v.onclick=()=>set(u); u_list.appendChild(v); } });
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }
        function up(el) { const f=el.files[0]; const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{name:f.name, data:r.result, type:f.type}}); r.readAsDataURL(f); }

        socket.on('msg', m => { if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m); });
        socket.on('hist', h => h.forEach(add));
        socket.on('del_ok', id => document.getElementById(id)?.remove());

        function add(m) {
            const v=document.createElement('div'); v.className='m '+(m.from===me?'me':''); v.id=m.id;
            let c = '<small style="opacity:0.5; font-size:10px;">'+m.from+'</small><br>';
            if(m.from===me) c+='<div class="del-btn" onclick="socket.emit(\\'del\\',\\''+m.id+'\\')">×</div>';
            if(m.isVoice) c+='<audio src="'+m.file.data+'" controls style="width:210px"></audio>';
            else if(m.file) { if(m.file.type.startsWith('image')) c+='<img src="'+m.file.data+'" style="max-width:100%; border-radius:8px; margin-top:5px;">'; else c+='<a href="'+m.file.data+'" download style="color:var(--acc); display:block; margin-top:5px;">📄 '+m.file.name+'</a>'; }
            if(m.text) c+='<div style="margin-top:4px">'+m.text+'</div>'; v.innerHTML=c; msgs.appendChild(v); msgs.scrollTop=msgs.scrollHeight;
        }

        async function tRec() {
            if(!isR) {
                try {
                    const s = await navigator.mediaDevices.getUserMedia({audio:true}); rec=new MediaRecorder(s); ch=[];
                    rec.ondataavailable=e=>ch.push(e.data); rec.onstop=()=>{
                        const r=new FileReader(); r.onload=()=>socket.emit('msg', {to:target, file:{data:r.result}, isVoice:true});
                        r.readAsDataURL(new Blob(ch,{type:'audio/ogg'})); s.getTracks().forEach(t=>t.stop());
                    }; rec.start(); isR=true; rb.classList.add('rec');
                } catch(e) { alert('Нет доступа к микрофону'); }
            } else { rec.stop(); isR=false; rb.classList.remove('rec'); }
        }

        async function startCall() {
            c_ui.style.display='flex'; peer=new RTCPeerConnection(conf);
            const s=await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>peer.addTrack(t,s));
            peer.onicecandidate=e=>e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const o=await peer.createOffer(); await peer.setLocalDescription(o); socket.emit('call', {to:target, offer:o});
            peer.ontrack=e=>{ const a=new Audio(); a.srcObject=e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            c_ui.style.display='flex'; cs.innerText='Входящий звонок: '+d.from; ab.style.display='block';
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
http.listen(PORT, '0.0.0.0', () => { console.log('00 ULTRA ONLINE'); });