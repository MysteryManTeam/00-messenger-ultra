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
        if (db.users[user]) return socket.emit('err', 'Ник занят');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация ок! Входи.');
    });

    socket.on('login', ({ user, pass, isAuto }) => {
        const foundUser = db.users[user];
        if (foundUser && (isAuto || bcrypt.compareSync(pass, foundUser.password))) {
            currentUser = user;
            socket.join(user);
            onlineUsers.add(user);
            socket.emit('login_success', { user, pass: isAuto ? pass : foundUser.password });
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
        );
        socket.emit('history', history);
    });

    socket.on('chat message', (data) => {
        if (!currentUser) return;
        const msgData = { from: currentUser, to: data.to || null, text: data.text, time: new Date().toLocaleTimeString() };
        db.messages.push(msgData);
        saveDB();
        if (!data.to) io.emit('chat message', msgData);
        else io.to(data.to).to(currentUser).emit('chat message', msgData);
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
    <title>00 ULTRA PERMANENT</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body { background: #050505; color: #00ffea; font-family: 'Orbitron', sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .rgb-line { height: 4px; width: 100%; background: linear-gradient(90deg, #f00, #0f0, #00f, #f00); background-size: 400%; animation: rgb 5s linear infinite; flex-shrink: 0; }
        @keyframes rgb { 0% { background-position: 0%; } 100% { background-position: 400%; } }

        #auth-screen { position: fixed; inset: 0; background: #050505; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main-container { display: none; flex: 1; overflow: hidden; }
        
        #sidebar { width: 200px; background: #0a0a0a; border-right: 1px solid #1a1c24; display: flex; flex-direction: column; }
        .user-item { padding: 12px; cursor: pointer; border-bottom: 1px solid #1a1c24; font-size: 0.75em; display: flex; align-items: center; gap: 8px; }
        .user-item:hover { background: #111; }
        .user-item.active { background: #ff003c; color: #fff; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #333; }
        .dot.online { background: #0f0; box-shadow: 0 0 5px #0f0; }

        #chat-area { flex: 1; display: flex; flex-direction: column; }
        #messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 8px; }
        .m { background: #111; padding: 10px; border-radius: 8px; max-width: 85%; align-self: flex-start; }
        .m.self { align-self: flex-end; background: #00ffea; color: #000; }
        
        .logout-btn { margin-top: auto; background: #222; color: #ff003c; border: none; padding: 15px; cursor: pointer; font-weight: bold; border-top: 1px solid #1a1c24; }
        .logout-btn:hover { background: #ff003c; color: #fff; }

        .controls { padding: 10px; background: #0a0a0a; display: flex; gap: 8px; }
        input { background: #000; border: 1px solid #00ffea; color: #fff; padding: 10px; flex: 1; outline: none; }
        button#sendBtn { background: #ff003c; border: none; color: #fff; padding: 10px 20px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="rgb-line"></div>
    <div id="auth-screen">
        <h2 style="color:#ff003c">00 PERMANENT</h2>
        <input type="text" id="u" placeholder="Ник" style="width:220px; margin-bottom:10px; padding:10px;">
        <input type="password" id="p" placeholder="Пароль" style="width:220px; margin-bottom:15px; padding:10px;">
        <div>
            <button onclick="auth('login')" style="padding:10px 20px; background:#ff003c; border:none; color:#fff; cursor:pointer;">ВХОД</button>
            <button onclick="auth('register')" style="padding:10px 20px; background:#333; border:none; color:#fff; cursor:pointer;">РЕГ</button>
        </div>
    </div>

    <div id="main-container">
        <div id="sidebar">
            <div class="user-item active" id="btn-global" onclick="switchChat(null)">🌐 ОБЩИЙ ЧАТ</div>
            <div id="user-list" style="flex:1; overflow-y:auto;"></div>
            <button class="logout-btn" onclick="logout()">ВЫЙТИ ИЗ АККАУНТА</button>
        </div>
        <div id="chat-area">
            <div id="messages"></div>
            <div class="controls">
                <input type="text" id="msgInput" placeholder="Пиши тут...">
                <button id="sendBtn" onclick="send()">></button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let myName = "";
        let currentTarget = null;

        // --- ПРОВЕРКА ПАМЯТИ ПРИ ЗАГРУЗКЕ ---
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
            localStorage.removeItem('00_user');
            localStorage.removeItem('00_pass');
            location.reload();
        }

        function switchChat(target) {
            currentTarget = target;
            document.querySelectorAll('.user-item').forEach(el => el.classList.remove('active'));
            if (!target) document.getElementById('btn-global').classList.add('active');
            else if(document.getElementById('user-' + target)) document.getElementById('user-' + target).classList.add('active');
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
                div.innerHTML = '<div class="dot ' + (isOnline ? 'online' : '') + '"></div> 👤 ' + user;
                div.onclick = () => switchChat(user);
                list.appendChild(div);
            });
        });

        function send() {
            const text = msgInput.value;
            if(text) {
                socket.emit('chat message', { text, to: currentTarget });
                msgInput.value = '';
            }
        }

        socket.on('chat message', (data) => {
            if ((!currentTarget && !data.to) || (currentTarget && (data.from === currentTarget || data.to === currentTarget))) {
                renderMsg(data);
            }
        });

        socket.on('history', (msgs) => {
            messages.innerHTML = "";
            msgs.forEach(renderMsg);
        });

        function renderMsg(data) {
            const div = document.createElement('div');
            div.className = 'm' + (data.from === myName ? ' self' : '');
            div.innerHTML = '<b style="font-size:0.7em; display:block;">' + data.from + '</b>' + data.text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        }

        socket.on('err', m => alert(m));
        socket.on('system', m => alert(m));
    </script>
</body>
</html>