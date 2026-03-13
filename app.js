const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bcrypt = require('bcryptjs');

// Временная база данных в памяти (на Railway лучше подключить Redis/PostgreSQL для вечного хранения)
let users = {}; 
let messages = [];

app.get('/', (req, res) => {
    res.send(htmlContent);
});

// --- СЕРВЕРНАЯ ЛОГИКА ---
io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('register', ({ user, pass }) => {
        if (users[user]) return socket.emit('err', 'Ник занят');
        users[user] = bcrypt.hashSync(pass, 10);
        socket.emit('system', 'Регистрация успешна! Войдите.');
    });

    socket.on('login', ({ user, pass }) => {
        if (users[user] && bcrypt.compareSync(pass, users[user])) {
            currentUser = user;
            socket.emit('login_success', user);
            socket.emit('history', messages); // Отправляем старые сообщения
        } else {
            socket.emit('err', 'Неверный логин или пароль');
        }
    });

    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msgData = { 
            user: currentUser, 
            text: data.text, 
            file: data.file, // Здесь может быть фото, ГС или файл
            type: data.type, // 'text', 'image', 'audio', 'file'
            time: new Date().toLocaleTimeString() 
        };
        messages.push(msgData);
        if (messages.length > 100) messages.shift(); // Храним последние 100
        io.emit('chat message', msgData);
    });
});

// --- ИНТЕРФЕЙС (HTML) ---
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>00 ULTRA PRO</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; overflow: hidden; display: flex; flex-direction: column; height: 100vh; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000); background-size: 400%; animation: rgb-move 5s linear infinite; }
        @keyframes rgb-move { 0% { background-position: 0%; } 100% { background-position: 400%; } }
        
        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }
        #chat-screen { display: none; flex-direction: column; height: 100%; }
        
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .m { background: #111; padding: 10px; border-radius: 8px; border-left: 3px solid #ff003c; max-width: 80%; }
        .m b { color: #ff003c; font-size: 0.8em; display: block; }
        
        .controls { background: #0a0a0a; padding: 15px; display: flex; gap: 10px; flex-wrap: wrap; }
        input, button { padding: 12px; border-radius: 5px; border: 1px solid #00ffea; background: #000; color: #fff; outline: none; }
        button { background: #ff003c; border: none; cursor: pointer; font-weight: bold; }
        
        img { max-width: 100%; border-radius: 5px; margin-top: 5px; }
        audio { width: 100%; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="rgb-line"></div>

    <div id="auth-screen">
        <h2>00 ACCESS</h2>
        <input type="text" id="u" placeholder="Ник" style="margin-bottom: 10px; width: 250px;">
        <input type="password" id="p" placeholder="Пароль" style="margin-bottom: 10px; width: 250px;">
        <div>
            <button onclick="auth('login')">ВОЙТИ</button>
            <button onclick="auth('register')" style="background: #444;">РЕГ</button>
        </div>
    </div>

    <div id="chat-screen">
        <div id="messages"></div>
        <div class="controls">
            <input type="text" id="msgInput" placeholder="Сообщение..." style="flex: 1;">
            <input type="file" id="fileInput" style="display: none;" onchange="sendFile(this)">
            <button onclick="document.getElementById('fileInput').click()">📎</button>
            <button onclick="sendText()">></button>
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
            document.getElementById('chat-screen').style.display = 'flex';
        });

        socket.on('err', (m) => alert(m));
        socket.on('system', (m) => alert(m));

        function sendText() {
            const text = msgInput.value;
            if(text) {
                socket.emit('chat message', { text, type: 'text' });
                msgInput.value = '';
            }
        }

        function sendFile(input) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                let type = 'file';
                if(file.type.includes('image')) type = 'image';
                if(file.type.includes('audio')) type = 'audio';
                socket.emit('chat message', { text: file.name, file: reader.result, type: type });
            };
            reader.readAsDataURL(file);
        }

        socket.on('chat message', (data) => {
            const div = document.createElement('div');
            div.className = 'm';
            let content = '<span>' + data.text + '</span>';
            if(data.type === 'image') content = '<img src="' + data.file + '">';
            if(data.type === 'audio') content = '<audio controls src="' + data.file + '"></audio>';
            
            div.innerHTML = '<b>' + data.user + ' [' + data.time + ']</b>' + content;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        });

        socket.on('history', (msgs) => {
            msgs.forEach(m => socket.emit('chat message', m)); // Это упрощенно, лучше рендерить сразу
        });
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Server OK on port ' + PORT));