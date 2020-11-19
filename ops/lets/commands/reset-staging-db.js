const settings = require("../config/settings")
const execute = require("../helpers/execute")

const chalk = require("chalk")


module.exports = {
  args: [],
  description: "",
  run: (args, config) => {
    const {} = args
    const { servers, resetStagingDbCommands } = settings
    const stage = "staging"
    const role = "web"

    const server_address = servers[stage][role]

    const ssh_opts = ["-A", "-t", "-q"].join(" ")

    const callRemoteCommands = (remoteCommands, i=0) => {
      if (i >= remoteCommands.length) return

      const command = `ssh ${ssh_opts} ${config.ssh_user}@${server_address} '${remoteCommands[i]}'`

      const msg = `Executing \`${remoteCommands[i]}\` on ${stage} ${role}`

      execute(command, () => {
        callRemoteCommands(remoteCommands, i+1)
      })
    }

    callRemoteCommands(resetStagingDbCommands)
  },
}
