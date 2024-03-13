import net from 'net';
import readline from 'readline/promises';
import { Direction } from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const moveCursor = (dx: Direction, dy: Direction) => {
    process.stdout.moveCursor(dx, dy);
};

const clearLine = (dir: Direction) => {
    process.stdout.clearLine(dir);
};

const ask = async () => {
    const message = await rl.question('Enter a message > ');
    moveCursor(0, -1);
    clearLine(0);
    client.write(message);
};

const client = net.createConnection({ host: '127.0.0.1', port: 5000 }, () => {
    ask();
});

client.on('data', (data) => {
    console.log();
    moveCursor(0, -1);
    clearLine(0);
    console.log(data.toString('utf8'));
    ask();
});

client.on('end', () => {
    console.log();
    moveCursor(0, -1);
    clearLine(0);
    console.log('Disconnected from the server');
});
