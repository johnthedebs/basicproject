const execute = require("./execute")


const executeRemote = (userAtHost, commands, cb) => {
  if (Object.prototype.toString.call(commands) !== '[object Array]') {
    commands = [commands]
  }

  const ssh_opts = ["-A", "-t", "-q"].join(" ")

  const callRemoteCommands = (commands, i=0) => {
    if (i >= commands.length) return
    const command = `ssh ${ssh_opts} ${userAtHost} '${commands[i]}'`
    execute(command, () => {
      callRemoteCommands(commands, i+1)
    })
  }

  callRemoteCommands(commands)
}

module.exports = executeRemote
