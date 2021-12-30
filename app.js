import fetch from 'node-fetch'

const cookie = process.env.COOKIE ||
  '_ga=GA1.2.946551051.1607045112; addtl_consent=1~39.4.3.9.6.5.4.13.6.4.15.9.5.2.7.4.1.7.1.3.2.10.3.5.4.13.8.4.6.9.7.10.2.9.2.12.6.7.6.14.5.20.6.5.1.3.1.11.29.4.14.4.4.1.3.10.6.2.9.6.6.4.5.3.1.4.29.4.5.3.1.6.2.2.17.1.17.10.9.1.8.3.3.2.8.1.2.1.3.142.4.8.35.7.15.1.14.3.1.8.10.14.11.3.7.25.5.18.9.7.41.2.4.18.21.3.4.2.1.6.6.5.2.14.18.7.3.2.2.8.19.1.8.8.6.3.10.4.5.15.2.4.9.3.1.6.4.11.1.3.18.4.16.2.6.8.2.4.11.6.5.5.12.16.11.8.1.10.28.8.4.1.3.21.2.7.6.1.9.30.17.4.9.15.8.7.3.6.6.7.2.4.1.7.12.13.22.13.2.12.2.4.6.1.4.15.2.4.9.4.5.1.3.7.13.5.3.12.4.13.4.14.8.2.15.2.5.5.1.2.2.1.1.1.14.7.4.8.2.9.9.1.18.12.13.2.18.1.1.3.1.1.9.20.5.4.6.14.8.4.5.3.5.4.8.4.2.2.2.14.2.13.4.2.6.9.6.3.4.3.5.2.3.6.10.11.2.4.3.16.3.8.3.3.1.2.3.9.19.11.15.3.10.7.6.4.3.4.9.3.3.3.1.1.1.6.11.3.1.1.7.4.6.1.10.5.2.6.3.2.1.1.4.3.2.2.4.3.2.13.7.12.2.1.6.4.5.4.3.2.2.4.1.3.1.1.1.5.6.1.6.9.1.5.2.1.7.2.8.3.8.1.3.1.1.2.1.3.2.6.1.5.6.1.5.3.1.3.1.1.2.2.7.7.1.4.1.2.6.1.2.1.1.3.1.1.4.1.1.2.1.8.1.3.4.4.3.2.1.3.1.4.3.9.6.1.15.10.28.1.2.1.1.12.3.4.1.5.1.3.4.7.1.3.1.1.3.1.5.3.1.3.2.2.1.1.4.2.1.2.1.1.1.2.2.4.2.1.2.2.2.4.1.1.1.2.1.1.1.1.1.1.1.1.1.1.1.2.2.1.1.2.1.2.1.7.1.2.1.1.1.2.1.1.1.1.2.1.1.3.2.1.1.2.6.1.1.1.5.2.1.6.5.1.1.1.1.1.2.1.1.3.1.1.4.1.1.2.2.1.1.4.2.1.1.2.3.2.1.2.3.1.1.1.1.4.1.1.1.5.1.8.1.3.1.5.1.1.3.2.1.1.1.2.3.1.4.2.1.2.2.2.1.1.1.1.1.1.11.1.3.1.1.2.2.1.4.2.2.1.2.1.4.1.1.1.1.1.3.2.1.1.2.5.1.3.6.4.1.1.3.1.4.3.1.2.2.5.1.7.3.1.1.1.1.1.1.1.3.1.2.1.12.1.1; __qca=P0-1095255870-1607045114745; spfp=1d2c3419aa6e1df8de22698abe16f684; _pubcid=f36dc33f-14c8-400c-ad22-7de8c906272d; euconsent-v2=CO935-uO935-uAKAWAPLBCCsAP_AAH_AAB5YHItd_X_fb39j-_59_9t0eY1f9_7_v20zjgeds-8Nyd_X_L8X42M7vB36pq4KuR4Eu3LBIQFlHOHcTUmw6IkVqTPsak2Mr7NKJ7PEinMbe2dYGHtfn9VTuZKYr97s___z__-__v__79f_r-3_3_vp9V---3YHIgEmGpfARZiWOBJNGlUKIEIVxIdACACihGFomsICVwU7K4CP0EDABAagIwIgQYgoxZBAAAAAElEQEgB4IBEARAIAAQAqQEIACNAEFgBIGAQACgGhYARQBCBIQZHBUcpgQESLRQTyVgCUXexhhCGUUANAg4AA.YAAAAAAAAAAA; _gid=GA1.2.713817878.1607348627; spol_tg=eu%3Atrue%7Cip%3A178.43.91.90%7Cn%3Atrue; cookie_viderinfo_sessions=a%3A7%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2281fa6df400aca694cedd0e27856d12b2%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%22178.43.91.90%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A114%3A%22Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F87.0.4280.88+Safari%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1607365715%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3Bs%3A8%3A%22language%22%3Bs%3A2%3A%22pl%22%3Bs%3A14%3A%22file_last_view%22%3Bs%3A5%3A%2235146%22%3B%7D13c1421c90f518b9650d46a33bffe334; _gat=1; cookie_sess_ebdd=YToxOntzOjQ6InRpbWUiO2k6MTYwNzM2NTk4Nzt9; cookie_stream_hostname=freedisc-n4';

const url = process.argv[2]

const fetchVideoMetadata = async () => {
  const res = await fetch(url, {
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
    const  [, number] = res.match(/https:\/\/vider\.info\/static\/player\/v58\/player\.swf\?file=https:\/\/stream\.vider\.info\/video\/(\d+)\/v\.mp4\?uid=0"/);
    const [, title] = res.match(/<meta name="title" content="(.*?)" \/>/);
    console.log('title', title);
    console.log('number', number);
    return { number, title };
  } catch (e) {
    console.log('error', e);
  }
}

fetchVideoMetadata()
