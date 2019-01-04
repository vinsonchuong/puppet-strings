// @flow
import test from 'ava'
import carlo from 'carlo'
import { openCarlo, findElement } from 'puppet-strings'

test('instrumenting a Carlo app', async t => {
  const app = await carlo.launch()
  app.serveOrigin('http://example.com')
  app.load('/')

  const tab = await openCarlo(app)
  const body = await findElement(tab, 'body')
  t.true(body.innerText.includes('Example Domain'))
})
