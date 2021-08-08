import test from 'ava'
import {withChrome, withDirectory, writeFile} from '../../test/helpers/index.js'
import {openTab, resizeTab, evalInTab} from '../../index.js'

withChrome(test)
withDirectory(test)

test('resizing the viewport of a tab', async (t) => {
  const {browser} = global
  const {directory} = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    `,
  )

  const tab = await openTab(browser, `file://${filePath}`)

  await resizeTab(tab, 700, 800)
  t.deepEqual(
    await evalInTab(tab, [], 'return [window.innerWidth, window.innerHeight]'),
    [700, 800],
  )

  await resizeTab(tab, 900, 700)
  t.deepEqual(
    await evalInTab(tab, [], 'return [window.innerWidth, window.innerHeight]'),
    [900, 700],
  )
})
