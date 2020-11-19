const execute = require("./execute")


module.exports = (args, config) => {
  if (!args.role) {
    args.role = "web"
  }
  const { role, stage } = args

  const ansible_variables = {
    aws_access_key : config.aws_access_key,
    aws_secret_key : config.aws_secret_key,
    ssh_user       : config.ssh_user,
    role           : role,
    stage          : stage,
  }

  let variables_string = ""
  Object.keys(ansible_variables).forEach((key) => {
    variables_string += ` -e '${key}=${ansible_variables[key]}'`
  })

  const command = [
    `ANSIBLE_CONFIG=${__dirname}/../config/ansible.cfg`,
    "ansible-playbook -v",
    `-i ${process.cwd()}/../${stage}`,
    `${__dirname}/../playbooks/${args.playbook}.yml`,
    variables_string,
  ].join(" ")


  // Be careful about running in production
  if (stage === "production") {
    const readline = require("readline")
    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.question(`Execute '${role}' '${command}' to production? yes/[no]: `, (answer) => {
      rl.close()
      if (answer !== "yes") {
        process.exit(1)
      } else {
        execute(command)
      }
    })
  } else {
    execute(command)
  }
}
