import { spawn } from 'child_process';
import fs from 'fs/promises';

const numberFormatter = spawn('number_formatter', ['./dest.txt', '$', ',']);

numberFormatter.stdout.on('data', (data) => {
    console.log(`Stdout: ${data}`);
});

numberFormatter.stderr.on('data', (data) => {
    console.error(`Stderr: ${data}`);
});

numberFormatter.on('close', (code) => {
    if (code === 0) {
        console.log('number_formatter exited successfully');
    } else {
        console.error(`number_formatter exited unexpectedly`);
    }
});

(async () => {
    const fileHandle = await fs.open('./src.txt', 'r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(numberFormatter.stdin);
})();
