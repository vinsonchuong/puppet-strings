export default async function evalInTab(
  {puppeteer: {page}},
  arguments_,
  functionBody,
) {
  try {
    // eslint-disable-next-line no-new-func
    return await page.evaluate(new Function(functionBody), ...arguments_)
  } catch (error) {
    throw new Error(`Failed to evaluate code in tab: ${error.message}`)
  }
}
