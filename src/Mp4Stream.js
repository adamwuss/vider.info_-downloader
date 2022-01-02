import { Readable } from "stream";
import fetch from "node-fetch";
import { cookie } from "./cookie.js";
import cliProgress from "cli-progress";
import colors from "colors";

export class Mp4Stream extends Readable {
  constructor(url) {
    super();
    this.url = url;
    this.bytesDownloaded = 0;
    this.contentLength = 0;
    this.isRunning = false;
  };

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

    const bar = new cliProgress.SingleBar({
      etaBuffer: 1000,
      format: `Downloading ${process.argv[2]} |${colors.cyan("{bar}")}| ${colors.red("{percentage}%")} || ${colors.blue("{value}/{total} Bytes")} || ${colors.yellow("ETA: {eta}s")}`,
    }, cliProgress.Presets.shades_classic);

    let isBarStarted = false;

    bar.start(100,0);

    response.body.on("data", (data) => {
      this.bytesDownloaded += data.length;
      this.push(data);
      if (!isBarStarted) {
        isBarStarted = true;
        bar.setTotal((this.contentLength));
      }

      bar.update((this.bytesDownloaded));

      if (this.contentLength === this.bytesDownloaded) {
        bar.stop();
      }
    });

    response.body.on("close", () => {
      this.push(null);
    });
  } catch (e) {
    this.destroy(e);
  }
}
}
