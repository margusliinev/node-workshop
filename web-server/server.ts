import http from 'http';
import fs from 'fs/promises';

const server = http.createServer();
const PORT = 5000;

server.on('request', async (request, response) => {
    if (request.url === '/' && request.method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.statusCode = 200;
        const fileHandle = await fs.open('./public/index.html', 'r');
        const fileStream = fileHandle.createReadStream();
        fileStream.pipe(response);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
