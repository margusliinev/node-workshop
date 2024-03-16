import http from 'http';

const server = http.createServer();
const PORT = 5000;

server.on('request', (request, response) => {
    console.log('-------METHOD-------');
    console.log(request.method);

    console.log('-------URL-------');
    console.log(request.url);

    console.log('-------HEADERS-------');
    console.log(request.headers);

    console.log('-------BODY-------');

    let data: undefined | { title: string; content: string } = undefined;

    request.on('data', (chunk) => {
        let json = JSON.parse(chunk.toString());
        data = json;
    });

    request.on('end', () => {
        console.log(data);

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: `Post with title ${data?.title} has been created` }));
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
