const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// --- 1. ИНТЕРФЕЙС (HTML + CSS + JS) ---
const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>00 MESSENGER ULTRA</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; }
        
        /* RGB Линия */
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000); background-size: 400%; animation: rgb-move 5s linear infinite; }
        @keyframes rgb-move { 0% { background-position: 0%; } 100% { background-position: 400%; } }

        #chat { flex: 1; overflow-y: auto; padding: 20px; scroll-behavior: smooth; border-bottom: 1px solid #1a1c24; }
        .msg { margin-bottom: 15px; padding: 10px; border-radius: 5px; background: #111; border-left: 3px solid #ff003c; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        #controls { padding: 20px; background: #0a0a0a; display: flex; gap: 10px; }
        input { background: #000; border: 1px solid #00ffea; color: #fff; padding: 12px; border-radius: 5px; outline: none; flex: 1; }
        button { background: #ff003c; color: #fff; border: none; padding: 0 25px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        button:hover { background: #00ffea; color: #000; box-shadow: 0 0 15px #00ffea; }
    </style>
</head>
<body>
    <div class="rgb-line"></div>
    <div id="chat"></div>
    <div id="controls">
        <input type="text" id="nick" placeholder="Ник" style="flex: 0.2;">
        <input type="text" id="msg" placeholder="Сообщение...">
        <button onclick="send()">ОТПРАВИТЬ</button>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const chat = document.getElementById('chat');

        function send() {
            const user = document.getElementById('nick').value || "Аноним";
            const text = document.getElementById('msg').value;
            if(text) {
                socket.emit('chat message', { user, text });
                document.getElementById('msg').value = '';
            }
        }

        socket.on('chat message', (data) => {
            const div = document.createElement('div');
            div.className = 'msg';
            div.innerHTML = '<b>' + data.user + ':</b> ' + data.text;
            chat.appendChild(div);
            chat.scrollTop = chat.scrollHeight;
        });
    </script>
</body>
</html>
`;

// --- 2. СЕРВЕРНАЯ ЛОГИКА ---
app.get('/', (req, res) => {
    res.send(htmlContent);
});

io.on('connection', (socket) => {
    console.log('Пользователь подключился');
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Сервер запущен на порту ' + PORT);
});