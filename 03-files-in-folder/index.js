const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, 'secret-folder');

let index = 1;

fs.readdir(filesPath, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            index += 1;
            const filePath = path.join(filesPath, file);
            const filePathStats = fs.statSync(filePath);
            if (filePathStats.isFile()) {
                if (index > files.length){
                    process.stdout.write(file + ' - ' + path.extname(filePath).slice(1) + ' - ' + (filePathStats.size) + ' bytes'); 
                }
                else
                    process.stdout.write(file + ' - ' + path.extname(filePath).slice(1) + ' - ' + (filePathStats.size) + ' bytes\n');
            }
        })
    }
})