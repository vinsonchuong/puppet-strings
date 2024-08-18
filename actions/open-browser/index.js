import puppeteer from 'puppeteer-core'

export default async function openBrowser(executablePath, options = {}) {
  const browser = await puppeteer.launch({
    executablePath,
    headless: options.headless === false ? false : 'new',
    args: [
      // Disabling the process sandbox makes it easier to run in Linux
      // environments
      '--no-sandbox',
      '--disable-setuid-sandbox',
      ...(options.flags || []),
    ],
  })

  // Chrome defaults to opening a single blank tab
  // Cannot close without closing browser:
  // https://github.com/puppeteer/puppeteer/issues/11066
  // const pages = await browser.pages()
  // await pages[0].close()

  return {puppeteer: {browser}}
}
