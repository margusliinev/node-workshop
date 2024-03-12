const fs = require('fs/promises');

(async () => {
    console.time('Write Many');
    const file = await fs.open('./test.txt', 'w');
    const stream = file.createWriteStream();

    let i = 1;
    const writeMany = () => {
        while (i <= 1000000) {
            const buff = Buffer.from(` ${i} `, 'utf8');
            i++;
            if (i > 1000000) return stream.end(buff);
            if (!stream.write(buff)) break;
        }
    };

    writeMany();

    stream.on('drain', () => {
        writeMany();
    });

    stream.on('finish', () => {
        console.timeEnd('Write Many');
        file.close();
    });
})();
