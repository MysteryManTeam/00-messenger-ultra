const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');
let db = { users: {}, messages: [] };

if (fs.existsSync(DB_FILE)) {
    try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch(e) { console.log("Ошибка БД"); }
}
// Код для вывода базы данных в логи
console.log("=== СПИСОК ВСЕХ АККАУНТОВ ===");
console.log(JSON.stringify(db.users, null, 2));
console.log("=============================");

function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

let onlineUsers = new Set();

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('register', ({ user, pass }) => {
        if (!user || !pass) return socket.emit('err', 'Заполни поля!');
        if (db.users[user]) return socket.emit('err', 'Ник занят');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация OK! Входи.');
    });

    socket.on('login', ({ user, pass, isAuto }) => {
        const found = db.users[user];
        if (found && (isAuto ? pass === found.password : bcrypt.compareSync(pass, found.password))) {
            currentUser = user;
            socket.join(user);
            onlineUsers.add(user);
            socket.emit('login_success', { user, pass: found.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Array.from(onlineUsers) });
        } else {
            socket.emit('err', 'Ошибка входа');
        }
    });

    socket.on('get_history', (target) => {
        if (!currentUser) return;
        const history = db.messages.filter(m => 
            (!target && !m.to) || 
            (m.to === target && m.from === currentUser) || 
            (m.to === currentUser && m.from === target)
        ).slice(-150);
        socket.emit('history', history);
    });

    socket.on('chat message', (data) => {
        if (!currentUser || !data.text.trim()) return;
        const msg = {
            id: Math.random().toString(36).substr(2, 9),
            from: currentUser,
            to: data.to || null,
            text: data.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        db.messages.push(msg);
        if (db.messages.length > 500) db.messages.shift();
        saveDB();
        if (!data.to) io.emit('chat message', msg);
        else io.to(data.to).to(currentUser).emit('chat message', msg);
    });

    socket.on('delete_message', (id) => {
        if (!currentUser) return;
        const idx = db.messages.findIndex(m => m.id === id && m.from === currentUser);
        if (idx !== -1) {
            db.messages.splice(idx, 1);
            saveDB();
            io.emit('message_deleted', id);
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
    <title>00 ULTRA CORE</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #f00, #0f0, #00f, #f00); background-size: 400%; animation: rgb 5s linear infinite; flex-shrink: 0; }
        @keyframes rgb { 0% { background-position: 0%; } 100% { background-position: 400%; } }

        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main-container { display: none; flex: 1; overflow: hidden; }
        
        #sidebar { width: 220px; background: #0a0a0a; border-right: 1px solid #1a1c24; display: flex; flex-direction: column; }
        .user-item { padding: 15px; cursor: pointer; border-bottom: 1px solid #1a1c24; font-size: 0.8em; display: flex; align-items: center; gap: 10px; }
        .user-item:hover { background: #111; }
        .user-item.active { background: #ff003c; color: #fff; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: #222; }
        .dot.online { background: #0f0; box-shadow: 0 0 8px #0f0; }

        #chat-area { flex: 1; display: flex; flex-direction: column; }
        #chat-header { padding: 12px; background: #111; font-size: 0.8em; border-bottom: 1px solid #1a1c24; text-align: center; color: #ff003c; font-weight: bold; }
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        
        .m { background: #111; padding: 10px; border-radius: 8px; max-width: 80%; align-self: flex-start; word-wrap: break-word; cursor: default; }
        .m.self { align-self: flex-end; background: #00ffea; color: #000; cursor: pointer; font-weight: bold; }
        .m b { display: block; font-size: 0.7em; opacity: 0.6; margin-bottom: 3px; }

        .controls { padding: 15px; background: #0a0a0a; display: flex; gap: 10px; border-top: 1px solid #1a1c24; }
        .controls input { background: #000; border: 1px solid #00ffea; color: #fff; padding: 12px; flex: 1; border-radius: 5px; outline: none; font-family: 'Orbitron'; }
        .controls button { background: #ff003c; border: none; color: #fff; padding: 0 25px; border-radius: 5px; cursor: pointer; font-weight: bold; font-family: 'Orbitron'; }
        
        .logout-btn { margin-top: auto; background: #000; color: #444; border: none; padding: 15px; cursor: pointer; font-size: 10px; border-top: 1px solid #1a1c24; font-family: 'Orbitron'; }
        .logout-btn:hover { color: #ff003c; }

        @media (max-width: 600px) { #sidebar { width: 70px; } .user-item span { display: none; } }
    </style>
</head>
<body>
    <div class="rgb-line"></div>
    
    <div id="auth-screen">
        <h2 style="color:#ff003c; letter-spacing: 5px;">00 ACCESS</h2>
        <input type="text" id="userInput" placeholder="НИК" style="width:220px; margin-bottom:10px; padding:12px; background:#000; border:1px solid #00ffea; color:#fff; text-align:center; font-family:'Orbitron';">
        <input type="password" id="passInput" placeholder="ПАРОЛЬ" style="width:220px; margin-bottom:20px; padding:12px; background:#000; border:1px solid #00ffea; color:#fff; text-align:center; font-family:'Orbitron';">
        <div style="display:flex; gap:10px;">
            <button onclick="handleAuth('login')" style="padding:12px 30px; background:#ff003c; border:none; color:#fff; cursor:pointer; font-family:'Orbitron';">ВХОД</button>
            <button onclick="handleAuth('register')" style="padding:12px 30px; background:#222; border:none; color:#fff; cursor:pointer; font-family:'Orbitron';">РЕГ</button>
        </div>
    </div>

    <div id="main-container">
        <div id="sidebar">
            <div class="user-item active" id="btn-global" onclick="switchChat(null)">
                <div class="dot online"></div> <span>ОБЩИЙ ЧАТ</span>
            </div>
            <div id="user-list" style="flex:1; overflow-y:auto;"></div>
            <button class="logout-btn" onclick="logout()">LOGOUT</button>
        </div>
        <div id="chat-area">
            <div id="chat-header">🌐 ГЛОБАЛЬНЫЙ КАНАЛ</div>
            <div id="messages"></div>
            <div class="controls">
                <input type="text" id="msgInput" placeholder="СООБЩЕНИЕ...">
                <button id="sendBtn" onclick="send()">></button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "", currentTarget = null;

        // Элементы
        const authScreen = document.getElementById('auth-screen');
        const mainContainer = document.getElementById('main-container');
        const msgInput = document.getElementById('msgInput');
        const userList = document.getElementById('user-list');
        const messagesDiv = document.getElementById('messages');
        const chatHeader = document.getElementById('chat-header');

        window.onload = () => {
            const u = localStorage.getItem('00_user'), p = localStorage.getItem('00_pass');
            if (u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };

        function handleAuth(type) {
            const user = document.getElementById('userInput').value;
            const pass = document.getElementById('passInput').value;
            socket.emit(type, { user, pass });
        }

        socket.on('login_success', (data) => {
            myName = data.user;
            localStorage.setItem('00_user', data.user);
            localStorage.setItem('00_pass', data.pass);
            authScreen.style.display = 'none';
            mainContainer.style.display = 'flex';
            switchChat(null);
        });

        function logout() { localStorage.clear(); location.reload(); }

        function switchChat(target) {
            currentTarget = target;
            document.querySelectorAll('.user-item').forEach(el => el.classList.remove('active'));
            if (!target) {
                document.getElementById('btn-global').classList.add('active');
                chatHeader.innerText = '🌐 ГЛОБАЛЬНЫЙ КАНАЛ';
            } else {
                const el = document.getElementById('user-' + target);
                if(el) el.classList.add('active');
                chatHeader.innerText = '👤 ЛС: ' + target;
            }
            messagesDiv.innerHTML = "";
            socket.emit('get_history', target);
        }

        socket.on('update_users', (data) => {
            userList.innerHTML = "";
            data.all.forEach(user => {
                if(user === myName) return;
                const div = document.createElement('div');
                div.className = 'user-item' + (currentTarget === user ? ' active' : '');
                div.id = 'user-' + user;
                div.innerHTML = '<div class="dot ' + (data.online.includes(user) ? 'online' : '') + '"></div> <span>' + user + '</span>';
                div.onclick = () => switchChat(user);
                userList.appendChild(div);
            });
        });

        function send() {
            if(msgInput.value.trim()) {
                socket.emit('chat message', { text: msgInput.value, to: currentTarget });
                msgInput.value = '';
            }
        }
        msgInput.onkeypress = (e) => { if(e.key==='Enter') send(); };

        socket.on('chat message', (data) => {
            const isGlobal = !currentTarget && !data.to;
            const isPrivate = currentTarget && (data.from === currentTarget || data.to === currentTarget);
            if (isGlobal || isPrivate) renderMsg(data);
        });

        socket.on('history', (msgs) => { 
            messagesDiv.innerHTML = ""; 
            msgs.forEach(renderMsg); 
        });

        socket.on('message_deleted', (id) => {
            const el = document.getElementById('msg-' + id);
            if(el) el.remove();
        });

        function renderMsg(data) {
            const div = document.createElement('div');
            div.className = 'm' + (data.from === myName ? ' self' : '');
            div.id = 'msg-' + data.id;
            if(data.from === myName) {
                div.onclick = () => { if(confirm("Удалить сообщение?")) socket.emit('delete_message', data.id); };
            }
            div.innerHTML = '<b>' + data.from + ' • ' + data.time + '</b>' + data.text;
            messagesDiv.appendChild(div);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        socket.on('err', m => alert(m));
        socket.on('system', m => alert(m));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log('00 ULTRA CORE ACTIVE ON PORT ' + PORT);
});
