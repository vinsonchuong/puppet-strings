export default async function navigate({puppeteer: {page}}, url, options = {}) {
  try {
    await page.goto(url, {
      waitUntil: [
        'load',
        'domcontentloaded',
        ...(options.waitUntilNetworkIdle ? ['networkidle0'] : []),
      ],
      timeout: options.timeout || 5000,
    })
  } catch (error) {
    throw new Error(`Failed to navigate: ${error.message}`)
  }
}
