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
            save(); socket.emit('sys', 'Аккаунт создан');
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
        });
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
    <title>00 Ultra W11</title>
    <style>
        :root { --bg: #1a1a1a; --side: #202020; --acc: #60cdff; --brd: #333; }
        body { background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; }
        #sidebar { width: 300px; background: var(--side); border-right: 1px solid var(--brd); display: flex; flex-direction: column; }
        #chat { flex: 1; display: flex; flex-direction: column; }
        .hdr { padding: 15px 20px; border-bottom: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; background: rgba(32,32,32,0.5); }
        #msgs { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .m { padding: 10px 15px; border-radius: 8px; max-width: 70%; font-size: 14px; line-height: 1.4; }
        .m.me { align-self: flex-end; background: #005fb8; }
        .m.them { align-self: flex-start; background: #333; }
        .in-area { background: var(--side); border-top: 1px solid var(--brd); padding: 10px 20px; }
        .in-row { display: flex; align-items: center; gap: 12px; height: 100%; }
        input#mi { flex: 1; background: #2d2d2d; border: 1px solid #444; color: white; padding: 10px; border-radius: 5px; outline: none; }
        .u-item { padding: 12px 20px; cursor: pointer; border-bottom: 1px solid #2d2d2d; transition: 0.2s; }
        .u-item:hover { background: #2d2d2d; }
        .btn { cursor: pointer; font-size: 18px; opacity: 0.8; }
        .btn:hover { opacity: 1; color: var(--acc); }
        input[type="range"] { width: 100%; accent-color: var(--acc); margin-bottom: 10px; cursor: pointer; }
    </style>
</head>
<body>
    <div id="auth" style="position:fixed; inset:0; background:var(--bg); z-index:1000; display:flex; align-items:center; justify-content:center;">
        <div style="background:#2b2b2b; padding:40px; border-radius:12px; border:1px solid var(--brd); text-align:center; width:300px;">
            <h2 style="margin-top:0">00 ULTRA</h2>
            <input id="un" placeholder="Логин" style="width:100%; padding:10px; margin-bottom:10px; background:#1c1c1c; border:1px solid #444; color:white; border-radius:4px;">
            <input id="pw" type="password" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:20px; background:#1c1c1c; border:1px solid #444; color:white; border-radius:4px;">
            <button onclick="authReq('login')" style="width:100%; padding:10px; background:var(--acc); border:none; border-radius:4px; font-weight:bold; cursor:pointer; color:#000;">Войти</button>
            <p onclick="authReq('reg')" style="font-size:12px; color:#888; cursor:pointer; margin-top:15px;">Создать новый аккаунт</p>
        </div>
    </div>

    <div id="sidebar">
        <div class="hdr"><b>Мессенджер</b> <span onclick="logout()" style="cursor:pointer; font-size:12px; color:#ff4444;">Выход</span></div>
        <div id="u-list" style="flex:1; overflow-y:auto;"></div>
    </div>

    <div id="chat">
        <div class="hdr">
            <b id="t-n">Общий чат</b>
            <div id="c-btn" style="display:none;" class="btn" onclick="startCall()">📞 Позвонить</div>
        </div>
        <div id="msgs"></div>
        <div class="in-area" id="in-box" style="height: 80px;">
            <input type="range" min="60" max="250" value="80" oninput="document.getElementById('in-box').style.height = this.value + 'px'">
            <div class="in-row">
                <label class="btn">📎<input type="file" style="display:none" onchange="up(this)"></label>
                <input id="mi" placeholder="Напишите что-нибудь..." onkeypress="if(event.key==='Enter')send()">
                <span id="rb" class="btn" onclick="tRec()">🎤</span>
                <span class="btn" onclick="send()" style="color:var(--acc); font-size:24px;">➔</span>
            </div>
        </div>
    </div>

    <div id="c-ui" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:2000; flex-direction:column; align-items:center; justify-content:center;">
        <h2 id="cs">Вызов...</h2>
        <div style="display:flex; gap:30px; margin-top:20px">
            <button id="ab" style="background:#2ecc71; border:none; width:70px; height:70px; border-radius:50%; cursor:pointer; display:none; font-size:25px;">📞</button>
            <button onclick="location.reload()" style="background:#e74c3c; border:none; width:70px; height:70px; border-radius:50%; cursor:pointer; font-size:25px;">📵</button>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io(); let me='', target=null, peer, rec, ch=[], isR=false;
        const conf = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        function authReq(t) { socket.emit('auth', {type:t, user:un.value, pass:pw.value}); }
        function logout() { localStorage.clear(); location.reload(); }

        socket.on('auth_ok', d => { me=d.user; localStorage.setItem('u', d.user); localStorage.setItem('p', d.pass); auth.style.display='none'; });
        socket.on('err', t => alert(t));

        function set(u) {
            target = u; 
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
                div.innerHTML = \`👤 \${u} <span style="float:right; color:\${d.on.includes(u)?'#2ecc71':'#555'}">●</span>\`;
                div.onclick = () => set(u); list.appendChild(div);
            }});
        });

        function send() { if(mi.value) { socket.emit('msg', {text:mi.value, to:target}); mi.value=''; } }
        function up(el) { 
            const f = el.files[0]; const r = new FileReader();
            r.onload = () => socket.emit('msg', {to:target, file:{name:f.name, data:r.result, type:f.type}});
            r.readAsDataURL(f);
        }

        socket.on('msg', m => {
            if((!target && !m.to) || (target && (m.from===target || m.to===target || m.from===me))) add(m);
        });

        socket.on('hist', h => h.forEach(add));

        function add(m) {
            const div = document.createElement('div');
            div.className = 'm ' + (m.from === me ? 'me' : 'them');
            let c = \`<small style="opacity:0.6; font-size:11px">\${m.from}</small><br>\`;
            if(m.isVoice) c += \`<audio src="\${m.file.data}" controls style="width:200px; height:35px;"></audio>\`;
            else if(m.file) {
                if(m.file.type.startsWith('image')) c += \`<img src="\${m.file.data}" style="max-width:100%; border-radius:5px; margin-top:5px">\`;
                else c += \`<a href="\${m.file.data}" download style="color:var(--acc)">📄 \${m.file.name}</a>\`;
            }
            if(m.text) c += \`<div>\${m.text}</div>\`;
            div.innerHTML = c; msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
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
            c_ui.style.display='flex'; peer = new RTCPeerConnection(conf);
            const s = await navigator.mediaDevices.getUserMedia({audio:true});
            s.getTracks().forEach(t => peer.addTrack(t, s));
            peer.onicecandidate = e => e.candidate && socket.emit('ice', {to:target, cand:e.candidate});
            const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
            socket.emit('call', {to:target, offer});
            peer.ontrack = e => { const a = new Audio(); a.srcObject = e.streams[0]; a.play(); };
        }

        socket.on('in_call', async d => {
            c_ui.style.display='flex'; cs.innerText = 'Вам звонит: ' + d.from; ab.style.display='block';
            ab.onclick = async () => {
                ab.style.display='none'; peer = new RTCPeerConnection(conf);
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
http.listen(PORT, '0.0.0.0', () => { console.log('🚀 Server started on port ' + PORT); });