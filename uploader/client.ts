import fs from 'fs/promises';
import net from 'net';

const PORT = 5000;

const client = net.createConnection({ host: '::1', port: PORT }, async () => {
    const filePath = './test.txt';
    const fileHandle = await fs.open(filePath, 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.on('data', (data) => {
        client.write(data);
    });

    fileStream.on('end', () => {
        console.log('The file was successfully uploaded');
        fileHandle.close();
        client.end();
    });
});
