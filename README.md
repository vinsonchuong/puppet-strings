# puppet-strings
![npm](https://img.shields.io/npm/v/puppet-strings.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/puppet-strings.svg?branch=master)](https://travis-ci.org/vinsonchuong/puppet-strings)
[![dependencies Status](https://david-dm.org/vinsonchuong/puppet-strings/status.svg)](https://david-dm.org/vinsonchuong/puppet-strings)
[![devDependencies Status](https://david-dm.org/vinsonchuong/puppet-strings/dev-status.svg)](https://david-dm.org/vinsonchuong/puppet-strings?type=dev)

A better interface for common browser automation workflows

## Example
```js
import {
  openBrowser, closeBrowser, openTab, waitForNavigation,
  findElement, fillInElement, clickElement, evalInTab
} from 'puppet-strings'

async function run() {
  const browser = await openBrowser('chromium')
  const tab = await openTab(browser, 'https://google.com/ncr')

  const searchInput = await findElement(tab, '[name="q"]')
  await fillInElement(searchInput, 'Node.js')

  const searchButton = await findElement(tab, `input[value="I'm Feeling Lucky"]`)
  await clickElement(searchButton)
  await waitForNavigation(tab)

  const title = await evalInTab(tab, [], 'return document.title')
  console.log(title)

  await closeBrowser(browser)
}

run()
```

## Usage

### Installation

#### npm Package
Install [puppet-strings](https://yarnpkg.com/en/package/puppet-strings)
by running

```sh
yarn add puppet-strings
```

Or, if [`yarn`](https://yarnpkg.com/en/) is not installed, run

```sh
npm install --save puppet-strings
```

#### Locally Installed Browsers
`puppet-strings` works with locally installed recent stable versions of Google
Chrome, Chromium, and Electron on Linux, Docker, OSX, and Windows.

We also maintain
[`vinsonchuong/javascript`](https://hub.docker.com/r/vinsonchuong/javascript/),
a Docker image that includes the latest `Current` version of Node.js and Chrome
(as `google-chrome`)

### API
`puppet-strings` provides an [interface](interface) consisting of three nouns
(browser, tab, and element) and actions that take one of them as first argument.
Each action returns a promise that is resolved when the action is finished.

Here are the actions `puppet-strings` provides:

#### [`Browser`](interface#browser-object)
* [`openBrowser`](actions/open-browser): Open a locally installed browser
* [`closeBrowser`](actions/close-browser): Closes a browser

#### [`Tab`](interface#tab-object)
* [`getTabs`](actions/get-tabs): Gets the list of currently open tabs
* [`openTab`](actions/open-tab): Opens a url in a new tab and waits for it to
  fully load
* [`closeTab`](actions/close-tab): Closes a tab
* [`resizeTab`](actions/resize-tab): Changes the size of the viewport of a tab
* [`navigate`](actions/navigate): Navigates a tab to a new URL
* [`waitForNavigation`](actions/wait-for-navigation): Waits for a page load to complete
* [`evalInTab`](actions/eval-in-tab): Evaluates code within a tab and returns the result
* [`findElement`](actions/find-element): Find a DOM element on the page by CSS selector

#### [`Element`](interface#element-object)
* [`clickElement`](actions/click-element): Click on an element
* [`fillInElement`](actions/fill-in-element): Type text into an element
* [`selectFiles`](actions/select-files): Select files for a file input element

### Extension
`puppet-strings` is designed to be open for extension but closed for
modification.

You can create new actions that take a [`Browser`](interface#browser-object),
[`Tab`](interface#tab-object), or [`Element`](interface#element-object) as
argument. Your new actions can reuse other actions and interact directly with
the underlying Puppeteer objects.

If your project needs to modify an action provided by `puppet-strings`, you can
duplicate that action and maintain your modifications as part of your project.

#### Published Extensions
* [`openChrome()`](https://github.com/vinsonchuong/puppet-strings-chrome): Find
  or download a suitable version of Chrome for use with puppet-strings
* [`openApp()`](https://github.com/vinsonchuong/puppet-strings-open-app):
  Compile and open a web application in Chrome
