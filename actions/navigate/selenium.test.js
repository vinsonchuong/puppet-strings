/* @flow */
import ava from 'ava'
import * as http from 'http'
import { withFirefoxPerTest } from 'puppet-strings/test/helpers'
import { getTabs, navigate, branchOnTab } from 'puppet-strings'

const test = withFirefoxPerTest(ava)

test('navigating to different URLs', async t => {
  const { browser } = t.context
  const tabs = await getTabs(browser)
  const tab = tabs[0]

  await navigate(tab, 'https://www.google.com/')

  await branchOnTab({
    async selenium({ selenium: { webDriver } }) {
      t.is(await webDriver.getCurrentUrl(), 'https://www.google.com/')
    }
  })(tab)
})

test('allowing the navigation timeout to be set', async t => {
  const { browser } = t.context
  const tabs = await getTabs(browser)
  const tab = tabs[0]

  const server = http.createServer((request, response) => {})
  server.listen(10102)

  try {
    await navigate(tab, 'http://127.0.0.1:10102', { timeout: 1000 })
  } catch (error) {
    t.regex(error.message, /Timeout/)
    t.regex(error.message, /1000ms/)
  } finally {
    server.close()
  }
})
