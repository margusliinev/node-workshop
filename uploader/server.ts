import fs from 'fs/promises';
import net from 'net';

const server = net.createServer();
const PORT = 5000;

server.on('connection', async (socket) => {
    console.log('Client connected');
    const fileHandle = await fs.open(`storage/test.txt`, 'w');
    const fileStream = fileHandle.createWriteStream();

    socket.on('data', (data) => {
        fileStream.write(data);
    });

    socket.on('end', () => {
        console.log('Connection ended');
        fileHandle.close();
        socket.end();
    });
});

server.listen(PORT, '::1', () => {
    console.log(`Server is listening on port ${PORT}`);
});
