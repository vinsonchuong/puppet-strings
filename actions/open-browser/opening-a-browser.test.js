/* @flow */
import test from 'ava'
import { findProcess } from 'puppet-strings/test/helpers'
import { openBrowser } from 'puppet-strings'

test('starting headless by default', async t => {
  const browser = await openBrowser()

  const runningProcess = await findProcess(browser.puppeteer.browser.process())
  t.true(runningProcess.cmd.includes('--headless'))

  await browser.puppeteer.browser.close()
})

test('starting with 0 tabs open', async t => {
  const browser = await openBrowser()

  t.deepEqual(await browser.puppeteer.browser.pages(), [])

  await browser.puppeteer.browser.close()
})

test('starting Chrome headlessly', async t => {
  const browser = await openBrowser({ headless: true })

  const runningProcess = await findProcess(browser.puppeteer.browser.process())
  t.true(runningProcess.cmd.includes('--headless'))

  await browser.puppeteer.browser.close()
})

test('starting Chrome headfully', async t => {
  const browser = await openBrowser({ headless: false })

  const runningProcess = await findProcess(browser.puppeteer.browser.process())
  t.false(runningProcess.cmd.includes('--headless'))

  await browser.puppeteer.browser.close()
})
