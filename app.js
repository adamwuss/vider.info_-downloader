import { createWriteStream } from "fs";
import { fetchVideoMetadata } from "./src/fetchVideoMetadata.js";
import { fetchMp4Url } from "./src/fetchMp4Url.js";
import fetch from "node-fetch";
import { cookie } from "./src/cookie.js";
import { Readable } from "stream";

const download = async (linkViderInfo) => {

  const { number, title } = await fetchVideoMetadata(linkViderInfo);
  const urlToDownload = await fetchMp4Url(number);

  const newStream = new Readable
  let bytesDownloaded = 0
  newStream._read = async () => {
    try {
      const response = await fetch(urlToDownload, {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
          range: "bytes=0-",
          referer: "https://vider.info/",
          "sec-fetch-dest": "video",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "same-site",
          cookie,
        },
      });

      const contentLength = Number(response.headers.get("Content-Length"));

      response.body.on("data", (data) => {
        bytesDownloaded += data.length;
        console.log('Progress:', bytesDownloaded/contentLength, '%')
        newStream.push(data);
      });
    } catch (e) {
      console.log('error', e)
    }
  }

  const fileStream = createWriteStream(`./videos/${title}.mp4`, (err, data) => {
    console.log('data', data)
  });
  newStream.pipe(fileStream);
}

download(process.argv[2])
