import net from 'net';
import { Direction } from 'readline';
import readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clearLine = (dir: Direction) => {
    return new Promise<void>((resolve) => {
        process.stdout.clearLine(dir, () => {
            resolve();
        });
    });
};

const moveCursor = (dx: Direction, dy: Direction) => {
    return new Promise<void>((resolve) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        });
    });
};

const ask = async () => {
    const message = await rl.question('Enter a message > ');
    await moveCursor(0, -1);
    await clearLine(0);
    client.write(message);
};

const client = net.createConnection({ host: '127.0.0.1', port: 5000 }, async () => {
    ask();
});

client.on('data', async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    console.log(data.toString('utf8'));
    ask();
});

client.on('end', async () => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    console.log('Disconnected from the server');
});
