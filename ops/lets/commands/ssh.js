const prompts = require("../config/prompts")
const settings = require("../config/settings")
const execute = require("../helpers/execute")

const chalk = require("chalk")


module.exports = {
  args: [prompts["stage"], prompts["role"]],
  description: "SSH into a server",
  run: (args, config) => {
    const { role, stage } = args
    const server_address = settings.servers[stage][role]
    const ssh_opts = [
      "-A",
    ].join(" ")
    const command = `ssh ${ssh_opts} ${config.ssh_user}@${server_address}`

    const msg = `Connecting to ${stage} ${role}`
    const endmsg = `Disconnected from ${stage} ${role}`

    console.log(chalk.green(msg))
    console.log("")

    execute(command, () => {
      console.log(chalk.green(endmsg))
    })
  },
}
