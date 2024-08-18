export default async function resizeTab({puppeteer: {page}}, width, height) {
  await page.setViewport({width, height})
}
