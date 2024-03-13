import net from 'net';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('New client connected to the server');
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Server is listening on', server.address());
});
