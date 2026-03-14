const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => { res.send(ui); });

let users = new Set();

io.on('connection', (socket) => {
    // Лимит 4 человека
    if (users.size >= 4) {
        socket.emit('full');
        return;
    }

    users.add(socket.id);

    // Новичок получает ID всех, кто уже в звонке
    const others = Array.from(users).filter(id => id !== socket.id);
    socket.emit('init_list', others);

    socket.on('offer', d => io.to(d.to).emit('offer', { from: socket.id, offer: d.offer }));
    socket.on('answer', d => io.to(d.to).emit('answer', { from: socket.id, answer: d.answer }));
    socket.on('ice', d => io.to(d.to).emit('ice', { from: socket.id, cand: d.cand }));

    socket.on('disconnect', () => {
        users.delete(socket.id);
        io.emit('user_left', socket.id);
    });
});

const ui = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice Chat 4</title>
    <style>
        body { background: #0f1012; color: #fff; font-family: sans-serif; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        #grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 20px; width: 100%; max-width: 400px; }
        .user-box { aspect-ratio: 1; background: #1c1e22; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #2d3139; transition: 0.3s; }
        .user-box.active { border-color: #23a559; box-shadow: 0 0 15px rgba(35,165,89,0.3); }
        .avatar { font-size: 40px; margin-bottom: 10px; }
        .label { font-size: 12px; color: #888; }
        #btn-main { padding: 15px 40px; font-size: 18px; border-radius: 30px; border: none; background: #5865f2; color: #fff; cursor: pointer; font-weight: bold; }
        #btn-main:disabled { background: #35373c; }
    </style>
</head>
<body>
    <div id="status" style="margin-bottom: 20px; color: #888;">Свободных мест: <span id="slots">4</span></div>
    
    <div id="grid">
        <div class="user-box" id="me-box"><div class="avatar">👤</div><div class="label">Вы</div></div>
    </div>

    <div style="margin-top: 30px;">
        <button id="btn-main">ПОДКЛЮЧИТЬСЯ</button>
    </div>

    <div id="audios"></div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let localStream;
        let peers = {};
        const config = { iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
        ]};

        const btn = document.getElementById('btn-main');
        const grid = document.getElementById('grid');

        btn.onclick = async () => {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
                btn.disabled = true;
                btn.innerText = "В СЕТИ";
                document.getElementById('me-box').classList.add('active');
                socket.emit('ready'); 
            } catch (e) { alert("Разрешите микрофон!"); }
        };

        socket.on('init_list', users => {
            document.getElementById('slots').innerText = 4 - (users.length + 1);
            users.forEach(id => connectTo(id, true));
        });

        socket.on('offer', async d => {
            const pc = connectTo(d.from, false);
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
                document.getElementById('slots').innerText = parseInt(document.getElementById('slots').innerText) + 1;
            }
        });

        socket.on('full', () => { alert("Комната заполнена!"); location.reload(); });

        function connectTo(id, isOffer) {
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
                    aud.id = 'aud_' + id; aud.autoplay = true; aud.setAttribute('playsinline', 'true');
                    document.getElementById('audios').appendChild(aud);

                    const box = document.createElement('div');
                    box.id = 'node_' + id;
                    box.className = 'user-box active';
                    box.innerHTML = '<div class=\"avatar\">🎙</div><div class=\"label\">Собеседник</div>';
                    grid.appendChild(box);
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

        window.onclick = () => {
            document.querySelectorAll('audio').forEach(a => a.play().catch(()=>{}));
        };
    </script>
</body>
</html>