import test from 'ava'
import {withChrome, withDirectory, writeFile} from '../../test/helpers/index.js'
import {
  openTab,
  findElement,
  clickElement,
  evalInTab,
  waitForNavigation,
} from '../../index.js'

withChrome(test)
withDirectory(test)

test('waiting for a page load to complete', async (t) => {
  const {browser} = global
  const {directory} = t.context

  const indexPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <title>index.html</title>
    <a href="other.html">other.html</a>
    `,
  )

  await writeFile(
    directory,
    'other.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <title>other.html</title>
    `,
  )

  const tab = await openTab(browser, `file://${indexPath}`)

  const link = await findElement(tab, 'a', 'other.html')
  clickElement(link)
  await waitForNavigation(tab)

  t.is(await evalInTab(tab, [], 'return document.title'), 'other.html')
})
