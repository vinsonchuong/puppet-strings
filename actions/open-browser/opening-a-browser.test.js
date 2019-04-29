/* @flow */
import test from 'ava'
import { openBrowser } from 'puppet-strings'

const chromeCli = process.env.CI ? 'google-chrome' : 'chromium'

test('starting headless by default', async t => {
  const {
    puppeteer: { browser }
  } = await openBrowser(chromeCli)
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting with 0 tabs open', async t => {
  const {
    puppeteer: { browser }
  } = await openBrowser(chromeCli)
  t.deepEqual(await browser.pages(), [])
  await browser.close()
})

test('starting Chrome headlessly', async t => {
  const {
    puppeteer: { browser }
  } = await openBrowser(chromeCli, { headless: true })
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting Chrome headfully', async t => {
  const {
    puppeteer: { browser }
  } = await openBrowser(chromeCli, { headless: false })
  // $FlowFixMe
  t.false(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting Chrome with additional flags', async t => {
  const {
    puppeteer: { browser }
  } = await openBrowser(chromeCli, { flags: ['--bwsi'] })
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--bwsi'))
  await browser.close()
})
