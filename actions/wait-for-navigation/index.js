export default async function waitForNavigation({puppeteer: {page}}) {
  await page.waitForNavigation({
    waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
  })
}
