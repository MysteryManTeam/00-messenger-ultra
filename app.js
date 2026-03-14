const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => { res.send(ui); });

io.on('connection', (socket) => {
    let myId = socket.id;
    let myRoom = null;

    socket.on('join', (roomName) => {
        if (myRoom) {
            socket.leave(myRoom);
            socket.to(myRoom).emit('user_left', myId);
        }
        myRoom = roomName;
        socket.join(myRoom);
        
        // Оповещаем комнату о входе
        socket.to(myRoom).emit('user_joined', myId);

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Voice Chat Pro</title>
    <style>
        body { background: #1e1f22; color: #dbdee1; font-family: sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        #sidebar { width: 200px; background: #2b2d31; padding: 15px; border-right: 1px solid #1e1f22; flex-shrink: 0; }
        #content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #313338; }
        .room-btn { padding: 12px; background: #35373c; border-radius: 5px; cursor: pointer; border: none; color: #b5bac1; text-align: left; width: 100%; margin-bottom: 8px; font-size: 14px; }
        .room-btn.active { background: #5865f2; color: white; }
        .user-blob { width: 90px; height: 90px; background: #23a559; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 10px; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(35, 165, 89, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(35, 165, 89, 0); } 100% { box-shadow: 0 0 0 0 rgba(35, 165, 89, 0); } }
        #status { font-size: 14px; color: #80848e; position: absolute; top: 10px; }
        #remote-audios { display: none; }
    </style>
</head>
<body>
    <div id="sidebar">
        <h2 style="color:white; font-size:14px; margin-bottom:15px;">КАНАЛЫ</h2>
        <button class="room-btn" onclick="joinRoom('Room 1', this)">🔊 Комната 1</button>
        <button class="room-btn" onclick="joinRoom('Room 2', this)">🔊 Комната 2</button>
        <button class="room-btn" onclick="joinRoom('Room 3', this)">🔊 Комната 3</button>
    </div>
    <div id="content">
        <div id="status">Ожидание выбора комнаты...</div>
        <div id="user-list" style="display:flex; flex-wrap:wrap; justify-content:center;"></div>
        <div id="remote-audios"></div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let localStream;
        let peers = {};
        const config = { 
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' }
            ],
            iceCandidatePoolSize: 10
        };

        async function joinRoom(name, btn) {
            try {
                log("Запрос доступа к микрофону...");
                if (!localStream) {
                    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                }
                
                document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                log("Вы вошли в: " + name);
                
                Object.values(peers).forEach(p => p.close());
                peers = {};
                document.getElementById('remote-audios').innerHTML = '';
                document.getElementById('user-list').innerHTML = '';

                socket.emit('join', name);
            } catch(e) { 
                log("ОШИБКА: Нет доступа к микрофону");
                alert("Разрешите микрофон в настройках браузера!"); 
            }
        }

        function log(msg) { document.getElementById('status').innerText = msg; }

        socket.on('room_users', users => {
            log("В комнате человек: " + users.length);
            // Небольшая задержка перед звонком для стабильности
            setTimeout(() => {
                users.forEach(id => callUser(id));
            }, 1000);
        });

        async function callUser(id) {
            const pc = createPC(id);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('offer', { to: id, offer });
        }

        socket.on('offer', async d => {
            const pc = createPC(d.from);
            await pc.setRemoteDescription(new RTCSessionDescription(d.offer));
            const ans = await pc.createAnswer();
            await pc.setLocalDescription(ans);
            socket.emit('answer', { to: d.from, answer: ans });
        });

        socket.on('answer', d => {
            if(peers[d.from]) peers[d.from].setRemoteDescription(new RTCSessionDescription(d.answer));
        });

        socket.on('ice', d => {
            if(peers[d.from]) peers[d.from].addIceCandidate(new RTCIceCandidate(d.cand)).catch(e => {});
        });

        socket.on('user_left', id => {
            if (peers[id]) {
                peers[id].close(); delete peers[id];
                document.getElementById('aud_'+id)?.remove();
                document.getElementById('blob_'+id)?.remove();
            }
        });

        function createPC(id) {
            const pc = new RTCPeerConnection(config);
            peers[id] = pc;

            localStream.getTracks().forEach(t => pc.addTrack(t, localStream));

            pc.onicecandidate = e => {
                if (e.candidate) socket.emit('ice', { to: id, cand: e.candidate });
            };
            
            pc.ontrack = e => {
                log("Соединение установлено!");
                let aud = document.getElementById('aud_' + id);
                if (!aud) {
                    aud = document.createElement('audio');
                    aud.id = 'aud_' + id;
                    aud.autoplay = true;
                    aud.setAttribute('playsinline', 'true');
                    document.getElementById('remote-audios').appendChild(aud);
                    
                    const blob = document.createElement('div');
                    blob.id = 'blob_' + id;
                    blob.className = 'user-blob';
                    blob.innerText = '👤';
                    document.getElementById('user-list').appendChild(blob);
                }
                aud.srcObject = e.streams[0];
            };

            return pc;
        }

        // Клик для фикса звука в Chrome/Safari
        window.onclick = () => {
            document.querySelectorAll('audio').forEach(a => a.play().catch(()=>{}));
        };
    </script>
</body>
</html>