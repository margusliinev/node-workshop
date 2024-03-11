import fs from 'fs/promises';

(async () => {
    const CREATE_A_FILE = 'create a file';

    const createFile = async (path: string) => {
        try {
            const existingFileHandle = await fs.open(path, 'r');
            existingFileHandle?.close();
            return console.log(`The file at ${path} already exists.`);
        } catch (error) {
            const newFileHandle = await fs.open(path, 'w');
            console.log(`A new file was successfully created at ${path}`);
            newFileHandle.close();
        }
    };

    const commandFileHandler = await fs.open('./command.txt', 'r');

    try {
        const watcher = fs.watch('./command.txt');
        for await (const event of watcher) {
            if (event.eventType === 'change') {
                const size = (await commandFileHandler.stat()).size;
                const buff = Buffer.alloc(size);

                const length = size;
                const offset = 0;
                const position = 0;

                await commandFileHandler.read(buff, offset, length, position);

                const command = buff.toString('utf8');

                if (command.includes('create a file')) {
                    const filePath = command.substring(CREATE_A_FILE.length + 1);
                    createFile(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
