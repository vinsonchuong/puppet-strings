/* @flow */
import test from 'ava'
import {
  withBrowser,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { getTabs, navigate, evalInTab } from 'puppet-strings'

withDirectory()
withBrowser({ perTest: true, type: 'firefox' })

test('executing code within the browser', async t => {
  const { browser, directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div id="root">Hello World!</div>
    `
  )
  const [tab] = await getTabs(browser)
  await navigate(tab, `file://${filePath}`)

  const text = await evalInTab(
    tab,
    ['#root'],
    `
    const [selector] = arguments
    return document.querySelector(selector).textContent
    `
  )
  t.is(text, 'Hello World!')
})

test('propagating error messages', async t => {
  const { browser, directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div id="root">Hello World!</div>
    `
  )
  const [tab] = await getTabs(browser)
  await navigate(tab, `file://${filePath}`)

  await t.throws(
    evalInTab(tab, [], 'throw new Error("Error Message")'),
    /Error: Error Message/
  )
})