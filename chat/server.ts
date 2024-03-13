import net from 'net';

const server = net.createServer();

const clients: net.Socket[] = [];

server.on('connection', (socket) => {
    console.log('New client connected to the server');
    socket.on('data', (data) => {
        console.log('Received data from port:', socket.remotePort);
        console.log('Data:', data.toString('utf8'));
        clients.map((client) => {
            client.write(data);
        });
    });

    clients.push(socket);
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Server is listening on', server.address());
});
