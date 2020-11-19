const prompts = require("../config/prompts")
const settings = require("../config/settings")

const spawn = require("child_process").spawn
const chalk = require("chalk")


module.exports = {
  args: [prompts["stage"], prompts["role"]],
  description: "",
  run: (args, config) => {
    const {role, stage} = args
    const { tailLogCommands, servers } = settings

    const server_address = servers[stage][role]
    const ssh_opts = [
      "-A",
    ].join(" ")

    const hosts = [{name: `${stage}-${role}`, address: server_address}]

    hosts.forEach((host, i) => {
      const hostLabel = `${chalk.blue(host.name)}`
      const command = `ssh ${ssh_opts} ${config.ssh_user}@${host.address} '${tailLogCommands[role]}'`
      const child = spawn("sh", ["-c", command])

      child.stdout.on("data", (data) => {
        process.stdout.write(`\n${hostLabel}\n${data}`)
      })

      child.stderr.on("data", (data) => {
        process.stdout.write(`\n${hostLabel}\n${data}`)
      })
    })
  },
}
