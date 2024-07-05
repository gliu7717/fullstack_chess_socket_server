import { io } from 'socket.io-client';
import { colorfulLog } from 'colorful-log-sw';

const socket = io('http://localhost:8000/');
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log("you entered: [" + d.toString().trim() + "]");    
    socket.emit(process.argv[2], d.toString().trim());
});

const createSocketClient = (name, interval) => {
    socket.on('connect', () => {
        colorfulLog(`${name} connected!`);
    });
    
    socket.on('nextmove', data => {
        console.log(data);
    });

    setInterval(() => {
    }, interval);
    socket.emit(name, `connected ${name}!`);
    
    socket.on('disconnect', () => {
        colorfulLog(`${name} disconnected!`);
    });
}

createSocketClient(process.argv[2], 5000);
