import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { GoogleDriveService } from './googleDriveService.js';
dotenv.config();
const __dirname = path.resolve();

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

var filesPaths = [];

export const uploader = async () => {
    const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

    const files = await fs.readdirSync('./downloads', { withFileTypes: true }).filter(item => !item.isDirectory()).map(item => item.name)

    if (files.length === 0) {
        console.log("Ther is no file to upload")
        return
    }

    // for(const fileName of files){
    //     await filesPaths.push(path.resolve(__dirname, `./downloads/${fileName}`))
    // }

    await files.forEach((filesName) => {
        filesPaths.push(path.resolve(__dirname, `./downloads/${filesName}`))
    })

    filesPaths.shift()

    const folderName = 'kasi';

    filesPaths.forEach((item) => {
        if (!fs.existsSync(item)) {
            throw new Error('File not found!');
        }
    })

    let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
        console.error(error);
        return null;
    });

    if (!folder) {
        folder = await googleDriveService.createFolder(folderName)
    }

    for (const filePath of filesPaths) {
        let index = 0;
        await googleDriveService.saveFile(files[index], filePath, 'application/octet-stream', folder.id).catch((error) => {
            console.error(error);
        });
        index += 1
    }

    console.info('File uploaded successfully!');

    if (filesPaths.length === 0) return;

    setTimeout(() => {
        filesPaths.forEach(async (files) => {
            await fs.unlinkSync(files);
        })
        // fs.rm(`${user.id+"downloades"}`, { recursive: true }, () => console.log('done'));
        console.info('File deleted successfully!');
    }, 3000)

}