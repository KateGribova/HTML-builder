const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'project-dist');
const copyDirPath = path.join(__dirname, 'styles');
const cssFilePath = path.join(dirPath, 'style.css');
const htmlFilePath = path.join(dirPath, 'index.html');
let array = '';

fs.mkdir(dirPath, {recursive : true}, (err) => {
    if (err)
        console.error(err);
    else
        process.stdout.write('Folder "project-dist" created successfully!\n');

    fs.writeFile(htmlFilePath, '', (err) => {
        if (err)
            console.error(err);
        else
            process.stdout.write('File "index.html" created successfully!\n');

        fs.writeFile(cssFilePath, '', (err) => {
            if (err)
                console.error(err);
            else
                process.stdout.write('File "style.css" created successfully!\n');
        });
    });   
});



let index = 1;
fs.readdir(copyDirPath, (err, files) => {
    if (err)
        console.error(err);
    else {
        files.forEach(file => {
            index += 1;
            const filePath = path.join(copyDirPath, file);
            if (path.extname(filePath).slice(1) === 'css') {
                const readStream = fs.createReadStream(filePath, {encoding: 'utf-8'});
                
                readStream.on('data', (chunk) => {
                    array += chunk;
                })

                readStream.on('end', () => {
                    if (index > files.length) {
                        const writeStream = fs.createWriteStream(cssFilePath);
                        writeStream.write(array);
                        writeStream.end();
                    }
                })
            }
        })
    }
})

const srcDirPath = path.join(__dirname, 'assets');
const dirPathAsset = path.join(__dirname, 'project-dist', 'assets');
function copyDir(src, dest) {
    fs.mkdir(dest, {recursive : true}, (err) => {
        if (err)
            process.stdout.write(err);

        fs.readdir(src, (err, files) => {
            if (err)
                console.error(err);
            else {
                files.forEach(file => {
                    const srcFile = path.join(src, file);
                    const destFile = path.join(dest, file);

                    fs.stat(srcFile, (err, stats) => {
                        if (err)
                            console.error(err);
                        else if (stats.isDirectory()) {
                            copyDir(srcFile, destFile);
                        } else if (stats.isFile()) {
                            fs.copyFile(srcFile, destFile, (err) => {
                                if (err)
                                    console.error(err);
                            })
                        }

                    })
                })
            }
        })

    });
}

copyDir(srcDirPath, dirPathAsset);
let arrayHtml = '';
const readStreamTem = fs.createReadStream(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});                          
readStreamTem.on('data', (chunk) => {
    arrayHtml += chunk;
})

let i = 1;
const compDirPath = path.join(__dirname, 'components');
readStreamTem.on('end', () => {
    fs.readdir(compDirPath, (err, files) => {
        if (err)
            console.error(err);
        else {
            files.forEach(file => {
                const compName = path.basename(file, '.html');
                const compPath = path.join(compDirPath, file);
                
                fs.readFile(compPath, 'utf-8', (err, text) => {
                    if (err)
                        console.error(err);
                    else {
                        arrayHtml = arrayHtml.replace(new RegExp(`{{${compName}}}`, 'g'), text)
                    }
                    i += 1;
                    
                    if (i > files.length) {
                        fs.writeFile(htmlFilePath, arrayHtml, (err) => {
                            if (err)
                                console.error(err);
                            else
                                process.stdout.write('File "index.html" successfully recorded!');
                        })
                    }
                })
            })
        }
    })
})