export default function makeTab(browser, page) {
  const consoleMessages = []
  page.on('console', (consoleMessage) => {
    consoleMessages.push({
      type: consoleMessage.type(),
      message: consoleMessage.text(),
    })
  })

  const errors = []
  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  return {
    puppeteer: {browser, page},
    console: consoleMessages,
    errors,
  }
}
