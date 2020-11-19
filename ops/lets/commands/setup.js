const fs       = require("fs")
const chalk    = require("chalk")
const jsonfile = require("jsonfile")

const settings = require("../config/settings")
const ensureDirectoryExists = require("../helpers/ensureDirectoryExists")


const runSetup = (prompts, opsVarsPath) => {
  const inquire = require("../helpers/inquire")

  inquire(prompts, {}, (results) => {
    results.aws_region = "us-east-1"

    ensureDirectoryExists(opsVarsPath)
    jsonfile.writeFileSync(opsVarsPath, results, {spaces: 2})

    console.log(chalk.green(`Values successfully written to \`${opsVarsPath}\`!`))
  })
}


module.exports = {
  args: [],
  description: "",
  run: (args, config) => {
    const inquire = require("../helpers/inquire")
    const { opsVarsPath, setupPrompts } = settings

    if (fs.existsSync(opsVarsPath)) {
      inquire([
        {
          message : `A configuration file already exists at \`${opsVarsPath}\`.\nWould you like to continue and overwrite this file?`,
          type    : "confirm",
          name    : "overwrite_existing_config",
          default : false,
        },
      ], {}, (results) => {
        if (results.overwrite_existing_config) {
          runSetup(setupPrompts, opsVarsPath)
        }
      })
    } else {
      runSetup(setupPrompts, opsVarsPath)
    }
  },
}
