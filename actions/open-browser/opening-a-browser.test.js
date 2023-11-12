import test from 'ava'
import {withChromePath} from '../../test/helpers/index.js'
import {openBrowser} from '../../index.js'

withChromePath(test)

test('starting headless by default', async (t) => {
  const {
    puppeteer: {browser},
  } = await openBrowser(global.chromePath)
  t.true(browser.process().spawnargs.includes('--headless=new'))
  await browser.close()
})

// Browser auto closes without any tabs
// https://github.com/puppeteer/puppeteer/issues/11066
// test('starting with 0 tabs open', async (t) => {
//   const {
//     puppeteer: {browser},
//   } = await openBrowser(global.chromePath)
//   t.deepEqual(await browser.pages(), [])
//   await browser.close()
// })

test('starting Chrome headlessly', async (t) => {
  const {
    puppeteer: {browser},
  } = await openBrowser(global.chromePath, {headless: true})
  t.true(browser.process().spawnargs.includes('--headless=new'))
  await browser.close()
})

test('starting Chrome headfully', async (t) => {
  const {
    puppeteer: {browser},
  } = await openBrowser(global.chromePath, {headless: false})
  t.false(browser.process().spawnargs.includes('--headless=new'))
  await browser.close()
})

test('starting Chrome with additional flags', async (t) => {
  const {
    puppeteer: {browser},
  } = await openBrowser(global.chromePath, {flags: ['--bwsi']})
  t.true(browser.process().spawnargs.includes('--bwsi'))
  await browser.close()
})
