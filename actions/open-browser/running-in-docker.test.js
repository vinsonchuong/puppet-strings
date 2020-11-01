import test from 'ava'
import {startContainer, removeContainer} from 'sidelifter'
import getStream from 'get-stream'
import dedent from 'dedent'

test('starting Chrome in a Docker container with Chrome pre-installed', async (t) => {
  const container = await startContainer({
    image: 'vinsonchuong/javascript:latest',
    mount: {
      [process.cwd()]: '/root/puppet-strings'
    },
    cmd: [
      '/bin/bash',
      '-c',
      dedent`
        cd /root

        cat <<JS > index.mjs
        import {openBrowser} from 'puppet-strings'
        async function run() {
          const { puppeteer: { browser } } = await openBrowser('google-chrome')
          const page = await browser.newPage()
          await page.goto('http://example.com')
          console.log(await page.title())
          await browser.close()
        }
        run()
        JS

        yarn add --dev link:./puppet-strings &>/dev/null
        node index.mjs
        `
    ]
  })
  t.teardown(async () => {
    await removeContainer(container)
  })

  const output = await getStream(container.stdout)
  t.true(output.includes('Example Domain'))
})

test('starting Chrome in a Debian Docker container without Chrome pre-installed', async (t) => {
  const container = await startContainer({
    image: 'node:latest',
    mount: {
      [process.cwd()]: '/root/puppet-strings'
    },
    cmd: [
      '/bin/bash',
      '-c',
      dedent`
        cd /root
        
        wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
        echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list
        apt-get update -yq
        apt-get install -yq google-chrome-stable

        cat <<JS > index.mjs
        import { openBrowser } from 'puppet-strings'
        async function run() {
          const { puppeteer: { browser } } = await openBrowser('google-chrome')
          const page = await browser.newPage()
          await page.goto('http://example.com')
          console.log(await page.title())
          await browser.close()
        }
        run()
        JS

        yarn add --dev link:./puppet-strings &> /dev/null
        node index.mjs
        `
    ]
  })
  t.teardown(async () => {
    await removeContainer(container)
  })

  const output = await getStream(container.stdout)
  t.true(output.includes('Example Domain'))
})
