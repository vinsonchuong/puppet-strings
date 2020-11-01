import test from 'ava'
import {withChromePath} from '../../test/helpers/index.js'
import {openBrowser} from '../../index.js'

withChromePath(test)

test('starting headless by default', async (t) => {
  const {
    puppeteer: {browser}
  } = await openBrowser(global.chromePath)
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting with 0 tabs open', async (t) => {
  const {
    puppeteer: {browser}
  } = await openBrowser(global.chromePath)
  t.deepEqual(await browser.pages(), [])
  await browser.close()
})

test('starting Chrome headlessly', async (t) => {
  const {
    puppeteer: {browser}
  } = await openBrowser(global.chromePath, {headless: true})
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting Chrome headfully', async (t) => {
  const {
    puppeteer: {browser}
  } = await openBrowser(global.chromePath, {headless: false})
  // $FlowFixMe
  t.false(browser.process().spawnargs.includes('--headless'))
  await browser.close()
})

test('starting Chrome with additional flags', async (t) => {
  const {
    puppeteer: {browser}
  } = await openBrowser(global.chromePath, {flags: ['--bwsi']})
  // $FlowFixMe
  t.true(browser.process().spawnargs.includes('--bwsi'))
  await browser.close()
})
