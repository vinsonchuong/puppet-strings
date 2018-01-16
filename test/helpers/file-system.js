/* @flow */
import * as path from 'path'
import tempy from 'tempy'
import { ensureDir, outputFile, remove } from 'fs-extra'

export async function createTemporaryDirectory(): Promise<string> {
  const directoryPath = tempy.directory()
  await ensureDir(directoryPath)
  return directoryPath
}

export async function deleteFile(filePath: string): Promise<void> {
  await remove(filePath)
}

export async function writeFile(
  directoryPath: string,
  fileName: string,
  fileContents: string
): Promise<string> {
  const filePath = path.join(directoryPath, fileName)
  await outputFile(filePath, fileContents)
  return filePath
}
