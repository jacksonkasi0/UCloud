import { fileDownloader } from "./fileDownloader.js";
import { fileSplitter } from "./fileSplit.js";
import { uploader } from "./fileUploader.js";

const spyTor = async () => {
    await fileDownloader()
     await fileSplitter().then(() => {
        uploader();
    })
}

spyTor()
