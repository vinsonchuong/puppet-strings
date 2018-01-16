/* @flow */
import test from 'ava'
import { withBrowser, withDirectory, writeFile } from './helpers'
import { openTab, findElement } from 'puppet-strings'

withBrowser()
withDirectory()

async function getText({ puppeteer: { page, elementHandle } }) {
  return page.evaluate(
    elementHandle => elementHandle.textContent,
    elementHandle
  )
}

test('finding an element', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <p>Hello World!</p>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'p')
  t.is(await getText(element), 'Hello World!')
})

test('failing to find an element', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  await t.throws(findElement(tab, 'p'))
})

test('finding an element containing text', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <p>Hello World!</p>
    <p>Other Stuff</p>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'p', 'Other Stuff')
  t.is(await getText(element), 'Other Stuff')
})

test('failing to find an element containing text', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <p>Hello World!</p>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  await t.throws(findElement(tab, 'p', 'Other Stuff'))
})

test('waiting for an element to appear', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      setTimeout(() => {
        document.body.innerHTML = '<p>Hello World!</p>'
      }, 2000)
    </script>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'p')
  t.is(await getText(element), 'Hello World!')
})

test('failing to find an element after 5 seconds', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      setTimeout(() => {
        document.body.innerHTML = '<p>Hello World!</p>'
      }, 6000)
    </script>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  await t.throws(findElement(tab, 'p'))
})
