const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_FILE = './database.json';
let db = { users: {}, messages: [] };

// Загрузка базы данных
if (fs.existsSync(DB_FILE)) {
    try { 
        const data = fs.readFileSync(DB_FILE);
        db = JSON.parse(data); 
    } catch(e) { 
        console.log("Ошибка чтения БД, создаем новую"); 
    }
}

function saveDB() { 
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); 
    } catch(e) {
        console.error("Ошибка сохранения БД:", e);
    }
}

let onlineUsers = new Set();

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;

    // Регистрация
    socket.on('register', ({ user, pass }) => {
        if (!user || !pass) return socket.emit('err', 'Заполни все поля');
        if (db.users[user]) return socket.emit('err', 'Ник занят');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация ок! Входи.');
    });

    // Вход (обычный и автоматический)
    socket.on('login', ({ user, pass, isAuto }) => {
        const foundUser = db.users[user];
        if (foundUser && (isAuto ? pass === foundUser.password : bcrypt.compareSync(pass, foundUser.password))) {
            currentUser = user;
            socket.join(user);
            onlineUsers.add(user);
            
            // Отправляем обратно хэш пароля для localStorage, чтобы не светить чистый пароль
            socket.emit('login_success', { user, pass: foundUser.password });
            io.emit('update_users', { all: Object.keys(db.users), online: Array.from(onlineUsers) });
        } else {
            socket.emit('err', 'Ошибка входа');
        }
    });

    // Получение истории
    socket.on('get_history', (target) => {
        if (!currentUser) return;
        const history = db.messages.filter(m => 
            (!target && !m.to) || 
            (m.to === target && m.from === currentUser) || 
            (m.to === currentUser && m.from === target)
        );
        socket.emit('history', history);
    });

    // Отправка сообщения
    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msgData = { 
            from: currentUser, 
            to: data.to || null, 
            text: data.text, 
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        };
        db.messages.push(msgData);
        if (db.messages.length > 200) db.messages.shift(); // Ограничение истории
        saveDB();

        if (!data.to) {
            io.emit('chat message', msgData);
        } else {
            io.to(data.to).to(currentUser).emit('chat message', msgData);
        }
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            onlineUsers.delete(currentUser);
            io.emit('update_users', { all: Object.keys(db.users), online: Array.from(onlineUsers) });
        }
    });
});

