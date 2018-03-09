/* @flow */
import type { ChildProcess } from 'child_process'
import * as childProcess from 'child_process'
import { promisify } from 'util'
import psList from 'ps-list'

export const run = promisify(childProcess.exec)

export async function findProcess(childProcess: ChildProcess) {
  const runningProcesses = await psList()
  return runningProcesses.find(({ pid }) => pid === childProcess.pid)
}
