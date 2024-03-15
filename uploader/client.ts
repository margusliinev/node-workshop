import fs from 'fs/promises';
import net from 'net';
import path from 'path';

const PORT = 5000;

const socket = net.createConnection({ host: '::1', port: PORT }, async () => {
    const fileName = process.argv[2];
    if (!fileName) {
        console.error('Please provide a file name');
        process.exit(1);
    }
    const fileHandle = await fs.open(path.basename(fileName), 'r');
    const fileStream = fileHandle.createReadStream();
    const fileSize = (await fileHandle.stat()).size;
    let uploadedPercentage = 0;
    let bytesUploaded = 0;

    socket.write(`Filename: ${fileName}-----`);

    fileStream.on('data', (data) => {
        if (!socket.write(data)) fileStream.pause();
        bytesUploaded += data.length;
        let newUploadedPercentage = Math.floor((bytesUploaded / fileSize) * 100);
        if (newUploadedPercentage > uploadedPercentage) {
            uploadedPercentage = newUploadedPercentage;
            console.log(`Uploaded ${uploadedPercentage}%`);
        }
    });

    socket.on('drain', () => {
        fileStream.resume();
    });

    fileStream.on('end', () => {
        console.log('The file was successfully uploaded');
        socket.end();
    });

    fileStream.on('error', (error) => {
        console.error('File stream error:', error.message);
    });
});
