/* @flow */
import test from 'ava'
import {
  withBrowser,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab } from 'puppet-strings'

withDirectory()
withBrowser({ perTest: true })

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
