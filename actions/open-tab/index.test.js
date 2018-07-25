/* @flow */
import test from 'ava'
import {
  withBrowser,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import * as http from 'http'
import { openTab } from 'puppet-strings'

withDirectory()
withBrowser({ perTest: true, type: 'chrome' })

test('opening tabs', async t => {
  const { browser, directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    `
  )

  t.is((await browser.puppeteer.browser.pages()).length, 0)

  await openTab(browser, `file://${filePath}`)
  t.is((await browser.puppeteer.browser.pages()).length, 1)

  await openTab(browser, `file://${filePath}`)
  t.is((await browser.puppeteer.browser.pages()).length, 2)
})

test('allowing the navigation timeout to be set', async t => {
  const { browser } = t.context
  const server = http.createServer((request, response) => {})
  server.listen(10001)

  try {
    await openTab(browser, 'http://127.0.0.1:10001', { timeout: 1000 })
  } catch (error) {
    t.regex(error.message, /Navigation Timeout/)
    t.regex(error.message, /1000ms/)
  } finally {
    server.close()
  }
})

test('collecting console messages', async t => {
  const { browser, directory } = t.context

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
    `
  )

  const tab = await openTab(browser, `file://${filePath}`)

  t.deepEqual(tab.console, [
    { type: 'log', message: 'Hello' },
    { type: 'error', message: 'There' }
  ])
})

test('collecting uncaught exceptions', async t => {
  const { browser, directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      throw new Error('Hello')
    </script>
    `
  )

  const tab = await openTab(browser, `file://${filePath}`)

  t.is(tab.errors.length, 1)
  t.regex(tab.errors[0], /Error: Hello/)
})

test('failing to navigate due to a connection refused', async t => {
  const { browser } = t.context

  try {
    await openTab(browser, 'http://127.0.0.1:65500')
  } catch (error) {
    t.regex(error.message, /Failed to open tab/)
    t.regex(error.message, /net::ERR_CONNECTION_REFUSED/)
  }
})

test('failing to navigate due to the server not responding', async t => {
  const { browser } = t.context
  const server = http.createServer((request, response) => {})
  server.listen(10000)

  try {
    await openTab(browser, 'http://127.0.0.1:10000')
  } catch (error) {
    t.regex(error.message, /Failed to open tab/)
    t.regex(error.message, /Navigation Timeout/)
  } finally {
    server.close()
  }
})
