# Interface
The three nouns provided by `puppet-strings` are [`Browser`](#browser-object),
[`Tab`](#tab-object), and [`Element`](#element-object).

## Adapter
`puppet-strings` communicates with browsers through
[Puppeteer](https://pptr.dev/) and the
[Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/),
which enable the automation of every feature in the Chrome DevTools. It also
enables each browser tab to be automated concurrently.

### Nouns

#### `Browser` (Object)
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))

#### `Tab` (Object)
* `console` (Array<Object>): An array of all console messages emitted by the
  tab
  * `type` (string)
  * `message` (string)
* `errors` (Array<string>): An array of all uncaught exceptions with stack
  traces
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
  * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))

#### `Element` (Object)
* `attributes` (Map<string, string>)
* `innerText` (string)
* `outerHTML` (string)
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
  * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))
  * `frame` ([PuppeteerFrame](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-frame))
  * `elementHandle` ([PuppeteerElementHandle](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-elementhandle))
