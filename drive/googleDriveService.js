import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { google } from 'googleapis';

export class GoogleDriveService {

    constructor(clientId, clientSecret, redirectUri, refreshToken) {
        this.driveClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
    }

    createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
        const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        client.setCredentials({ refresh_token: refreshToken });
        return google.drive({
            version: 'v3',
            auth: client,
        });
    }

    createFolder(folderName) {
        return new Promise((resolve, reject) => {
            this.driveClient.files.create({
                resource: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder',
                },
                fields: 'id, name',
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                
                // console.log("this is your new folder",res.data);                
                
                return resolve(res.data ? res.data : null);
            });
        })
    }

    searchFolder(folderName) {
        return new Promise((resolve, reject) => {
            this.driveClient.files.list({
                q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
                fields: 'files(id, name)',
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.data.files ? res.data.files[0] : null);
            });
        });
    }

    saveFile(fileName, filePath, fileMimeType, folderId) {
        return this.driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : []
            },
            resource: {
                parents: [folderId],
            },
            media: {
                mimeType: fileMimeType,
                body: fs.createReadStream(filePath),
            },
        });
    }
}