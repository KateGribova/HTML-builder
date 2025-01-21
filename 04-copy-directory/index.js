const fs = require('fs');
const path = require('path');


async function copyDir() {
    const dirPath = path.join(__dirname, 'files-copy');
    const srcDirPath = path.join(__dirname, 'files');
    await fs.promises.mkdir(dirPath, {recursive : true});

    fs.readdir(srcDirPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                fs.promises.copyFile(path.join(srcDirPath, file), (path.join(dirPath, file)));
            })
        }
    })
}

copyDir();