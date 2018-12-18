# puppet-strings
![npm](https://img.shields.io/npm/v/puppet-strings.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/puppet-strings.svg?branch=master)](https://travis-ci.org/vinsonchuong/puppet-strings)
[![NSP Status](https://nodesecurity.io/orgs/vinsonchuong/projects/4f857d37-b9cf-4c54-a335-b8a2b1c1157f/badge)](https://nodesecurity.io/orgs/vinsonchuong/projects/4f857d37-b9cf-4c54-a335-b8a2b1c1157f)
[![dependencies Status](https://david-dm.org/vinsonchuong/puppet-strings/status.svg)](https://david-dm.org/vinsonchuong/puppet-strings)
[![devDependencies Status](https://david-dm.org/vinsonchuong/puppet-strings/dev-status.svg)](https://david-dm.org/vinsonchuong/puppet-strings?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c6c8bbe130e1e1dc161/maintainability)](https://codeclimate.com/github/vinsonchuong/puppet-strings/maintainability)

A better interface for common browser automation workflows

## Example
```js
import {
  openChrome, closeBrowser, openTab, waitForNavigation,
  findElement, fillInElement, clickElement, evalInTab
} from 'puppet-strings'

async function run() {
  const browser = await openChrome()
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

#### Supported Versions of Node.js
`puppet-strings` is only tested against the latest `Current` and `LTS` versions
of [Node.js](https://nodejs.org/en/).

Please ensure that your Node.js installation is up-to-date, and, if necessary,
[upgrade your installation](https://nodejs.org/en/download/package-manager/).

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

During installation, a recent version of Chromium will be downloaded and stored
locally.

On Windows and Mac, `puppet-strings` should work out of the box.

#### Running In a Docker Container
Chrome statically depends on many GUI-related system libraries. So, even if you
only run it in headless mode, those libraries still need to be installed.
Windows and Mac environments have all of these libraries available by default.
However, because Docker containers are meant be used from command line scripts,
they will typically not include any of these libraries.

We maintain [`splayd/javascript`](https://hub.docker.com/r/splayd/javascript/),
a Docker image that includes the latest `Current` version of Node.js and all of
the libraries needed to run Chrome.

If you need to maintain a custom Dockerfile for your project, see our 
[Dockerfile](https://github.com/splayd/docker/blob/master/images/javascript/Dockerfile)
for clues on how to install the needed GUI libraries.

### API
`puppet-strings` provides an [interface](interface) consisting of three nouns
(browser, tab, and element) and actions that take one of them as first argument.
Each action returns a promise that is resolved when the action is finished.

Here are the actions `puppet-strings` provides:

#### [`Browser`](interface#browser-object)
* [`openChrome`](actions/open-chrome): Starts a new instance of Chrome
* [`openElectron`](actions/open-electron): Starts an Electron application
* [`openFirefox`](actions/open-firefox): Starts a new instance of Firefox
* [`closeBrowser`](actions/close-browser): Closes a browser

#### [`Tab`](interface#tab-object)
* [`getTabs`](actions/get-tabs): Gets the list of currently open tabs
* [`openTab`](actions/open-tab): Opens a url in a new tab and waits for it to
  fully load
* [`closeTab`](actions/close-tab): Closes a tab
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
