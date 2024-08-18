export default async function clickElement({puppeteer: {elementHandle}}) {
  await elementHandle.click()
}
