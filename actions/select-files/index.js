export default async function selectFiles(
  {puppeteer: {elementHandle}},
  ...filePaths
) {
  await elementHandle.uploadFile(...filePaths)
}
