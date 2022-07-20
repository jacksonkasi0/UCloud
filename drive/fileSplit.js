import splitFile from 'split-file'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

export const fileSplitter = async () => {
    const file = await fs.readdirSync('./downloads', { withFileTypes: true }).filter(item => !item.isDirectory()).map(item => item.name)
    await splitFile.splitFileBySize(__dirname + `/downloads/${file[0]}`, 100000000)
        .then((names) => {
            console.log(names);
            setTimeout(async () => {
                
                const downloadedFile = await fs.readdirSync('./downloads', { withFileTypes: true }).filter(item => !item.isDirectory()).map(item => __dirname + "/downloads/" + item.name).shift()

                await fs.unlinkSync(downloadedFile)
            }, 2500)
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
}