// --- ВЕРСТКА И ИНТЕРФЕЙС ---
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>00 MESSENGER</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #f00, #0f0, #00f, #f00); background-size: 400%; animation: rgb 5s linear infinite; flex-shrink: 0; }
        @keyframes rgb { 0% { background-position: 0%; } 100% { background-position: 400%; } }

        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main-container { display: none; flex: 1; overflow: hidden; }
        
        #sidebar { width: 220px; background: #0a0a0a; border-right: 1px solid #1a1c24; display: flex; flex-direction: column; }
        .user-item { padding: 15px; cursor: pointer; border-bottom: 1px solid #1a1c24; font-size: 0.8em; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .user-item:hover { background: #111; }
        .user-item.active { background: #ff003c; color: #fff; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: #222; border: 1px solid #333; }
        .dot.online { background: #0f0; box-shadow: 0 0 8px #0f0; border-color: #fff; }

        #chat-area { flex: 1; display: flex; flex-direction: column; position: relative; }
        #chat-header { padding: 12px; background: #111; font-size: 0.8em; border-bottom: 1px solid #1a1c24; text-align: center; color: #ff003c; font-weight: bold; }
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .m { background: #111; padding: 10px; border-radius: 8px; max-width: 80%; align-self: flex-start; word-wrap: break-word; }
        .m.self { align-self: flex-end; background: #00ffea; color: #000; border-right: 4px solid #fff; }
        .m b { display: block; font-size: 0.7em; opacity: 0.7; margin-bottom: 4px; }
        
        .logout-btn { margin-top: auto; background: #111; color: #555; border: none; padding: 15px; cursor: pointer; font-size: 0.7em; border-top: 1px solid #1a1c24; }
        .logout-btn:hover { color: #ff003c; }

        .controls { padding: 15px; background: #0a0a0a; display: flex; gap: 10px; }
        input { background: #000; border: 1px solid #00ffea; color: #fff; padding: 12px; flex: 1; border-radius: 5px; outline: none; font-size: 16px; }
        button#sendBtn { background: #ff003c; border: none; color: #fff; padding: 0 20px; border-radius: 5px; cursor: pointer; font-weight: bold; }
        
        @media (max-width: 600px) { #sidebar { width: 80px; } .user-item span { display: none; } #sidebar { width: 60px; } }
    </style>
</head>
<body>
    <div class="rgb-line"></div>
    <div id="auth-screen">
        <h2 style="color:#ff003c; letter-spacing: 5px;">00 ACCESS</h2>
        <input type="text" id="u" placeholder="НИКНЕЙМ" style="width:240px; margin-bottom:10px; text-align:center;">
        <input type="password" id="p" placeholder="ПАРОЛЬ" style="width:240px; margin-bottom:20px; text-align:center;">
        <div style="display:flex; gap:10px;">
            <button onclick="auth('login')" style="padding:12px 30px; background:#ff003c; border:none; color:#fff; cursor:pointer; font-family:'Orbitron';">ВХОД</button>
            <button onclick="auth('register')" style="padding:12px 30px; background:#222; border:none; color:#fff; cursor:pointer; font-family:'Orbitron';">РЕГ</button>
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
                <input type="text" id="msgInput" placeholder="Введите сообщение...">
                <button id="sendBtn" onclick="send()">></button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "";
        let currentTarget = null;

        window.onload = () => {
            const savedUser = localStorage.getItem('00_user');
            const savedPass = localStorage.getItem('00_pass');
            if (savedUser && savedPass) {
                socket.emit('login', { user: savedUser, pass: savedPass, isAuto: true });
            }
        };

        function auth(type) {
            socket.emit(type, { user: u.value, pass: p.value });
        }

        socket.on('login_success', (data) => {
            myName = data.user;
            localStorage.setItem('00_user', data.user);
            localStorage.setItem('00_pass', data.pass);
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('main-container').style.display = 'flex';
            switchChat(null);
        });

        function logout() {
            localStorage.clear();
            location.reload();
        }

        function switchChat(target) {
            currentTarget = target;
            document.querySelectorAll('.user-item').forEach(el => el.classList.remove('active'));
            if (!target) {
                document.getElementById('btn-global').classList.add('active');
                document.getElementById('chat-header').innerText = '🌐 ГЛОБАЛЬНЫЙ КАНАЛ';
            } else {
                const el = document.getElementById('user-' + target);
                if(el) el.classList.add('active');
                document.getElementById('chat-header').innerText = '👤 ЛС: ' + target;
            }
            messages.innerHTML = "";
            socket.emit('get_history', target);
        }

        socket.on('update_users', (data) => {
            const list = document.getElementById('user-list');
            list.innerHTML = "";
            data.all.forEach(user => {
                if(user === myName) return;
                const isOnline = data.online.includes(user);
                const div = document.createElement('div');
                div.className = 'user-item' + (currentTarget === user ? ' active' : '');
                div.id = 'user-' + user;
                div.innerHTML = '<div class="dot ' + (isOnline ? 'online' : '') + '"></div> <span>' + user + '</span>';
                div.onclick = () => switchChat(user);
                list.appendChild(div);
            });
        });

        function send() {
            const text = msgInput.value;
            if(text.trim()) {
                socket.emit('chat message', { text, to: currentTarget });
                msgInput.value = '';
            }
        }

        msgInput.addEventListener("keypress", (e) => { if (e.key === "Enter") send(); });

        socket.on('chat message', (data) => {
            const isGlobalMatch = !currentTarget && !data.to;
            const isPrivateMatch = currentTarget && (data.from === currentTarget || data.to === currentTarget);
            if (isGlobalMatch || isPrivateMatch) renderMsg(data);
        });

        socket.on('history', (msgs) => {
            messages.innerHTML = "";
            msgs.forEach(renderMsg);
        });

        function renderMsg(data) {
            const div = document.createElement('div');
            div.className = 'm' + (data.from === myName ? ' self' : '');
            div.innerHTML = '<b>' + data.from + ' • ' + data.time + '</b>' + data.text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        }

        socket.on('err', m => alert(m));
        socket.on('system', m => alert(m));
    </script>
</body>
</html>
`;

// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log('00 ULTRA SERVER ACTIVE ON PORT ' + PORT);
});