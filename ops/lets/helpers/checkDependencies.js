const {exec} = require("child_process")

const chalk = require("chalk")


const cliDependencies = [
  "ansible",
]


const checkDependencies = (cb) => {
  exec(`which ${cliDependencies.join(" ")}`, {}, (error, stdout, stderr) => {
    const installedDependencies = stdout.trim().split("\n").map( (line) => {
      const lineParts = line.split("/")
      return lineParts[lineParts.length-1]
    })

    cliDependencies.forEach( (dependency) => {
      if (!installedDependencies.includes(dependency)) {
        console.log(chalk.red(`Warning: Dependency \`${dependency}\` not found!`))
        console.log(chalk.red("Some lets commands will not work without it.\n"))
      }
    })
  })
}


module.exports = checkDependencies
