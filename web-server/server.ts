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
        case '/login':
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            const body = { message: 'Login successful' };
            response.write(JSON.stringify(body));
            response.end();

        default:
            response.statusCode = 404;
            response.end();
    }
});

async function serveStaticFile(response: http.ServerResponse, path: string, contentType: string) {
    try {
        const fileHandle = await fs.open(`./public/${path}`, 'r');
        const fileStream = fileHandle.createReadStream();
        response.setHeader('Content-Type', contentType);
        response.statusCode = 200;
        fileStream.pipe(response);
        fileStream.on('close', () => {
            fileHandle.close();
            response.end();
        });
    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        response.end();
    }
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
