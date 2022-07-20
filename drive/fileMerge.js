import splitFile from 'split-file'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()


const SplitedFiles = fs.readdirSync('./downloads', { withFileTypes: true }).filter(item => !item.isDirectory()).map(item => __dirname + "/files/" + item.name)

SplitedFiles.shift()

console.log(SplitedFiles);

splitFile.mergeFiles(SplitedFiles, __dirname + '/output/kasi.png')
    .then(() => {
        console.log("Files was merged!");
    })
    .catch((err) => {
        console.log('Error: ', err);
    });