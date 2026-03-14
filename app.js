const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => { res.send(ui); });

io.on('connection', (socket) => {
    // Сразу подключаем человека к единственной комнате
    const room = 'main_voice_room';
    socket.join(room);
    
    // Оповещаем остальных
    socket.to(room).emit('user_joined', socket.id);

    // Передаем список тех, кто уже в комнате
    const clients = io.sockets.adapter.rooms.get(room);
    const others = clients ? Array.from(clients).filter(id => id !== socket.id) : [];
    socket.emit('room_users', others);

    socket.on('offer', d => io.to(d.to).emit('offer', { from: socket.id, offer: d.offer }));
    socket.on('answer', d => io.to(d.to).emit('answer', { from: socket.id, answer: d.answer }));
    socket.on('ice', d => io.to(d.to).emit('ice', { from: socket.id, cand: d.cand }));

    socket.on('disconnect', () => {
        io.emit('user_left', socket.id);
    });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultra Voice Connect</title>
    <style>
        body { background: #000; color: #fff; font-family: sans-serif; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        .circle { width: 120px; height: 120px; background: #00ff00; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 50px; box-shadow: 0 0 30px #00ff00; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        #status { margin-top: 20px; color: #888; text-align: center; font-size: 14px; }
        .user-card { border: 2px solid #333; padding: 20px; border-radius: 15px; background: #111; display: flex; flex-direction: column; align-items: center; }
    </style>
</head>
<body>
    <div class="user-card">
        <div class="circle" id="mic-icon">🎙</div>
        <div id="status">Нажмите для старта</div>
        <button id="start-btn" style="margin-top:20px; padding:10px 20px; cursor:pointer; background:#fff; border:none; border-radius:5px; font-weight:bold;">ВОЙТИ В СЕТЬ</button>
    </div>
    <div id="remote-container"></div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let localStream;
        let peers = {};
        
        // Максимальный список STUN-серверов для пробива любого интернета
        const config = { 
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                { urls: 'stun:global.stun.twilio.com:3478' }
            ] 
        };

        const startBtn = document.getElementById('start-btn');
        const status = document.getElementById('status');

        startBtn.onclick = async () => {
            try {
                // Захват звука с подавлением шума и эха
                localStream = await navigator.mediaDevices.getUserMedia({ 
                    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } 
                });
                
                startBtn.style.display = 'none';
                status.innerText = "В ЭФИРЕ - ЖДЕМ СОБЕСЕДНИКА";
                status.style.color = "#00ff00";

                socket.emit('ready'); // Сообщаем серверу, что мы готовы
            } catch (e) {
                alert("Ошибка доступа к микрофону! Проверьте HTTPS и настройки.");
            }
        };

        socket.on('room_users', users => {
            users.forEach(id => initiateCall(id));
        });

        socket.on('user_joined', id => {
            // Когда кто-то зашел, ждем секунду и звоним ему
            setTimeout(() => initiateCall(id), 1000);
        });

        async function initiateCall(id) {
            if (peers[id]) return;
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
            if (peers[d.from]) peers[d.from].setRemoteDescription(new RTCSessionDescription(d.answer));
        });

        socket.on('ice', d => {
            if (peers[d.from]) peers[d.from].addIceCandidate(new RTCIceCandidate(d.cand)).catch(e => {});
        });

        socket.on('user_left', id => {
            if (peers[id]) {
                peers[id].close();
                delete peers[id];
                document.getElementById('aud_' + id)?.remove();
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
                let aud = document.getElementById('aud_' + id);
                if (!aud) {
                    aud = document.createElement('audio');
                    aud.id = 'aud_' + id;
                    aud.autoplay = true;
                    aud.setAttribute('playsinline', 'true');
                    document.body.appendChild(aud);
                }
                aud.srcObject = e.streams[0];
                status.innerText = "СОЕДИНЕНИЕ УСТАНОВЛЕНО";
            };

            return pc;
        }

        // Авто-разблокировка звука при любом клике
        window.onclick = () => {
            document.querySelectorAll('audio').forEach(a => a.play().catch(()=>{}));
        };
    </script>
</body>
</html>
`;

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => { console.log('Ultra Voice Server running'); });