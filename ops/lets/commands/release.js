const { execSync } = require("child_process")

const execute = require("../helpers/execute")

const chalk = require("chalk")


const logSuccess = () => {
  console.log(chalk.green("\nFinished generating release. No changes have been pushed to origin yet."))
  console.log(chalk.green("Review master and develop branches and tags, then push if they look good."))
}


module.exports = {
  args: [{
    message : () => {
      let lastVersion
      try {
        lastVersion = execSync("git describe --abbrev=0 --tags").toString()
        lastVersion = lastVersion.trim().slice(1)
      } catch (e) {
        lastVersion = chalk.yellow("No version tag found!")
      }
      return `The last release was version: ${lastVersion}\nWhat version is this release?`
    },
    type    : "input",
    name    : "version",
  }],
  description: "",
  run: (args, config) => {
    const { version } = args

    const version_label = `v${version}`
    const commitMessage = `'Release ${version_label}'`

    const gitCommands = [
      "git checkout staging",
      "git fetch -p",
      "git pull --rebase=false",
      "git checkout master",
      "git pull --rebase=false",
      `git merge develop --no-ff -m "${commitMessage}"`,
      `git tag -f "${version_label}"`,
      "git checkout develop",
      "git merge master",
    ]

    execute(gitCommands, logSuccess)
  },
}
