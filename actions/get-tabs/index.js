import {makeTab} from '../../wrappers/index.js'

export default async function ({puppeteer: {browser}}) {
  const pages = await browser.pages()

  // Chrome defaults to opening a single blank tab
  // Cannot close without closing browser:
  // https://github.com/puppeteer/puppeteer/issues/11066
  return pages.slice(1).map((page) => makeTab(browser, page))
}
