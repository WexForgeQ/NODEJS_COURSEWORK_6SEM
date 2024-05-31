require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const sequelize = require('./db');
const ws = require('ws');
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const router = require('./routes/index');
const { User } = require('./models/models');
const timeController = require('./controllers/timeController');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api', router);

const SSL_KEY_PATH = './credentials/server.key'
const SSL_CERT_PATH = './credentials/server.crt'

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH)
}

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  timeController.Notification();
});
    const clients = new Map();
    const wss = new ws.Server({ noServer: true });
    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        const js = JSON.parse(message);
        clients.set(js.sender, ws);
        const senderWs = clients.get(`${js.sender}`)
        const receiverWs = clients.get(`${js.receiver}`);
        if (receiverWs && receiverWs.readyState === ws.OPEN) {
          receiverWs.send(JSON.stringify({ message: js.message, role: js.role, sender: js.receiver, receiver: js.sender }));
        } else { 
        }
      });
    
      ws.on('close', () => {
        console.log('WebSocket-соединение закрыто.');
      });
    });
    
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(PORT, (err) => {
      if(err) {
        console.log(err);
      }
      const serverAddress = httpsServer.address();
      console.log('HTTPS Server is running on port', PORT);
    });
    
    httpsServer.on('upgrade', (request, socket, head) => {
      if (request.url === '/reviewsocket') {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    });



  } catch (e) {
    console.log(e);
  }
};

start();