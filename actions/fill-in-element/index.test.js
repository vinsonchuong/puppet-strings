import test from 'ava'
import {withChrome, withDirectory, writeFile} from '../../test/helpers/index.js'
import {openTab, findElement, fillInElement} from '../../index.js'

withChrome(test)
withDirectory(test)

test('filling in an element', async (t) => {
  const {browser} = global
  const {directory} = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <span id="statusText"></span>
    <input onChange="statusText.textContent = this.value">
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'input')
  await fillInElement(element, 'Hello')

  t.is((await findElement(tab, 'span')).textContent, 'Hello')
})

test('filling in an element in an iframe', async (t) => {
  const {browser} = global
  const {directory} = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <iframe src="frame.html"></iframe>
  `
  )

  await writeFile(
    directory,
    'frame.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <span id="statusText"></span>
    <input onChange="statusText.textContent = this.value">
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'input')
  await fillInElement(element, 'Hello')

  t.is((await findElement(tab, 'span')).textContent, 'Hello')
})
