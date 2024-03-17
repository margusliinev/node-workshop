import http from 'http';
import fs from 'fs/promises';

const server = http.createServer();
const PORT = 5000;

server.on('request', async (request, response) => {
    switch (request.url) {
        case '/':
            await serveStaticFile(response, 'index.html', 'text/html');
            break;
        case '/style.css':
            await serveStaticFile(response, 'style.css', 'text/css');
            break;
        case '/script.js':
            await serveStaticFile(response, 'script.js', 'text/javascript');
            break;
        case '/favicon.ico':
            await serveStaticFile(response, 'favicon.ico', 'image/x-icon');
            break;
        case '/json':
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.write(JSON.stringify({ message: 'Some JSON data' }));
            response.end();
        case '/upload':
            if (request.method === 'POST') {
                const fileHandle = await fs.open('./storage/image.ico', 'w');
                const fileStream = fileHandle.createWriteStream();
                request.pipe(fileStream);
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 201;
                request.on('end', () => {
                    response.end(JSON.stringify({ message: 'File uploaded' }));
                });
            }
        default:
            const fileHandle = await fs.open('./public/error.html', 'r');
            const fileStream = fileHandle.createReadStream();
            response.setHeader('Content-Type', 'text/html');
            response.statusCode = 404;
            fileStream.pipe(response);
    }
});

async function serveStaticFile(response: http.ServerResponse, path: string, contentType: string) {
    try {
        const fileHandle = await fs.open(`./public/${path}`, 'r');
        const fileStream = fileHandle.createReadStream();
        response.setHeader('Content-Type', contentType);
        response.statusCode = 200;
        fileStream.pipe(response);
    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        response.end();
    }
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
