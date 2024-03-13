import net from 'net';

const client = net.createConnection({ host: '127.0.0.1', port: 5000 }, () => {
    console.log('Connected to the server');
});

client.on('end', () => {
    console.log('Disconnected from the server');
});
