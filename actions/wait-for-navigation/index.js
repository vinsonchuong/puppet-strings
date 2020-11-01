export default async function ({puppeteer: {page}}) {
  await page.waitForNavigation({
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  })
}
