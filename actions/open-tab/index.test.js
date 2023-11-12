import http from 'node:http'
import {setTimeout} from 'node:timers/promises'
import test from 'ava'
import {
  withChromePerTest,
  withDirectory,
  writeFile,
} from '../../test/helpers/index.js'
import {openTab} from '../../index.js'

withDirectory(test)
withChromePerTest(test)

test('opening tabs', async (t) => {
  const {browser, directory} = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    `,
  )

  const startingCount = (await browser.puppeteer.browser.pages()).length

  await openTab(browser, `file://${filePath}`)
  t.is((await browser.puppeteer.browser.pages()).length, startingCount + 1)

  await openTab(browser, `file://${filePath}`)
  t.is((await browser.puppeteer.browser.pages()).length, startingCount + 2)
})

test('allowing the navigation timeout to be set', async (t) => {
  const {browser} = t.context
  const server = http.createServer(async (request, response) => {
    response.writeHead(200, {})
    await setTimeout(1200)
    response.end('<!doctype html>')
  })
  server.listen(10_001)

  try {
    await openTab(browser, 'http://127.0.0.1:10001', {timeout: 1000})
  } catch (error) {
    t.regex(error.message, /Navigation timeout of 1000 ms/)
  } finally {
    server.close()
  }
})

test('opening empty tabs', async (t) => {
  const {browser} = t.context
  const startingCount = (await browser.puppeteer.browser.pages()).length

  const tab = await openTab(browser)
  t.is((await browser.puppeteer.browser.pages()).length, startingCount + 1)

  t.is(tab.puppeteer.page.url(), 'about:blank')
})

test('collecting console messages', async (t) => {
  const {browser, directory} = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      console.log('Hello')
      console.error('There')
    </script>
    `,
  )

  const tab = await openTab(browser, `file://${filePath}`)

  t.deepEqual(tab.console, [
    {type: 'log', message: 'Hello'},
    {type: 'error', message: 'There'},
  ])
})

test('collecting uncaught exceptions', async (t) => {
  const {browser, directory} = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      throw new Error('Hello')
    </script>
    `,
  )

  const tab = await openTab(browser, `file://${filePath}`)

  t.is(tab.errors.length, 1)
  t.regex(tab.errors[0], /Hello/)
})

test('failing to navigate due to a connection refused', async (t) => {
  const {browser} = t.context

  try {
    await openTab(browser, 'http://127.0.0.1:65500')
  } catch (error) {
    t.regex(error.message, /Failed to navigate/)
  }
})

test('failing to navigate due to the server not responding', async (t) => {
  const {browser} = t.context
  const server = http.createServer(() => {})
  server.listen(10_000)

  try {
    await openTab(browser, 'http://127.0.0.1:10000')
  } catch (error) {
    t.regex(error.message, /Failed to navigate/)
    t.regex(error.message, /Navigation timeout/)
  } finally {
    server.close()
  }
})
