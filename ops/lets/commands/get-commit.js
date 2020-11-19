const prompts = require("../config/prompts")
const ansibleRunPlaybook = require("../helpers/ansibleRunPlaybook")


module.exports = {
  args: [prompts["stage"], prompts["role"]],
  description: "",
  run: (args, config) => {
    args.playbook = "get-commit"
    ansibleRunPlaybook(args, config)
  },
}
