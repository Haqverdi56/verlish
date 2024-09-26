import { io } from 'socket.io-client';

const socket = io('https://tiktok-show-back.onrender.com');
console.log(socket);

export default socket;