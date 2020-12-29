const { execSync } = require("child_process")

const execute = require("../helpers/execute")
const settings = require("../config/settings")

const chalk = require("chalk")


const logSuccess = () => {
  console.log(chalk.green("\nFinished generating release. No changes have been pushed to origin yet."))
  console.log(chalk.green("Review main and staging branches and tags, then push if they look good."))
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
    const { pushRelease } = settings

    const version_label = `v${version}`
    const commitMessage = `'Release ${version_label}'`

    const gitCommands = [
      "git checkout staging",
      "git fetch -p",
      "git pull --rebase=false",
      "git checkout main",
      "git pull --rebase=false",
      `git merge staging --no-ff -m "${commitMessage}"`,
      `git tag -f "${version_label}"`,
      pushRelease ? "git push" : null,
      pushRelease ? "git push --tags" : null,
      "git checkout staging",
      "git merge main",
      pushRelease ? "git push" : null,
    ]

    execute(gitCommands, pushRelease ? null : logSuccess)
  },
}
