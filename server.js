import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { colorfulLog } from 'colorful-log-sw';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const tables = new Map()

io.on('connection', socket => {
    colorfulLog(`Connected to: ${socket.client.id}`); 
    socket.on('table-1-w', data => {
        tables.set("table-1-w",  socket)
        let conn = tables.get('table-1-b')
        if(conn !==  undefined){
            conn.emit('nextmove', data) 
        }
        colorfulLog(data);
    });
    socket.on('table-1-b', data => {
        tables.set("table-1-b",  socket)
        let conn = tables.get('table-1-w')
        if(conn !==  undefined){
            conn.emit('nextmove', data) 
        }
        colorfulLog(data);
    });

    socket.on('disconnect', () => {
        colorfulLog(`Disconnected from: ${socket.client.id}`);
    });
});
server.listen(8000, () => {
    colorfulLog('Waiting for connections on port 8000', '');
});
