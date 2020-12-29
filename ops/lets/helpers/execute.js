/**
 * Executes a series of commands in sequence, followed by a callback
 * function. Streams I/O to/from child processes, dies gracefully,
 * and stops execution if any commands return a non-zero exit value.
 *
 * @param {string|string[]} commands - Command(s) to execute.
 * @param {function} [cb] - A function to run after all commands.
 */
const spawn = require("child_process").spawn
const chalk = require("chalk")

const execute = (commands, cb) => {
  if (Object.prototype.toString.call(commands) !== '[object Array]') {
    commands = [commands]
  }

  const nextCommand = () => {
    const newCommands = commands.slice(1)
    if (newCommands.length > 0) {
      execute(newCommands, cb)
    } else {
      if (cb) cb()
    }
  }

  if (!commands[0]) nextCommand()

  process.stdout.write(chalk.blue(`==> Executing command:\n`))
  process.stdout.write(chalk.green("$ "))
  process.stdout.write(chalk.yellow(`${commands[0]}\n`))

  let child = spawn("sh", ["-c", commands[0]], { stdio: "inherit" })

  // Catch ctrl-c and wait for children to clean up before exiting
  process.on("SIGINT", () => {
    child.on("close", (code) => {
      process.exit(1)
    })
  })

  child.on("close", (code) => {
    process.stdout.write("\n")
    process.removeAllListeners("SIGINT")
    if (code === 0) {
      nextCommand()
    } else {
      process.stderr.write(chalk.red(`Command:\n${commands[0]}\nexited with code: ${code}\n`))
      process.exit(1)
    }
  })
}


module.exports = execute
