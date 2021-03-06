module.exports = {
  "ssh"              : require("./commands/ssh"),
  "tail-logs"        : require("./commands/tail-logs"),
  "backup-database"  : require("./commands/backup-database"),
  "deploy"           : require("./commands/deploy"),
  "release"          : require("./commands/release"),
  "get-commit"       : require("./commands/get-commit"),
  "shell"            : require("./commands/shell"),
  "list-servers"     : require("./commands/list-servers"),
  "reset-staging-db" : require("./commands/reset-staging-db"),
  "provision"        : require("./commands/provision"),
  "setup"            : require("./commands/setup"),
}
