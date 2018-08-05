/* @flow */
import test from 'ava'
import { waitForProcess } from 'puppet-strings/test/helpers'
import { openChrome, branchOnBrowser } from 'puppet-strings'

test('starting headless by default', async t => {
  const browser = await openChrome()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await waitForProcess(browser.process())
      t.true(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})

test('starting with 0 tabs open', async t => {
  const browser = await openChrome()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.deepEqual(await browser.pages(), [])
      await browser.close()
    }
  })(browser)
})

test('starting Chrome headlessly', async t => {
  const browser = await openChrome({ headless: true })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await waitForProcess(browser.process())
      t.true(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})

test('starting Chrome headfully', async t => {
  const browser = await openChrome({ headless: false })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      const runningProcess = await waitForProcess(browser.process())
      t.false(runningProcess.cmd.includes('--headless'))

      await browser.close()
    }
  })(browser)
})
