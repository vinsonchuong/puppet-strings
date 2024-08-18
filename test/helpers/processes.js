import {promisify} from 'node:util'
import psList from 'ps-list'

const sleep = promisify(setTimeout)

export async function findProcess(argument) {
  const pid = typeof argument === 'number' ? argument : argument.pid

  const runningProcesses = await psList()
  return runningProcesses.find((runningProcess) => pid === runningProcess.pid)
}

export async function waitForProcess(argument, timeout) {
  const foundProcess = await findProcess(argument)
  if (foundProcess) {
    return foundProcess
  }

  if (timeout <= 0) {
    throw new Error('Timed out waiting for process')
  } else {
    await sleep(500)
    return waitForProcess(argument, timeout - 500)
  }
}
