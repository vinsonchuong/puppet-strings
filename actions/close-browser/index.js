export default async function ({puppeteer: {browser}}) {
  await browser.close()
}
