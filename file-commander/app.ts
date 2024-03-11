const fs = require('fs/promises');

(async () => {
    try {
        const watcher = fs.watch('./');
        for await (const event of watcher) {
            console.log(event);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
