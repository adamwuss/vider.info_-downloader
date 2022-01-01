import fetch from "node-fetch";
import { cookie } from "./cookie.js";

export const fetchVideoMetadata = async (videoCode) => {
  const res = await fetch(videoCode, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
      "cache-control": "max-age=0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      referer: "https://vider.info/",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie,
    },
  })
    .then((resp) => resp.text())

  try {
    const [, number] = res.match(/https:\/\/vider\.info\/static\/player\/v58\/player\.swf\?file=https:\/\/stream\.vider\.info\/video\/(\d+)\/v\.mp4\?uid=0"/);
    const [, title] = res.match(/<meta name="title" content="(.*?)" \/>/);
    return {number, title};
  } catch (e) {
    throw new Error('Can\'t get video number. You must refresh the site and enter CAPTCHA')
  }
}