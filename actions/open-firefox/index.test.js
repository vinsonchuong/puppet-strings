/* @flow */
import test from 'ava'
import { waitForProcess } from 'puppet-strings/test/helpers'
import { openFirefox, branchOnBrowser } from 'puppet-strings'

test('starting Firefox headlessly by default', async t => {
  const browser = await openFirefox()

  await branchOnBrowser({
    async selenium({ selenium: { webDriver } }) {
      const capabilities = await webDriver.getCapabilities()
      const { cmd } = await waitForProcess(capabilities.get('moz:processID'))
      t.true(cmd.includes('-headless'))

      await webDriver.quit()
    }
  })(browser)
})

test('starting Firefox headfully', async t => {
  const browser = await openFirefox({ headless: false })

  await branchOnBrowser({
    async selenium({ selenium: { webDriver } }) {
      const capabilities = await webDriver.getCapabilities()
      const { cmd } = await waitForProcess(capabilities.get('moz:processID'))
      t.false(cmd.includes('-headless'))

      await webDriver.quit()
    }
  })(browser)
})
