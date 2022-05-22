import { WebSocket, WebSocketServer } from 'ws';
import { getUserByToken } from './repositories/userRepository.js';

import app from './app.js';

const PORT = 3000;

app.use((_req, res) => {
  res.render('404');
});

const server = app.listen(PORT, () =>
  console.log(`Running in ${process.env.NODE_ENV} on http://localhost:${PORT}`)
);

const wss = new WebSocketServer({ server });

wss.on('connection', async (ws, request) => {
  ws.token = request.headers.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)').pop() || ''
  if (!(await getUserByToken(ws.token))) {
    ws.close();
  }
  ws.on('message', (data) => {
    const object = JSON.parse(data.toString());
    switch (object.action) {
      case 'message':
        if (ws.room)
          wss.clients.forEach((client) => {
            if (
              client.room === ws.room &&
              client !== ws &&
              client.readyState === WebSocket.OPEN
            ) {
              client.send(JSON.stringify({
                  type: 'message',
                  message: object.message,
              }));
            }
          });
        break;
      case 'room':
        ws.room = object.message;
        break;
      default:
        ws.send(JSON.stringify({
            type: 'error',
            code: 500,
            message: "This action doesn't exist!",
        }));
        break;
    }
  });
});
