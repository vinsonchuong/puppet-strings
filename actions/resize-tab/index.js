export default async function ({puppeteer: {page}}, width, height) {
  await page.setViewport({width, height})
}
