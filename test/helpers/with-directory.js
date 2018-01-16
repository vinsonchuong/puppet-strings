/* @flow */
import test from 'ava'
import { createTemporaryDirectory, deleteFile } from './'

export default function(): void {
  test.beforeEach(async t => {
    t.context.directory = await createTemporaryDirectory()
  })

  test.afterEach.always(async t => {
    await deleteFile(t.context.directory)
  })
}
