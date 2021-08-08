import test from 'ava'
import {
  withDirectory,
  writeFile,
  withChromePath,
} from '../../test/helpers/index.js'
import {
  openBrowser,
  closeBrowser,
  openTab,
  getTabs,
  findElement,
} from '../../index.js'

withChromePath(test)
withDirectory(test)

test('listing the currently open tabs', async (t) => {
  const {directory} = t.context
  const browser = await openBrowser(global.chromePath)

  const onePath = await writeFile(
    directory,
    'one.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div>One</div>
    `,
  )

  const twoPath = await writeFile(
    directory,
    'two.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div>Two</div>
    `,
  )

  await openTab(browser, `file://${onePath}`)
  await openTab(browser, `file://${twoPath}`)

  const tabs = await getTabs(browser)
  t.is(tabs.length, 2)
  t.is((await findElement(tabs[0], 'div')).textContent, 'One')
  t.is((await findElement(tabs[1], 'div')).textContent, 'Two')

  await closeBrowser(browser)
})
