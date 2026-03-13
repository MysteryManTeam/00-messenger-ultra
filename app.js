const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_FILE = './database.json';
let db = { users: {}, messages: [] };

if (fs.existsSync(DB_FILE)) {
    try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch(e) { console.log("Ошибка БД"); }
}

function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

let onlineUsers = new Set();

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('register', ({ user, pass }) => {
        if (!user || !pass || db.users[user]) return socket.emit('err', 'Ошибка регистрации');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация ок!');
    });

    socket.on('login', ({ user, pass, isAuto }) => {
        const foundUser = db.users[user];
        if (foundUser && (isAuto ? pass === foundUser.password : bcrypt.compareSync(pass, foundUser.password))) {
            currentUser = user;
            socket.join(user);
            onlineUsers.add(user);
            socket.emit('login_success', { user, pass: foundUser.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Array.from(onlineUsers) });
        } else {
            socket.emit('err', 'Ошибка входа');
        }
    });

    socket.on('get_history', (target) => {
        if (!currentUser) return;
        const history = db.messages.filter(m => 
            (!target && !m.to) || (m.to === target && m.from === currentUser) || (m.to === currentUser && m.from === target)
        );
        socket.emit('history', history);
    });

    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msgData = { 
            id: Math.random().toString(36).substr(2, 9), // Уникальный ID
            from: currentUser, 
            to: data.to || null, 
            text: data.text, 
            time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) 
        };
        db.messages.push(msgData);
        saveDB();
        if (!data.to) io.emit('chat message', msgData);
        else io.to(data.to).to(currentUser).emit('chat message', msgData);
    });

    // --- ФУНКЦИЯ УДАЛЕНИЯ ---
    socket.on('delete_message', (msgId) => {
        if (!currentUser) return;
        const index = db.messages.findIndex(m => m.id === msgId && m.from === currentUser);
        if (index !== -1) {
            db.messages.splice(index, 1);
            saveDB();
            io.emit('message_deleted', msgId); // Сообщаем всем, что сообщение удалено
        }
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            onlineUsers.delete(currentUser);
            io.emit('update_users', { all: Object.keys(db.users), online: Array.from(onlineUsers) });
        }
    });
});

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>00 ULTRA DELETE</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #f00, #0f0, #00f, #f00); background-size: 400%; animation: rgb 5s linear infinite; flex-shrink: 0; }
        @keyframes rgb { 0% { background-position: 0%; } 100% { background-position: 400%; } }
        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main-container { display: none; flex: 1; overflow: hidden; }
        #sidebar { width: 220px; background: #0a0a0a; border-right: 1px solid #1a1c24; display: flex; flex-direction: column; }
        .user-item { padding: 15px; cursor: pointer; border-bottom: 1px solid #1a1c24; font-size: 0.8em; display: flex; align-items: center; gap: 10px; }
        .user-item.active { background: #ff003c; color: #fff; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #222; }
        .dot.online { background: #0f0; box-shadow: 0 0 5px #0f0; }
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .m { background: #111; padding: 10px; border-radius: 8px; max-width: 80%; align-self: flex-start; position: relative; transition: 0.2s; }
        .m.self { align-self: flex-end; background: #00ffea; color: #000; cursor: pointer; }
        .m.self:hover::after { content: '🗑'; position: absolute; left: -25px; top: 50%; transform: translateY(-50%); font-size: 14px; }
        .m b { display: block; font-size: 0.7em; opacity: 0.7; }
        .controls { padding: 15px; background: #0a0a0a; display: flex; gap: 10px; }
        input { background: #000; border: 1px solid #00ffea; color: #fff; padding: 12px; flex: 1; outline: none; }
        button { background: #ff003c; border: none; color: #fff; padding: 0 20px; cursor: pointer; }
        @media (max-width: 600px) { #sidebar { width: 60px; } .user-item span { display: none; } }
    </style>
</head>
<body>
    <div class="rgb-line"></div>
    <div id="auth-screen">
        <h2 style="color:#ff003c">00 DELETE PRO</h2>
        <input type="text" id="u" placeholder="НИК" style="width:200px; margin-bottom:10px; padding:10px;">
        <input type="password" id="p" placeholder="ПАРОЛЬ" style="width:200px; margin-bottom:15px; padding:10px;">
        <div style="display:flex; gap:10px;">
            <button onclick="auth('login')">ВХОД</button>
            <button onclick="auth('register')" style="background:#222">РЕГ</button>
        </div>
    </div>
    <div id="main-container">
        <div id="sidebar">
            <div class="user-item active" id="btn-global" onclick="switchChat(null)">🌐 <span>ОБЩИЙ</span></div>
            <div id="user-list" style="flex:1; overflow-y:auto;"></div>
            <button onclick="logout()" style="background:#111; color:#555; padding:15px; border:none; font-size:10px;">ВЫХОД</button>
        </div>
        <div id="chat-area" style="flex:1; display:flex; flex-direction:column;">
            <div id="messages"></div>
            <div class="controls">
                <input type="text" id="msgInput" placeholder="Пиши...">
                <button onclick="send()">></button>
            </div>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "", currentTarget = null;

        window.onload = () => {
            const u = localStorage.getItem('00_user'), p = localStorage.getItem('00_pass');
            if (u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };

        function auth(type) { socket.emit(type, { user: u.value, pass: p.value }); }

        socket.on('login_success', (data) => {
            myName = data.user; localStorage.setItem('00_user', data.user); localStorage.setItem('00_pass', data.pass);
            document.getElementById('auth-screen').style.display = 'none'; document.getElementById('main-container').style.display = 'flex';
            switchChat(null);
        });

        function logout() { localStorage.clear(); location.reload(); }

        function switchChat(t) {
            currentTarget = t;
            document.querySelectorAll('.user-item').forEach(el => el.classList.remove('active'));
            if (!t) document.getElementById('btn-global').classList.add('active');
            else if(document.getElementById('user-'+t)) document.getElementById('user-'+t).classList.add('active');
            messages.innerHTML = ""; socket.emit('get_history', t);
        }

        socket.on('update_users', (data) => {
            const list = document.getElementById('user-list'); list.innerHTML = "";
            data.all.forEach(user => {
                if(user === myName) return;
                const div = document.createElement('div'); div.className = 'user-item'; div.id = 'user-'+user;
                div.innerHTML = '<div class="dot '+(data.online.includes(user)?'online':'')+'"></div> <span>'+user+'</span>';
                div.onclick = () => switchChat(user); list.appendChild(div);
            });
        });

        function send() {
            if(msgInput.value.trim()) { socket.emit('chat message', { text: msgInput.value, to: currentTarget }); msgInput.value = ''; }
        }

        // КЛИК ДЛЯ УДАЛЕНИЯ
        function deleteMsg(id) {
            if(confirm("Удалить сообщение для всех?")) socket.emit('delete_message', id);
        }

        socket.on('chat message', renderMsg);
        socket.on('history', (msgs) => { messages.innerHTML = ""; msgs.forEach(renderMsg); });
        
        socket.on('message_deleted', (id) => {
            const el = document.getElementById('msg-'+id);
            if(el) el.remove();
        });

        function renderMsg(data) {
            const isGlobal = !currentTarget && !data.to;
            const isPrivate = currentTarget && (data.from === currentTarget || data.to === currentTarget);
            if (!isGlobal && !isPrivate) return;

            const div = document.createElement('div');
            div.className = 'm' + (data.from === myName ? ' self' : '');
            div.id = 'msg-' + data.id;
            if(data.from === myName) div.onclick = () => deleteMsg(data.id);
            div.innerHTML = '<b>' + data.from + ' • ' + data.time + '</b>' + data.text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        }

        socket.on('err', m => alert(m));
    </script>
</body>
</html>