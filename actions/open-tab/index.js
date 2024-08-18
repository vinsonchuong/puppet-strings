import {navigate} from '../../index.js'
import {makeTab} from '../../wrappers/index.js'

export default async function openTab({puppeteer: {browser}}, url, options) {
  const page = await browser.newPage()
  const tab = makeTab(browser, page)

  if (url) {
    await (options ? navigate(tab, url, options) : navigate(tab, url))
  }

  return tab
}
