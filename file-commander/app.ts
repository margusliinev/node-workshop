import fs from 'fs/promises';

(async () => {
    const CREATE_FILE = 'create a file';
    const DELETE_FILE = 'delete a file';
    const RENAME_FILE = 'rename a file';
    const WRITE_TO_FILE = 'write to a file';

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

    const deleteFile = async (path: string) => {
        try {
            await fs.unlink(path);
        } catch (error) {
            console.error(`An error occurred while deleting the file at ${path}`);
        }
    };

    const renameFile = async (path: string, newPath: string) => {
        try {
            const existingFileHandle = await fs.open(path, 'r');
            await fs.rename(path, newPath);
            existingFileHandle?.close();
        } catch (error) {
            console.error(`An error occurred while renaming the file at ${path}`);
        }
    };

    const writeToFile = async (path: string, content: string) => {
        try {
            const existingFileHandle = await fs.open(path, 'w');
            existingFileHandle.write(content);
            existingFileHandle.close();
        } catch (error) {
            console.error(`An error occurred while writing to the file at ${path}`);
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
                    const filePath = command.substring(CREATE_FILE.length + 1);
                    createFile(filePath);
                } else if (command.includes('delete a file')) {
                    const filePath = command.substring(DELETE_FILE.length + 1);
                    deleteFile(filePath);
                } else if (command.includes('rename a file')) {
                    const filePath = command.substring(RENAME_FILE.length + 1);
                    renameFile(filePath, 'renamed-file.txt');
                } else if (command.includes('write to a file')) {
                    const filePath = command.substring(WRITE_TO_FILE.length + 1);
                    const content = 'blabla';
                    writeToFile(filePath, content);
                } else {
                    console.log('Invalid command');
                }
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
