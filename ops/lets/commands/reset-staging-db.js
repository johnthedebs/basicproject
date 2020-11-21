const settings = require("../config/settings")
const executeRemote = require("../helpers/executeRemote")

const chalk = require("chalk")


module.exports = {
  args: [],
  description: "",
  run: (args, config) => {
    const {} = args
    const { servers, resetStagingDbCommands } = settings

    const server_address = servers["staging"]["web"]

    executeRemote(`${config.ssh_user}@${server_address}`, resetStagingDbCommands)
  },
}
