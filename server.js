const { EventEmitter } = require('node:events')
const { Buffer } = require('node:buffer')
const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer()

server.on('request', (request, response) => {
    const result = fs.readFileSync('./text.txt')

    let allocationTime = process.hrtime()
    const buff = Buffer.from(result).toString('utf-8')
    allocationTime = process.hrtime(allocationTime)

    const emitter = new EventEmitter()

    emitter.on('data', (data) => {
        console.log('Memory Allocation Time:', data)
    })
    emitter.emit('data', allocationTime[0] * 1000 + allocationTime[1] / 1000000)

    response.statusCode = 200

    response.setHeader('Content-Type', 'text/plain')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    response.end(buff)
})

server
    .listen(4080, '127.0.0.1', () => {
        console.log('Server has started on:', server.address())
    })
    .on('error', (error) => {
        console.log('Error:', error)
        process.exit(1)
    })
