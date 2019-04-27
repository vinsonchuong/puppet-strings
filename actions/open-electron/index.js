/* @flow */
import type { Browser } from 'puppet-strings'
import * as path from 'path'
import * as childProcess from 'child_process'
import { promisify } from 'util'
import puppeteer from 'puppeteer'

const defaultFlags = [
  // Disabling the process sandbox makes it easier to run in Linux
  // environments
  '--no-sandbox',
  '--disable-setuid-sandbox',
]

export default async function(
  applicationPath: string,
  options: { flags?: Array<string> } = {}
): Promise<Browser> {
  const needsXvfb =
    process.platform !== 'win32' &&
    process.platform !== 'darwin' &&
    !process.env.DISPLAY

  if (needsXvfb && !(await commandExists('xvfb-run'))) {
    throw new Error('Xvfb is required for running Electron in this environment')
  }

  const executablePath = needsXvfb
    ? path.resolve(__dirname, 'xvfb-electron')
    : path.resolve('node_modules', '.bin', 'electron')

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    ignoreDefaultArgs: [
      '--enable-features=NetworkService,NetworkServiceInProcess'
    ],
    args: [
      ...(options.flags || []),
      ...defaultFlags,
      applicationPath
    ]
  })

  return {
    puppeteer: { browser }
  }
}

const exec = promisify(childProcess.exec)
async function commandExists(command: string): Promise<boolean> {
  try {
    await exec(`which ${command}`)
    return true
  } catch (error) {
    return false
  }
}
