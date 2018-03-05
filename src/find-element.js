/* @flow */
import type { Tab, Element } from 'puppet-strings'
import { evalInTab } from 'puppet-strings'
import cssToXPath from 'css-to-xpath'

export default async function(
  tab: Tab,
  selector: string,
  text: ?string
): Promise<Element> {
  const { puppeteer: { browser, page } } = tab

  const xpath =
    typeof text === 'string'
      ? cssToXPath
          .parse(selector)
          .where(cssToXPath.xPathBuilder.text().contains(text))
          .toXPath()
      : cssToXPath(selector)

  try {
    const elementHandle = await page.waitForXPath(xpath, {
      visible: true,
      timeout: 5000
    })

    const metadata = await evalInTab(
      tab,
      [elementHandle],
      `
      const [elementHandle] = arguments

      return {
        attributes: Array.from(elementHandle.attributes).reduce(
          (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
          {}
        ),
        innerText: elementHandle.innerText,
        outerHTML: elementHandle.outerHTML
      }
      `
    )

    return {
      ...metadata,
      puppeteer: { browser, page, elementHandle }
    }
  } catch (error) {
    throw new Error('Could not find element')
  }
}
