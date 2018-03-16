# `Browser` (Object)
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))

# `Tab` (Object)
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
  * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))
  * `console` (Array<Object>): An array of all console messages emitted by the
    tab
    * `type` (string)
    * `message` (string)
  * `errors` (Array<string>): An array of all uncaught exceptions with stack
    traces

# `Element` (Object)
* `puppeteer` (Object)
  * `browser` ([PuppeteerBrowser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser))
  * `page` ([PuppeteerPage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page))
  * `elementHandle` ([PuppeteerElementHandle](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-elementhandle))
