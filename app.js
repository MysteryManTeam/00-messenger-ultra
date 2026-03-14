const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => { res.send(ui); });

// Храним список всех подключенных ID
let participants = new Set();

io.on('connection', (socket) => {
    participants.add(socket.id);
    
    // Сразу сообщаем новичку, кто уже в звонке
    const others = Array.from(participants).filter(id => id !== socket.id);
    socket.emit('all_users', others);

    // Сигналинг для WebRTC
    socket.on('offer', d => io.to(d.to).emit('offer', { from: socket.id, offer: d.offer }));
    socket.on('answer', d => io.to(d.to).emit('answer', { from: socket.id, answer: d.answer }));
    socket.on('ice', d => io.to(d.to).emit('ice', { from: socket.id, cand: d.cand }));

    socket.on('disconnect', () => {
        participants.delete(socket.id);
        io.emit('user_left', socket.id);
    });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unlimited Voice Hub</title>
    <style>
        body { background: #0b0e11; color: #fff; font-family: sans-serif; margin: 0; display: flex; flex-direction: column; height: 100vh; }
        #header { padding: 20px; background: #15191c; text-align: center; border-bottom: 1px solid #2d3339; }
        #grid { flex: 1; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; padding: 20px; gap: 15px; overflow-y: auto; }
        .user-node { width: 100px; height: 100px; background: #3d444d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; border: 3px solid #00ff00; position: relative; }
        .user-node::after { content: 'LIVE'; position: absolute; bottom: -10px; background: #00ff00; color: #000; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
        #controls { padding: 30px; display: flex; justify-content: center; }
        .btn { padding: 15px 40px; font-size: 18px; font-weight: bold; cursor: pointer; border-radius: 50px; border: none; background: #00ff00; color: #000; box-shadow: 0 0 20px rgba(0,255,0,0.3); }
        .btn:disabled { background: #2d3339; color: #888; cursor: default; box-shadow: none; }
    </style>
</head>
<body>
    <div id="header">
        <h1 style="margin:0; font-size: 18px; color: #00ff00;">ОБЩИЙ ГОЛОСОВОЙ КАНАЛ</h1>
        <p id="stat" style="font-size: 12px; color: #888; margin: 5px 0 0;">Нажмите кнопку, чтобы вас слышали</p>
    </div>

    <div id="grid">
        </div>

    <div id="controls">
        <button id="join-btn" class="btn">ПРИСОЕДИНИТЬСЯ</button>
    </div>

    <div id="audios"></div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let localStream;
        let peers = {};
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478' }] };

        const joinBtn = document.getElementById('join-btn');
        const grid = document.getElementById('grid');

        joinBtn.onclick = async () => {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ 
                    audio: { echoCancellation: true, noiseSuppression: true } 
                });
                joinBtn.disabled = true;
                joinBtn.innerText = "В СЕТИ";
                document.getElementById('stat').innerText = "Вас слышат все участники";
                
                // Запрашиваем список тех, кому нужно позвонить
                socket.emit('ready'); 
            } catch (e) {
                alert("Нужен доступ к микрофону!");
            }
        };

        socket.on('all_users', users => {
            users.forEach(id => createConnection(id, true));
        });

        socket.on('offer', async d => {
            const pc = createConnection(d.from, false);
            await pc.setRemoteDescription(new RTCSessionDescription(d.offer));
            const ans = await pc.createAnswer();
            await pc.setLocalDescription(ans);
            socket.emit('answer', { to: d.from, answer: ans });
        });

        socket.on('answer', d => {
            if (peers[d.from]) peers[d.from].setRemoteDescription(new RTCSessionDescription(d.answer));
        });

        socket.on('ice', d => {
            if (peers[d.from]) peers[d.from].addIceCandidate(new RTCIceCandidate(d.cand)).catch(()=>{});
        });

        socket.on('user_left', id => {
            if (peers[id]) {
                peers[id].close();
                delete peers[id];
                document.getElementById('node_' + id)?.remove();
                document.getElementById('aud_' + id)?.remove();
            }
        });

        function createConnection(id, isOffer) {
            if (peers[id]) return peers[id];

            const pc = new RTCPeerConnection(config);
            peers[id] = pc;

            if (localStream) {
                localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
            }

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
                    document.getElementById('audios').appendChild(aud);

                    const node = document.createElement('div');
                    node.id = 'node_' + id;
                    node.className = 'user-node';
                    node.innerText = '👤';
                    grid.appendChild(node);
                }
                aud.srcObject = e.streams[0];
            };

            if (isOffer) {
                pc.onnegotiationneeded = async () => {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    socket.emit('offer', { to: id, offer });
                };
            }

            return pc;
        }

        // Фикс звука для мобилок
        window.addEventListener('click', () => {
            document.querySelectorAll('audio').forEach(a => a.play().catch(()=>{}));
        }, { once: false });
    </script>
</body>
</html>