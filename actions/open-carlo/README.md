# `openCarlo(carloApp)`
Instruments a running Carlo application

## Example
```js
import carlo from 'carlo'
import { openCarlo, findElement } from 'puppet-strings'

async function run() {
  const app = await carlo.launch()
  app.serveFolder('ui')

  const tab = openCarlo(app)
  const html = await findElement(tab, 'html')
  console.log(html.outerHTML)

  await app.exit()
}

run()
```

## Parameters
* `carloApp`: A reference to a Carlo application

## Returns
* `tab` ([Promise<Tab>](../../interface#tab-object)): A reference to the Carlo
  web view

## Details
`openCarlo` configures Carlo to run headlessly by calling
`carlo.enterTestMode()`. It then grabs a reference to the underlying instance
of Chrome and returns a "tab" object representing the open web view.
