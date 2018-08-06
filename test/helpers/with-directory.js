/* eslint-disable flowtype/no-weak-types */
/* @flow */
import type { TestInterface } from 'ava'
import { createTemporaryDirectory, deleteFile } from './'

export default function<Context: {}>(
  test: TestInterface<Context>
): TestInterface<{ ...$Exact<Context>, directory: string }> {
  const newTest: TestInterface<{
    ...$Exact<Context>,
    directory: string
  }> = (test: any)

  newTest.beforeEach(async t => {
    t.context.directory = await createTemporaryDirectory()
  })

  newTest.afterEach.always(async t => {
    if (t.context.directory) {
      await deleteFile(t.context.directory)
    }
  })

  return newTest
}
