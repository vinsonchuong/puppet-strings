/* @flow */
import test from 'ava'
import * as path from 'path'
import { run, runInContainer } from 'puppet-strings/test/helpers'
import dedent from 'dedent'

test.before(async () => {
  await run('yarn build-esm')
})

test('starting Chrome in a Docker container with Chrome pre-installed', async t => {
  const output = await runInContainer({
    image: 'splayd/javascript',
    mount: {
      [path.resolve('dist')]: '/root/puppet-strings'
    },
    command: [
      '/bin/bash',
      '-c',
      dedent`
        cd /root

        cat <<JS > index.js
        const { openChrome } = require('puppet-strings')
        async function run() {
          const { puppeteer: { browser } } = await openChrome()
          const page = await browser.newPage()
          await page.goto('http://example.com')
          console.log(await page.title())
          await browser.close()
        }
        run()
        JS

        yarn add --dev ./puppet-strings &> /dev/null
        node index.js
        `
    ]
  })

  t.true(output.includes('Example Domain'))
})

test('starting Chrome in a Debian Docker container without Chrome pre-installed', async t => {
  const output = await runInContainer({
    image: 'node:latest',
    mount: {
      [path.resolve('dist')]: '/root/puppet-strings'
    },
    command: [
      '/bin/bash',
      '-c',
      dedent`
        cd /root
        
        wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
        echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list
        apt-get update -yq
        apt-get install -yq google-chrome-stable

        cat <<JS > index.js
        const { openChrome } = require('puppet-strings')
        async function run() {
          const { puppeteer: { browser } } = await openChrome()
          const page = await browser.newPage()
          await page.goto('http://example.com')
          console.log(await page.title())
          await browser.close()
        }
        run()
        JS

        yarn add --dev ./puppet-strings &> /dev/null
        node index.js
        `
    ]
  })

  t.true(output.includes('Example Domain'))
})
