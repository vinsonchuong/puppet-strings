export default async function (tab, selector, text, {timeout = 5000} = {}) {
  const {
    puppeteer: {browser, page}
  } = tab

  try {
    const [frame, elementHandle] = await Promise.race(
      page.frames().map(async (frame) => [
        frame,
        text
          ? await frame.waitForFunction(
              // eslint-disable-next-line no-new-func
              new Function(`
                const [selector, text] = arguments
                return Array.from(document.querySelectorAll(selector))
                  .find(e => e.textContent.includes(text))
              `),
              {timeout},
              selector,
              text
            )
          : await frame.waitForSelector(selector, {timeout})
      ])
    )

    const metadata = await frame.evaluate(
      // eslint-disable-next-line no-new-func
      new Function(`
        const [element] = arguments

        return {
          attributes: Array.from(element.attributes).reduce(
            (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
            {}
          ),
          innerText: element.innerText,
          textContent: element.textContent,
          outerHTML: element.outerHTML
        }
      `),
      elementHandle
    )

    return {
      ...metadata,
      puppeteer: {browser, page, frame, elementHandle}
    }
  } catch {
    throw new Error(
      `Could not find element with selector "${selector}"${
        text ? ` and text "${text}"` : ''
      }`
    )
  }
}
