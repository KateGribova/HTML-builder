const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'styles');
const addFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
let array = '';

fs.writeFile(addFilePath, '', (err) => {
    if (err)
        process.stdout.write(err);
    else
        process.stdout.write('File created successfully!');
});

let index = 1;
fs.readdir(dirPath, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            index += 1;
            const filePath = path.join(dirPath, file);
            if (path.extname(filePath).slice(1) === 'css') {
                const readStream = fs.createReadStream(filePath, {encoding: 'utf-8'});
                
                readStream.on('data', (chunk) => {
                    array += chunk;
                })

                readStream.on('end', () => {
                    if (index > files.length) {
                        const writeStream = fs.createWriteStream(addFilePath);
                        writeStream.write(array);
                        writeStream.end();
                    }
                })
            }
        })
    }
})