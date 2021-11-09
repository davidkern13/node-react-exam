const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const app = express();
const ENUM = require('./enum');
const fileSystem = require('./files-system/index.js');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ===================== API ==========================

app.get('/', async function(req, res){
  try{
    let data = await fileSystem.readFile({
      path: ENUM.PATH_FILE
    });
    res.status(200).send(data);
  }catch(e){
    res.status(204).send("No Content!");
  }
});

// ===================== WebSocket ==========================

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  fs.watchFile(ENUM.PATH_FILE, ENUM.WATCH_TIME, async (curr, prev) => {
    try{
      let dataFile = await fileSystem.readFile({
        path: ENUM.PATH_FILE
      });
      ws.send(dataFile);
    }catch(e){
      ws.send("No Content!");
    }
  });
});

// ===================== Server ==========================

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
  getDataFromWebSocket();
});

// ===================== Call Api ==========================

const getDataFromWebSocket = () => {
  let client = new WebSocket(ENUM.WEB_API);
  client.on('open', () => {
    // send subscribe message
    client.send(JSON.stringify(ENUM.SUB_API));
  });

  client.on('message', async function message(data) {
    // send subscribe message
    let msgdata = JSON.stringify(JSON.parse(data));

    try {
      await fileSystem.writeFile({
        path: ENUM.PATH_FILE,
        content: msgdata
      });
    } catch (err) {
      console.error(err)
    }
  });
}
