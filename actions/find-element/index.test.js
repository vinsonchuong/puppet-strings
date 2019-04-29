/* @flow */
import ava from 'ava'
import {
  withChrome,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab, findElement } from 'puppet-strings'

withChrome()
const test = withDirectory(ava)

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
  t.is(element.innerText, 'Hello World!')
})

test('finding an invisible element', async t => {
  const { browser } = global
  const { directory } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <style>
      p {
        display: none;
      }
    </style>
    <p>Hello World!</p>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'p')
  t.true(element !== null)
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
  await t.throwsAsync(findElement(tab, 'p'), 'Could not find element')
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
  t.is(element.innerText, 'Other Stuff')
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
  await t.throwsAsync(
    findElement(tab, 'p', 'Other Stuff'),
    'Could not find element'
  )
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
  t.is(element.innerText, 'Hello World!')
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
      }, 10000)
    </script>
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  await t.throwsAsync(findElement(tab, 'p'), 'Could not find element')
})
