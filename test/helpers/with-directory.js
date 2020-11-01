import {createTemporaryDirectory, deleteFile} from './index.js'

export default function (test) {
  test.beforeEach(async (t) => {
    t.context.directory = await createTemporaryDirectory()
  })

  test.afterEach.always(async (t) => {
    if (t.context.directory) {
      await deleteFile(t.context.directory)
    }
  })
}
