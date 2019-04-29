/* @flow */
import test from 'ava'
import * as http from 'http'
import { withChrome } from 'puppet-strings/test/helpers'
import { openTab, navigate, findElement } from 'puppet-strings'

withChrome()

test('navigating to different URLs', async t => {
  const { browser } = global
  const tab = await openTab(browser, 'http://example.com')

  await navigate(tab, 'https://google.com/ncr')
  await findElement(tab, '[name="q"]')

  t.pass()
})

test('allowing the navigation timeout to be set', async t => {
  const { browser } = global
  const tab = await openTab(browser, 'http://example.com')

  const server = http.createServer((request, response) => {})
  server.listen(10101)

  try {
    await navigate(tab, 'http://127.0.0.1:10101', { timeout: 1000 })
  } catch (error) {
    t.regex(error.message, /Navigation Timeout/)
    t.regex(error.message, /1000ms/)
  } finally {
    server.close()
  }
})
