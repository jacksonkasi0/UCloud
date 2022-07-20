import Downloader from "nodejs-file-downloader"

export const fileDownloader = async () => {
  const downloader = new Downloader({
    url: "http://212.183.159.230/200MB.zip",
    directory: "./downloads/",
    cloneFiles: false,
    onProgress: function (percentage) {
      console.log("% ", percentage);
    },
    maxAttempts: 3,
    onError: function (error) {
      console.log("Error from attempt ", error);
    },
  });

  try {
    await downloader.download();
  } catch (error) {
    console.log(error);
  }
}
