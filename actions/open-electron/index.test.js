/* @flow */
import ava from 'ava'
import * as path from 'path'
import {
  withDirectory,
  writeFile,
  run,
  runInContainer
} from 'puppet-strings/test/helpers'
import dedent from 'dedent'
import {
  openElectron,
  getTabs,
  findElement,
  closeBrowser
} from 'puppet-strings'

const test = withDirectory(ava)

test('opening an Electron application', async t => {
  const { directory } = t.context

  await writeFile(directory, 'package.json', '{}')

  await writeFile(
    directory,
    'index.js',
    `
    const { app, BrowserWindow } = require('electron')

    app.on('ready', () => {
      const window = new BrowserWindow({ width: 800, height: 600 })
      window.loadFile('index.html')
    })
    `
  )

  await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div>Hello World!</div>
    `
  )

  const electron = await openElectron(directory)
  const browserWindows = await getTabs(electron)

  t.is(browserWindows.length, 1)

  const div = await findElement(browserWindows[0], 'div')
  t.is(div.innerText, 'Hello World!')

  await closeBrowser(electron)
})

test('opening an Electron application in Docker', async t => {
  await run('yarn build-esm')
  const output = await runInContainer({
    image: 'vinsonchuong/javascript',
    mount: {
      [path.resolve('dist')]: '/root/puppet-strings'
    },
    command: [
      '/bin/bash',
      '-c',
      dedent`
        cd /root

        cat <<JS > index.js
        const { app, BrowserWindow } = require('electron')

        app.on('ready', () => {
          const window = new BrowserWindow({ width: 800, height: 600 })
          window.loadFile('index.html')
        })
        JS

        cat <<JS > index.html
        <!doctype html>
        <meta charset="utf-8">
        <div>Hello World!</div>
        JS

        cat <<JS > test.js
        const {
          openElectron,
          closeBrowser,
          getTabs,
          findElement
        } = require('puppet-strings')
        async function run() {
          const electron = await openElectron('.')
          const browserWindows = await getTabs(electron)
          const div = await findElement(browserWindows[0], 'div')
          console.log(div.innerText)
          await closeBrowser(electron)
        }
        run()
        JS

        yarn add ./puppet-strings electron &> /dev/null
        node test.js
        `
    ]
  })

  t.true(output.includes('Hello World!'))
})

test('notifying the user that Xvfb is required in Docker', async t => {
  await run('yarn build-esm')
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

        cat <<JS > index.js
        const { app, BrowserWindow } = require('electron')

        app.on('ready', () => {
          const window = new BrowserWindow({ width: 800, height: 600 })
          window.loadFile('index.html')
        })
        JS

        cat <<JS > index.html
        <!doctype html>
        <meta charset="utf-8">
        <div>Hello World!</div>
        JS

        cat <<JS > test.js
        const {
          openElectron,
          closeBrowser,
          getTabs,
          findElement
        } = require('puppet-strings')
        async function run() {
          await openElectron('.')
        }
        run()
        JS

        yarn add ./puppet-strings electron &> /dev/null
        node test.js
        `
    ]
  })

  t.true(
    output.includes('Xvfb is required for running Electron in this environment')
  )
})
