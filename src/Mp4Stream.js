import { Readable } from "stream";
import fetch from "node-fetch";
import { cookie } from "./cookie.js";

export class Mp4Stream extends Readable {
  constructor(url) {
    super();
    this.url = url;
    this.bytesDownloaded = 0;
    this.contentLength = 0;
    this.isRunning = false;
}

async _read() {
  if (this.isRunning) return;

  this.isRunning = true;
  try {
    const response = await fetch(this.url, {
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

    this.contentLength = Number(response.headers.get("Content-Length"));

    response.body.on("data", (data) => {
      this.bytesDownloaded += data.length;
      this.push(data);
      console.log(`Downloaded ${(this.bytesDownloaded / this.contentLength * 100).toFixed(2)}%`)
    });

    response.body.on("close", () => {
      this.push(null);
    });
  } catch (e) {
    this.destroy(e);
  }
}
}
