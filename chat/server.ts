import net from 'net';

const server = net.createServer();
const port = 5000;

const clients: net.Socket[] = [];

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(`Client ${socket.remotePort}:`, data.toString('utf8'));
        clients.map((client) => {
            client.write(data);
        });
    });

    clients.push(socket);
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Server is listening on port ${port}`);
});
