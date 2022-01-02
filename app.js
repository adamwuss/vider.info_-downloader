import { Mp4Stream } from './src/Mp4Stream.js';
import { fetchVideoMetadata } from "./src/fetchVideoMetadata.js";
import { fetchMp4Url } from "./src/fetchMp4Url.js";
import { createWriteStream } from 'fs';

const { number, title } = await fetchVideoMetadata(process.argv[2]);

const urlToDownload = await fetchMp4Url(number);

const stream = new Mp4Stream(urlToDownload);

const fileStream = createWriteStream(`./videos/${title}.mp4`)
fileStream.on('finish', () => {
  console.log('Video has been downloaded');
});

stream.pipe(fileStream);
