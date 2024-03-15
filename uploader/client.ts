import fs from 'fs/promises';
import net from 'net';

const PORT = 5000;

const client = net.createConnection({ host: '::1', port: PORT }, async () => {
    const filePath = './read.txt';
    const fileHandle = await fs.open(filePath, 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.on('data', (data) => {
        if (!client.write(data)) client.pause();
    });

    client.on('drain', () => {
        client.resume();
    });

    fileStream.on('end', () => {
        console.log('The file was successfully uploaded');
        client.end();
    });

    fileStream.on('error', (error) => {
        console.error('File stream error:', error.message);
    });
});
