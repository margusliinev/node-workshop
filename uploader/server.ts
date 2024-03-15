import fs from 'fs/promises';
import net from 'net';

const server = net.createServer();
const PORT = 5000;

server.on('connection', async (socket) => {
    console.log('Client started uploading a file');
    const fileHandle = await fs.open(`storage/temp.txt`, 'w');
    const fileStream = fileHandle.createWriteStream();

    socket.on('data', async (data) => {
        const dividerIdx = data.indexOf('-----');

        if (dividerIdx !== -1) {
            const fileName = data.subarray(10, dividerIdx).toString('utf8');
            await fs.rename('storage/temp.txt', `storage/${fileName}`);
        }

        if (dividerIdx !== -1) return;
        if (!fileStream.write(data)) socket.pause();
    });

    fileStream.on('drain', () => {
        socket.resume();
    });

    socket.on('close', () => {
        console.log('The file was successfully uploaded');
        fileHandle.close();
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error.message);
    });
});

server.listen(PORT, '::1', () => {
    console.log(`Server is listening on port ${PORT}`);
});
