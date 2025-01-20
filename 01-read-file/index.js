const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { highWaterMark : 10, encoding: 'utf-8'});

readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
})