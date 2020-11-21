const prompts = require("../config/prompts")
const settings = require("../config/settings")
const executeRemote = require("../helpers/executeRemote")

const chalk = require("chalk")


module.exports = {
  args: [prompts["stage"]],
  description: "",
  run: (args, config) => {
    const { stage } = args
    const { projectName, servers, resetStagingDbCommands } = settings

    const server_address = servers[stage]["web"]
    backup_script = `/var/lib/postgresql/create_${projectName}_backup.py`
    const command = `sudo runuser -l postgres -c "python ${backup_script}"`

    executeRemote(`${config.ssh_user}@${server_address}`, command)
  },
}
