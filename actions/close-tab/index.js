export default async function ({puppeteer: {page}}) {
  await page.close()
}
