const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer()

server.on('request', (request, response) => {
    const result = fs.readFileSync('./text.txt')

    response.statusCode = 200

    response.setHeader('Content-Type', 'text/plain')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    response.end(result)
})

server
    .listen(4080, '127.0.0.1', () => {
        console.log('Server has started on:', server.address())
    })
    .on('error', (error) => {
        console.log('Error:', error)
        process.exit(1)
    })
