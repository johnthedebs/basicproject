const fs   = require("fs")
const path = require("path")


function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}


module.exports = ensureDirectoryExistence
