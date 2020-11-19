const fs = require("fs")

const prompts = require("../config/prompts")
const settings = require("../config/settings")
const execute = require("../helpers/execute")

const chalk = require("chalk")


module.exports = {
  args: [prompts["stage"]],
  description: "",
  run: (args, config) => {
    const {project, stage} = args
    const { deployScript } = settings

    const envVarsWhitelist = [
    ]

    let envVars = []
    envVarsWhitelist.forEach( (envVar) => {
      if (process.env[envVar]) {
        envVars.push(`${envVar}=${process.env[envVar]}`)
      }
    })

    if (fs.existsSync(deployScript)) {
      const command = `${envVars.join(" ")} node ${deployScript} ${stage}`
      execute(command)
    } else {
      console.error(chalk.red(`\nUnable to find deploy script at \`${deployScript}\`\n`))
    }
  },
}
