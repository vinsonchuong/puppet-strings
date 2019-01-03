# Interface
The three nouns provided by `puppet-strings` are [`Browser`](#browser-object),
[`Tab`](#tab-object), and [`Element`](#element-object).

## Adapter
In browsers, like Chrome and Electron (version 3 and newer), that support the
[Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/),
`puppet-strings` communicates with them through [Puppeteer](https://pptr.dev/).
The Chrome DevTools Protocol enables the automation of every feature in the
Chrome DevTools. It also enables each browser tab (or BrowserWindow in Electron)
to be automated concurrently.

Firefox, older versions of Electron, and other browsers support the older
[WebDriver](https://www.w3.org/TR/webdriver/) protocol. `puppet-strings`
communicates with these browsers through
[selenium-webriver](https://seleniumhq.github.io/selenium/docs/api/javascript/).
The WebDriver protocol is unable to automate DevTools features and only allows
one browser tab at a time to be automated.

Depending on the action used to create a [`Browser`](#browser-object), the
underlying adapter will vary. Puppeteer will be used whenever possible, falling
back to Selenium when necessary.

### Nouns

#### `Browser` (Object)
* Either:
  * `puppeteer` (Object)
    * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
* Or:
  * `selenium` (Object)
    * `webDriver` ([WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html))

#### `Tab` (Object)
* `console` (Array<Object>): An array of all console messages emitted by the
  tab
  * `type` (string)
  * `message` (string)
* `errors` (Array<string>): An array of all uncaught exceptions with stack
  traces
* Either:
  * `puppeteer` (Object)
    * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
    * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))
* Or:
  * `selenium` (Object)
    * `webDriver` ([WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html))

#### `Element` (Object)
* `attributes` (Map<string, string>)
* `innerText` (string)
* `outerHTML` (string)
* Either:
  * `puppeteer` (Object)
    * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
    * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))
    * `elementHandle` ([PuppeteerElementHandle](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-elementhandle))
* Or:
  * `selenium` (Object)
    * `webDriver` ([WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html))
    * `webElement` ([WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html))
