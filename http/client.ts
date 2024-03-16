import http from 'http';

const agent = new http.Agent({ keepAlive: true });

const request = http.request({ agent: agent, host: 'localhost', port: 5000, method: 'POST', path: '/posts', headers: { 'Content-Type': 'application/json' } });

request.on('response', (response) => {
    console.log('-------STATUS-------');
    console.log(response.statusCode);

    console.log('-------HEADERS-------');
    console.log(response.headers);

    response.on('data', (chunk) => {
        console.log('-------BODY-------');
        console.log(JSON.parse(chunk.toString()));
    });

    response.on('end', () => {
        console.log('No more data in response.');
    });
});

request.end(JSON.stringify({ title: 'Post title', content: 'This is post content, mega interesting' }));
