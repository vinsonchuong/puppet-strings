/* @flow */
import test from 'ava'
import greeting from 'puppet-strings'

test('is the correct string', t => {
  t.is(greeting, 'Hello World!')
})
