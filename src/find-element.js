/* @flow */
import type { Tab, Element } from 'puppet-strings'
import cssToXPath from 'css-to-xpath'

export default async function(
  { puppeteer: { browser, page } }: Tab,
  selector: string,
  text: ?string
): Promise<Element> {
  const xpath =
    typeof text === 'string'
      ? cssToXPath
          .parse(selector)
          .where(cssToXPath.xPathBuilder.text().contains(text))
          .toXPath()
      : cssToXPath(selector)

  const startTime = new Date()

  while (new Date() - startTime < 5000) {
    const elementHandles = await page.$x(xpath)
    const elementHandle = elementHandles[0]

    if (elementHandle) {
      const metadata = await page.evaluate(
        elementHandle => ({
          attributes: Array.from(elementHandle.attributes).reduce(
            (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
            {}
          ),
          innerText: elementHandle.innerText,
          outerHTML: elementHandle.outerHTML
        }),
        elementHandle
      )

      return {
        ...metadata,
        puppeteer: { browser, page, elementHandle }
      }
    }

    await sleep(100)
  }

  throw new Error('Could not find element')
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
