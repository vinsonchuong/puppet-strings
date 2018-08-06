/* @flow */
import type { ChildProcess } from 'child_process'
import * as childProcess from 'child_process'
import { promisify } from 'util'
import psList from 'ps-list'

export const run = promisify(childProcess.exec)
const sleep = promisify(setTimeout)

export async function findProcess(arg: ChildProcess | number) {
  const pid = typeof arg === 'number' ? arg : arg.pid

  const runningProcesses = await psList()
  return runningProcesses.find(runningProcess => pid === runningProcess.pid)
}

export async function waitForProcess(
  arg: ChildProcess | number,
  timeout: number = 5000
) {
  const foundProcess = await findProcess(arg)
  if (foundProcess) {
    return foundProcess
  } else if (timeout <= 0) {
    throw new Error('Timed out waiting for process')
  } else {
    await sleep(500)
    return waitForProcess(arg, timeout - 500)
  }
}
