// The use strict mode changes previously accepted "bad syntax" into real errors.
'use strict'

const http               = require('http');
const express            = require('express');
const socketio           = require('socket.io');
const port               = 3000;

const app = express();
const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

const saveUserName = (text) => {
    
}



io.on('connection', (sock) => {

    sock.on('message', (text) => io.emit('message', text));
    sock.on('username', (text) => io.emit('username', text));

});
  
  server.on('error', (err) => {
      console.error('Server error: ', err);
  });
  
  server.listen(port, () => {
      console.log(`Server is started and listening on port ${port}`);
  });