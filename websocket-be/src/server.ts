import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log(wss.clients , "who are these clients ??");
    wss.clients.forEach(function each(client) {
    // console.log(client)
    console.log(client.readyState , "what is this ready state");
    console.log(WebSocket.OPEN , "WHAT IS THIS OPEN THING")
      if (client.readyState === WebSocket.OPEN) {
        
        client.send(data, { binary: isBinary });

      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});