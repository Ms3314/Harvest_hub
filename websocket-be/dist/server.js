"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
let room = [];
const wss = new ws_1.WebSocketServer({ server: httpServer });
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
        }
        catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    ws.send('Hello! Message From Server!!');
});
