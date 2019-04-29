/* @flow */
import type { Tab, Element } from 'puppet-strings'
import { evalInTab } from 'puppet-strings'

export default async function(
  tab: Tab,
  selector: string,
  text: ?string
): Promise<Element> {
  const {
    puppeteer: { browser, page }
  } = tab

  try {
    const elementHandle = text
      ? await page.waitForFunction(
          (selector, text) =>
            Array.from(document.querySelectorAll(selector)).find(e =>
              e.textContent.includes(text)
            ),
          { timeout: 5000 },
          selector,
          text
        )
      : await page.waitForSelector(selector, { timeout: 5000 })

    const metadata = await getElementMetadata(tab, elementHandle)
    return {
      ...metadata,
      puppeteer: { browser, page, elementHandle }
    }
  } catch (error) {
    throw new Error('Could not find element')
  }
}

function getElementMetadata(tab, element) {
  return evalInTab(
    tab,
    [element],
    `
    const [element] = arguments

    return {
      attributes: Array.from(element.attributes).reduce(
        (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
        {}
      ),
      innerText: element.innerText,
      outerHTML: element.outerHTML
    }
    `
  )
}
