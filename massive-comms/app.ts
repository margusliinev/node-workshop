import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const numberFormatterPath = path.join(__dirname, 'number_formatter');
const numberFormatter = spawn(numberFormatterPath, ['./dest.txt', '$', ',']);

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
