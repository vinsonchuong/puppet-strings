/* @flow */
import test from 'ava'
import { findProcess } from 'puppet-strings/test/helpers'
import { openFirefox } from 'puppet-strings'

test('starting Firefox headlessly by default', async t => {
  const browser = await openFirefox()

  const capabilities = await browser.selenium.browser.getCapabilities()
  const { cmd } = await findProcess(capabilities.get('moz:processID'))
  t.true(cmd.includes('-headless'))

  await browser.selenium.browser.quit()
})

test('starting Firefox headfully', async t => {
  const browser = await openFirefox({ headless: false })

  const capabilities = await browser.selenium.browser.getCapabilities()
  const { cmd } = await findProcess(capabilities.get('moz:processID'))
  t.false(cmd.includes('-headless'))

  await browser.selenium.browser.quit()
})
