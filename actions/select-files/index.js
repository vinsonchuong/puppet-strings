export default async function ({puppeteer: {elementHandle}}, ...filePaths) {
  await elementHandle.uploadFile(...filePaths)
}
