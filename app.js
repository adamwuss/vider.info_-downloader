import { Mp4Stream } from './src/Mp4Stream.js';
import { fetchVideoMetadata } from "./src/fetchVideoMetadata.js";
import { createWriteStream } from 'fs';

const { number, title } = await fetchVideoMetadata(process.argv[2]);

const stream = new Mp4Stream(`https://stream.vider.info/video/${number}/v.mp4`);

const fileStream = createWriteStream(`./videos/${title}.mp4`);

fileStream.on('finish', () => {
  console.log('Video has been downloaded!');
});

stream.pipe(fileStream);
