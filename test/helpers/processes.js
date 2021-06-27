import {promisify} from 'node:util'
import psList from 'ps-list'

const sleep = promisify(setTimeout)

export async function findProcess(arg) {
  const pid = typeof arg === 'number' ? arg : arg.pid

  const runningProcesses = await psList()
  return runningProcesses.find((runningProcess) => pid === runningProcess.pid)
}

export async function waitForProcess(arg, timeout) {
  const foundProcess = await findProcess(arg)
  if (foundProcess) {
    return foundProcess
  }

  if (timeout <= 0) {
    throw new Error('Timed out waiting for process')
  } else {
    await sleep(500)
    return waitForProcess(arg, timeout - 500)
  }
}
