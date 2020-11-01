export default async function ({puppeteer: {elementHandle}}) {
  await elementHandle.click()
}
