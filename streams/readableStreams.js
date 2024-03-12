const fs = require('fs/promises');

(async () => {
    const readFile = await fs.open('test.txt', 'r');
    const writeFile = await fs.open('dest.txt', 'w');
    const readStream = readFile.createReadStream();
    const writeStream = writeFile.createWriteStream();
    let split = '';

    readStream.on('data', (chunk) => {
        const numbers = chunk.toString('utf8').split('  ');

        if (numbers[0] !== Number(numbers[1]) - 1) {
            if (split) numbers[0] = split + numbers[0];
        }

        if (Number(numbers[numbers.length - 2] + 1) !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop();
        }

        numbers.forEach((number) => {
            let n = Number(number);

            if (n % 2 === 0) {
                if (!writeStream.write(' ' + n + ' ')) readStream.pause();
            }
        });
    });

    writeStream.on('drain', () => {
        readStream.resume();
    });
})();
