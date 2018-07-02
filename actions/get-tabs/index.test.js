/* @flow */
import test from 'ava'
import {
  withBrowser,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab, getTabs, findElement } from 'puppet-strings'

withBrowser({ perTest: true })
withDirectory()

test('listing the currently open tabs', async t => {
  const { browser, directory } = t.context

  const onePath = await writeFile(
    directory,
    'one.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div>One</div>
    `
  )

  const twoPath = await writeFile(
    directory,
    'two.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div>Two</div>
    `
  )

  await openTab(browser, `file://${onePath}`)
  await openTab(browser, `file://${twoPath}`)

  const tabs = await getTabs(browser)
  t.is(tabs.length, 2)
  t.is((await findElement(tabs[0], 'div')).innerText, 'One')
  t.is((await findElement(tabs[1], 'div')).innerText, 'Two')
})
