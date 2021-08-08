export default async function ({puppeteer: {frame, elementHandle}}, text) {
  await elementHandle.type(text)
  await frame.evaluate(
    // eslint-disable-next-line no-new-func
    new Function(`
      const [element] = arguments
      element.blur()
    `),
    elementHandle,
  )
}
