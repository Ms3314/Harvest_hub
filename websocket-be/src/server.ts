import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(8080);

let rooms: { [roomName: string]: Set<any> } = {}; 
// it stores in key value pair manner 

// Stores rooms and their clients
// set is very similiar to an array , its only difference it stores unique items 


const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data, isBinary) => {
        console.log('Received data type:', typeof data);
        try {
            // Convert Buffer to string if necessary
            if (typeof data !== 'string') {
                            // @ts-expect-error
                data = data.toString();
            }

            console.log('Received data:', data);

            // Parse the message and extract the payload
                        // @ts-expect-error
            const { payload } = JSON.parse(data);
            if (!payload || !payload.room) {
                console.error('Invalid payload:', payload);
                return;
            }

            const { room } = payload;
            console.log(`Client wants to join room: ${room}`);
            
            // Ensure the room exists in the `rooms` map
            if (!rooms[room]) {
                rooms[room] = new Set(); // Create a new room if it doesn't exist
            }

            // Add the client to the room
            rooms[room].add(ws);
            console.log(`Rooms after join:`, rooms);

            // Broadcast the message to all clients in the room
            rooms[room].forEach((client) => {
                // the client here is the web socket 
                if (client.readyState === ws.OPEN) {
                    if (client != ws ) 
                        {
                            client.send(payload.message , { binary: isBinary });
                        }
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        // Remove the client from all rooms
        for (const room in rooms) {
            rooms[room].delete(ws);
            // Delete the room if empty
            if (rooms[room].size === 0) {
                delete rooms[room];
            }
        }
        console.log('Rooms after disconnect:', rooms);
    });

    ws.send('Hello! Message From Server!!');
});



// PROBLEM : 
// jan ye connect hora usko aak baar message karna padta taki iska room humein pata chale 

// type main initialize rehna padta !! 