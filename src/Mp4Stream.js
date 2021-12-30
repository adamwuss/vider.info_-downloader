import fetch from "node-fetch";
import { Readable } from "stream";
import { cookie } from "./cookie.js";

export class Mp4Stream extends Readable {
  bytesDownloaded = 0;
  contentLength

  constructor() {
    super();
  }

  isRunning = false;

  async _read() {
    if (this.isRunning) return;

    this.isRunning = true;

    try {
      const response = await fetch('https://stream2.vider.info/video_dummy2/eyJmaWxlSUQiOiIxNjU0NjAiLCJjaGVja3N1bV9pZCI6IjMzOTY5MjMiLCJwcmVtaXVtIjpmYWxzZSwibGltaXRfcmF0ZV9hZnRlciI6MzE2fQ,,.mp4?', {
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
        if (this.onProgress) {
          this.onProgress({
            downloaded: this.bytesDownloaded,
            expected: this.contentLength,
          })
        }
        this.push(data);
      });

      response.body.on("close", () => {
        this.push(null);
      });
    } catch (e) {
      this.destroy(e);
    }
  }
}


