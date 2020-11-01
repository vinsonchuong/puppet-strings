import {makeTab} from '../../wrappers/index.js'

export default async function ({puppeteer: {browser}}) {
  const pages = await browser.pages()
  return pages.map((page) => makeTab(browser, page))
}
