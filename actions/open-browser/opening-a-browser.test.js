/* @flow */
import test from 'ava'
import { findProcess } from 'puppet-strings/test/helpers'
import { openBrowser, branchOnBrowser } from 'puppet-strings'

test('starting headless by default', async t => {
  const browser = await openBrowser()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await findProcess(browser.process())
      t.true(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})

test('starting with 0 tabs open', async t => {
  const browser = await openBrowser()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.deepEqual(await browser.pages(), [])
      await browser.close()
    }
  })(browser)
})

test('starting Chrome headlessly', async t => {
  const browser = await openBrowser({ headless: true })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await findProcess(browser.process())
      t.true(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})

test('starting Chrome headfully', async t => {
  const browser = await openBrowser({ headless: false })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await findProcess(browser.process())
      t.false(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})
