import test from 'ava'
import * as http from 'http'
import {withChrome} from '../../test/helpers/index.js'
import {openTab, navigate, findElement} from '../../index.js'

withChrome(test)

test('navigating to different URLs', async (t) => {
  const {browser} = global
  const tab = await openTab(browser, 'http://example.com')

  await navigate(tab, 'https://google.com/ncr')
  await findElement(tab, '[name="q"]')

  t.pass()
})

test('allowing the navigation timeout to be set', async (t) => {
  const {browser} = global
  const tab = await openTab(browser, 'http://example.com')

  const server = http.createServer(() => {})
  server.listen(10101)

  try {
    await navigate(tab, 'http://127.0.0.1:10101', {timeout: 1000})
  } catch (error) {
    t.regex(error.message, /Navigation timeout of 1000 ms/)
  } finally {
    server.close()
  }
})
