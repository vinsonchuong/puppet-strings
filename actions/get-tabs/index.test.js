/* @flow */
import test from 'ava'
import { withDirectory, writeFile } from 'puppet-strings/test/helpers'
import {
  openChrome,
  openFirefox,
  closeBrowser,
  openTab,
  getTabs,
  findElement
} from 'puppet-strings'

withDirectory()

test('listing the currently open tabs for a Puppeteer browser', async t => {
  const { directory } = t.context
  const browser = await openChrome()

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

  await closeBrowser(browser)
})

test('listing the current tab for a Selenium browser', async t => {
  const browser = await openFirefox()
  const tabs = await getTabs(browser)

  t.is(tabs.length, 1)

  await closeBrowser(browser)
})
