const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Инициализация базы данных
let db = { users: {}, messages: [] };
if (fs.existsSync(DB_FILE)) {
    try {
        const raw = fs.readFileSync(DB_FILE);
        db = JSON.parse(raw);
    } catch (e) {
        console.error("Ошибка БД, сброс:", e);
    }
}

function saveDB() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    } catch (e) {
        console.error("Критическая ошибка записи:", e);
    }
}

let onlineUsers = new Set();

app.get('/', (req, res) => {
    res.send(htmlContent);
});

io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('register', ({ user, pass }) => {
        if (!user || !pass) return socket.emit('err', 'Пустые поля!');
        if (db.users[user]) return socket.emit('err', 'Ник занят');
        db.users[user] = { password: bcrypt.hashSync(pass, 10) };
        saveDB();
        socket.emit('system', 'Регистрация успешна!');
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
        ).slice(-100); // Только последние 100
        socket.emit('history', history);
    });

    socket.on('chat message', (data) => {
        if (!currentUser || !data.text) return;
        const msg = {
            id: Math.random().toString(36).substr(2, 9),
            from: currentUser,
            to: data.to || null,
            text: data.text.substring(0, 500),
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>00 ULTRA</title>
    <style>
        body { background: #000; color: #00ffea; font-family: sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; }
        #auth { position: fixed; inset: 0; background: #000; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        #main { display: none; flex: 1; overflow: hidden; }
        #sidebar { width: 150px; border-right: 1px solid #222; overflow-y: auto; background: #050505; }
        #chat { flex: 1; display: flex; flex-direction: column; }
        #messages { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 5px; }
        .msg { background: #111; padding: 8px; border-radius: 5px; max-width: 80%; align-self: flex-start; cursor: pointer; }
        .msg.self { align-self: flex-end; background: #004444; }
        .user-btn { padding: 10px; border-bottom: 1px solid #222; cursor: pointer; font-size: 14px; }
        .user-btn.active { background: #ff003c; }
        input { padding: 10px; background: #000; border: 1px solid #00ffea; color: #fff; flex: 1; }
        button { padding: 10px; background: #ff003c; border: none; color: #fff; }
    </style>
</head>
<body>
    <div id="auth">
        <h2>00 LOGIN</h2>
        <input type="text" id="un" placeholder="Ник" style="margin-bottom:10px">
        <input type="password" id="pw" placeholder="Пароль" style="margin-bottom:10px">
        <div><button onclick="sendAuth('login')">ВХОД</button><button onclick="sendAuth('register')">РЕГ</button></div>
    </div>
    <div id="main">
        <div id="sidebar">
            <div class="user-btn active" id="g-btn" onclick="setChat(null)">ОБЩИЙ</div>
            <div id="u-list"></div>
            <button onclick="exit()" style="width:100%; margin-top:20px">ВЫХОД</button>
        </div>
        <div id="chat">
            <div id="messages"></div>
            <div style="display:flex; padding:10px"><input id="mi" placeholder="Сообщение..."><button onclick="sendMsg()">></button></div>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let me = "", target = null;
        function sendAuth(t) { socket.emit(t, { user: un.value, pass: pw.value }); }
        socket.on('login_success', d => {
            me = d.user; localStorage.setItem('00u', d.user); localStorage.setItem('00p', d.pass);
            auth.style.display = 'none'; main.style.display = 'flex'; setChat(null);
        });
        window.onload = () => {
            const u = localStorage.getItem('00u'), p = localStorage.getItem('00p');
            if(u && p) socket.emit('login', { user: u, pass: p, isAuto: true });
        };
        function exit() { localStorage.clear(); location.reload(); }
        function setChat(t) {
            target = t; document.querySelectorAll('.user-btn').forEach(b => b.classList.remove('active'));
            if(!t) g-btn.classList.add('active'); else document.getElementById('u-'+t)?.classList.add('active');
            messages.innerHTML = ""; socket.emit('get_history', t);
        }
        socket.on('update_users', d => {
            u-list.innerHTML = "";
            d.all.forEach(u => {
                if(u===me) return;
                const b = document.createElement('div'); b.className = 'user-btn'; b.id = 'u-'+u;
                b.innerHTML = (d.online.includes(u)?'● ':'') + u;
                b.onclick = () => setChat(u); u-list.appendChild(b);
            });
        });
        function sendMsg() { if(mi.value) { socket.emit('chat message', { text: mi.value, to: target }); mi.value = ''; } }
        socket.on('chat message', m => { if((!target && !m.to) || (target && (m.from===target || m.to===target))) addM(m); });
        socket.on('history', h => h.forEach(addM));
        socket.on('message_deleted', id => document.getElementById('m-'+id)?.remove());
        function addM(m) {
            const d = document.createElement('div'); d.className = 'msg' + (m.from===me?' self':''); d.id = 'm-'+m.id;
            d.innerHTML = '<small>'+m.from+'</small><br>'+m.text;
            if(m.from===me) d.onclick = () => confirm('Удалить?') && socket.emit('delete_message', m.id);
            messages.appendChild(d); messages.scrollTop = messages.scrollHeight;
        }
        socket.on('err', a => alert(a));
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => console.log('OK on ' + PORT));