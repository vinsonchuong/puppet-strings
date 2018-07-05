/* @flow */
import type { ChildProcess } from 'child_process'
import * as childProcess from 'child_process'
import { promisify } from 'util'
import psList from 'ps-list'

export const run = promisify(childProcess.exec)

export async function findProcess(arg: ChildProcess | number) {
  const pid = typeof arg === 'number' ? arg : arg.pid

  const runningProcesses = await psList()
  return runningProcesses.find(runningProcess => pid === runningProcess.pid)
}
