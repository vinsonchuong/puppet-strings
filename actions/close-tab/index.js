export default async function closeTab({puppeteer: {page}}) {
  await page.close()
}
