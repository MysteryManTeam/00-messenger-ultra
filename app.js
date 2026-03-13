const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_FILE = './database.json';

// Загрузка или создание базы данных
let db = { users: {}, messages: [] };
if (fs.existsSync(DB_FILE)) {
    db = JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB() {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

app.get('/', (req, res) => { res.send(htmlContent); });

io.on('connection', (socket) => {
    let currentUser = null;

    // Регистрация
    socket.on('register', ({ user, pass }) => {
        if (db.users[user]) return socket.emit('err', 'Ник занят');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация успешна! Войдите.');
        io.emit('update_users', Object.keys(db.users)); // Обновляем список у всех
    });

    // Вход
    socket.on('login', ({ user, pass }) => {
        if (db.users[user] && bcrypt.compareSync(pass, db.users[user].password)) {
            currentUser = user;
            socket.emit('login_success', user);
            socket.emit('history', db.messages);
            socket.emit('update_users', Object.keys(db.users));
        } else {
            socket.emit('err', 'Ошибка входа');
        }
    });

    // Сообщения
    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msgData = { 
            user: currentUser, 
            text: data.text, 
            file: data.file, 
            type: data.type, 
            time: new Date().toLocaleTimeString() 
        };
        db.messages.push(msgData);
        if (db.messages.length > 100) db.messages.shift();
        saveDB();
        io.emit('chat message', msgData);
    });
});

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>00 ULTRA DB</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000); background-size: 400%; animation: rgb-move 5s linear infinite; flex-shrink: 0; }
        @keyframes rgb-move { 0% { background-position: 0%; } 100% { background-position: 400%; } }

        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main-container { display: none; flex: 1; display: flex; overflow: hidden; }
        
        /* Список людей (Sidebar) */
        #sidebar { width: 200px; background: #0a0a0a; border-right: 1px solid #1a1c24; padding: 10px; overflow-y: auto; }
        .user-item { padding: 8px; margin-bottom: 5px; border-bottom: 1px solid #1a1c24; font-size: 0.8em; color: #ff003c; }

        /* Чат */
        #chat-area { flex: 1; display: flex; flex-direction: column; background: #050505; }
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .m { background: #111; padding: 10px; border-radius: 8px; border-left: 3px solid #ff003c; max-width: 90%; align-self: flex-start; }
        .m.self { align-self: flex-end; border-left: none; border-right: 3px solid #00ffea; background: #161616; }

        .controls { padding: 15px; background: #0a0a0a; display: flex; gap: 10px; }
        input, button { padding: 12px; border-radius: 5px; border: 1px solid #00ffea; background: #000; color: #fff; outline: none; }
        button { background: #ff003c; border: none; font-weight: bold; cursor: pointer; }
        
        img { max-width: 100%; border-radius: 5px; }
        @media (max-width: 600px) { #sidebar { width: 80px; font-size: 10px; } }
    </style>
</head>
<body>
    <div class="rgb-line"></div>

    <div id="auth-screen">
        <h2 style="color:#ff003c">00 CORE</h2>
        <input type="text" id="u" placeholder="Ник" style="width: 250px; margin-bottom: 10px;">
        <input type="password" id="p" placeholder="Пароль" style="width: 250px; margin-bottom: 15px;">
        <div>
            <button onclick="auth('login')">ВХОД</button>
            <button onclick="auth('register')" style="background:#444">РЕГ</button>
        </div>
    </div>

    <div id="main-container">
        <div id="sidebar">
            <div style="color:#fff; margin-bottom: 10px; font-size: 0.7em;">В СЕТИ:</div>
            <div id="user-list"></div>
        </div>
        <div id="chat-area">
            <div id="messages"></div>
            <div class="controls">
                <input type="text" id="msgInput" placeholder="Сообщение..." style="flex:1">
                <button onclick="sendText()">></button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "";

        function auth(type) {
            socket.emit(type, { user: u.value, pass: p.value });
        }

        socket.on('login_success', (name) => {
            myName = name;
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('main-container').style.display = 'flex';
        });

        socket.on('update_users', (users) => {
            const list = document.getElementById('user-list');
            list.innerHTML = "";
            users.forEach(user => {
                const div = document.createElement('div');
                div.className = 'user-item';
                div.innerText = '● ' + user;
                list.appendChild(div);
            });
        });

        function sendText() {
            const text = msgInput.value;
            if(text) {
                socket.emit('chat message', { text, type: 'text' });
                msgInput.value = '';
            }
        }

        socket.on('chat message', (data) => {
            const div = document.createElement('div');
            div.className = 'm' + (data.user === myName ? ' self' : '');
            div.innerHTML = '<b style="font-size:10px">' + data.user + '</b>' + data.text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        });

        socket.on('history', (msgs) => {
            messages.innerHTML = "";
            msgs.forEach(m => {
                const div = document.createElement('div');
                div.className = 'm' + (m.user === myName ? ' self' : '');
                div.innerHTML = '<b style="font-size:10px">' + m.user + '</b>' + m.text;
                messages.appendChild(div);
            });
            messages.scrollTop = messages.scrollHeight;
        });

        socket.on('err', m => alert(m));
        socket.on('system', m => alert(m));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Server running'));