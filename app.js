const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => { res.send(ui); });

io.on('connection', (socket) => {
    let myId = socket.id;
    let myRoom = null;
    let myName = "User-" + myId.slice(0, 4);

    socket.on('join', (roomName) => {
        if (myRoom) {
            socket.leave(myRoom);
            socket.to(myRoom).emit('user_left', myId);
        }
        myRoom = roomName;
        socket.join(myRoom);
        socket.to(myRoom).emit('user_joined', { id: myId, name: myName });
        const clients = io.sockets.adapter.rooms.get(myRoom);
        const others = clients ? Array.from(clients).filter(id => id !== myId) : [];
        socket.emit('room_users', others);
    });

    socket.on('offer', d => io.to(d.to).emit('offer', { from: myId, offer: d.offer }));
    socket.on('answer', d => io.to(d.to).emit('answer', { from: myId, answer: d.answer }));
    socket.on('ice', d => io.to(d.to).emit('ice', { from: myId, cand: d.cand }));

    socket.on('disconnect', () => {
        if (myRoom) socket.to(myRoom).emit('user_left', myId);
    });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Voice Rooms</title>
    <style>
        body { background: #1e1f22; color: #dbdee1; font-family: sans-serif; margin: 0; display: flex; height: 100vh; }
        #sidebar { width: 240px; background: #2b2d31; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        #content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #313338; }
        .room-btn { padding: 12px; background: #35373c; border-radius: 5px; cursor: pointer; transition: 0.2s; border: none; color: #b5bac1; text-align: left; font-size: 16px; }
        .room-btn:hover { background: #404249; color: white; }
        .room-btn.active { background: #505259; color: white; font-weight: bold; }
        #status { font-size: 24px; color: #80848e; }
        audio { display: none; }
    </style>
</head>
<body>
    <div id="sidebar">
        <h2 style="color:white; font-size:18px; margin-bottom:10px;">Голосовые каналы</h2>
        <button class="room-btn" onclick="joinRoom('🔊 Комната 1', this)">🔊 Комната 1</button>
        <button class="room-btn" onclick="joinRoom('🔊 Комната 2', this)">🔊 Комната 2</button>
        <button class="room-btn" onclick="joinRoom('🔊 Комната 3', this)">🔊 Комната 3</button>
    </div>
    <div id="content">
        <div id="status">Выберите комнату</div>
        <div id="remote-audios"></div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let localStream;
        let peers = {};
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        async function initMedia() {
            if (!localStream) {
                localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            }
        }

        async function joinRoom(name, btn) {
            try {
                await initMedia();
                document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('status').innerText = "Вы в: " + name;
                Object.values(peers).forEach(p => p.close());
                peers = {};
                document.getElementById('remote-audios').innerHTML = '';
                socket.emit('join', name);
            } catch(e) { alert("Нужен доступ к микрофону!"); }
        }

        socket.on('room_users', users => { users.forEach(userId => callUser(userId)); });

        async function callUser(userId) {
            const pc = createPC(userId);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('offer', { to: userId, offer });
        }

        socket.on('offer', async d => {
            const pc = createPC(d.from);
            await pc.setRemoteDescription(new RTCSessionDescription(d.offer));
            const ans = await pc.createAnswer();
            await pc.setLocalDescription(ans);
            socket.emit('answer', { to: d.from, answer: ans });
        });

        socket.on('answer', d => { peers[d.from].setRemoteDescription(new RTCSessionDescription(d.answer)); });
        socket.on('ice', d => { peers[d.from].addIceCandidate(new RTCIceCandidate(d.cand)); });

        socket.on('user_left', id => {
            if (peers[id]) {
                peers[id].close();
                delete peers[id];
                const aud = document.getElementById('aud_' + id);
                if (aud) aud.remove();
            }
        });

        function createPC(userId) {
            const pc = new RTCPeerConnection(config);
            peers[userId] = pc;
            localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
            pc.onicecandidate = e => { if (e.candidate) socket.emit('ice', { to: userId, cand: e.candidate }); };
            pc.ontrack = e => {
                let aud = document.getElementById('aud_' + userId);
                if (!aud) {
                    aud = document.createElement('audio');
                    aud.id = 'aud_' + userId;
                    aud.autoplay = true;
                    document.getElementById('remote-audios').appendChild(aud);
                }
                aud.srcObject = e.streams[0];
            };
            return pc;
        }
    </script>
</body>
</html>
`;

// ЭТО ВАЖНО ДЛЯ RAILWAY
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { 
    console.log('Server started on port ' + PORT); 
});