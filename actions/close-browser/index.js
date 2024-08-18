export default async function closeBrowser({puppeteer: {browser}}) {
  await browser.close()
}
