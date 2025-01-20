const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

process.stdout.write('Enter text (enter "exit" or "ctrl + c" to finish): ')
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === 'exit') {
        process.stdout.write('Entry completed.\n');
        process.exit();
    }
    writeStream.write(input + '\n');
});

process.on('SIGINT', () => {
    process.stdout.write('Entry completed.\n');
    process.exit();
})