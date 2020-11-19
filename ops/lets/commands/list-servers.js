const settings = require("../config/settings")
const execute = require("../helpers/execute")

const chalk = require("chalk")


module.exports = {
  args: [],
  description: "",
  run: (args, config) => {
    const { servers } = settings

    let count = 0
    Object.keys(servers).forEach((stage, i) => {
      Object.keys(servers[stage]).forEach((role, j) => {
        let instance_info = [
          chalk.yellow(`${++count}.`),
          chalk.green(stage),
          chalk.blue(role),
          chalk.red(servers[stage][role]),
        ]

        console.log(instance_info.join(" "))
      })
    })
  },
}
