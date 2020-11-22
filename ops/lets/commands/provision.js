const prompts = require("../config/prompts")
const settings = require("../config/settings")
const executeRemote = require("../helpers/executeRemote")


const ansibleRunFullPlaybook = (args, config) => {
  const { role, stage } = args
  const ansible_root = `${process.cwd()}/../`

  const ansible_variables = {
    aws_access_key : config.aws_access_key,
    aws_secret_key : config.aws_secret_key,
    deploy_user    : config.ssh_user,
    role           : role,
    stage          : stage,
  }
  let variables_string = ""
  Object.keys(ansible_variables).forEach((key) => {
    variables_string += ` -e '${key}=${ansible_variables[key]}'`
  })

  return [
    `ANSIBLE_CONFIG=${ansible_root}ansible.cfg`,
    "ansible-playbook",
    `-i ${ansible_root}${stage}`,
    `${ansible_root}site.yml`,
    variables_string,
  ].join(" ")
}


module.exports = {
  args: [prompts["stage"]],
  description: "",
  run: (args, config) => {
    args.role = "web"
    const { role, stage } = args
    const { projectName, servers } = settings

    const server_address = servers[stage][role]
    backup_script = `/var/lib/postgresql/create_${projectName}_backup.py`
    const virtualenv_dir = `/var/www/envs/${projectName}/`
    const project_dir = `/var/www/${projectName}/${projectName}/`
    const manage_cmd = `${virtualenv_dir}bin/python ${project_dir}manage.py`

    const backup_database = `sudo runuser -l postgres -c "python ${backup_script}"`
    const update_repo = `cd ${project_dir} && git remote prune origin && git fetch -p && git pull`
    const update_settings = `cd ${project_dir} && rm -f local_settings.py && cp conf/production.py local_settings.py`
    const collect_static = `${manage_cmd} collectstatic --noinput`
    const restart_app = "sudo service web reload; sudo service worker reload"

    const userAtHost = `${config.ssh_user}@${server_address}`


    executeRemote(userAtHost, [
      backup_database,
      update_repo,
      update_settings,
    ], () => {
      execute(ansibleRunFullPlaybook(), () => {
        executeRemote(userAtHost, [
          collect_static,
          restart_app,
        ])
      })
    })
  },
}
