import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(8080);

let room: string[] = [];

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        // Handle different data types
        if (typeof data !== 'string') {
            // @ts-expect-error
            data = data.toString();
        }

        console.log('Received data:', data);

        try {
            // @ts-expect-error
            const payload = JSON.parse(data).payload;

            if (!payload || !payload.room) {
                console.error('Invalid payload:', payload);
                return;
            }

            console.log('Parsed payload:', payload);

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    // Check if the room exists
                    const res = room.find((r) => r === payload.room);

                    if (res) {
                        client.send(data, { binary: isBinary });
                    }

                    // Add room only if it doesn't exist
                    if (!res) {
                        room.push(payload.room);
                    }
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.send('Hello! Message From Server!!');
});
