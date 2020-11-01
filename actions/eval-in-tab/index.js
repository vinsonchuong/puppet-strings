export default async function ({puppeteer: {page}}, args, functionBody) {
  try {
    // eslint-disable-next-line no-new-func
    return await page.evaluate(new Function(functionBody), ...args)
  } catch (error) {
    throw new Error(`Failed to evaluate code in tab: ${error.message}`)
  }
}
