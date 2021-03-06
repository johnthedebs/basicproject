const prompts = require("../config/prompts")
const settings = require("../config/settings")
const executeRemote = require("../helpers/executeRemote")


module.exports = {
  args: [prompts["stage"]],
  description: "",
  run: (args, config) => {
    const { stage } = args
    const { projectName, servers } = settings

    const server_address = servers[stage]["web"]
    backup_script = `/var/lib/postgresql/create_${projectName}_backup.py`
    const virtualenv_dir = `/var/www/envs/${projectName}/`
    const project_dir = `/var/www/${projectName}/${projectName}/`
    const manage_cmd = `${virtualenv_dir}bin/python ${project_dir}manage.py`

    const backup_database = `sudo runuser -l postgres -c "python ${backup_script}"`
    const update_repo = `cd ${project_dir} && git remote prune origin && git fetch -p && git pull`
    const update_settings = `cd ${project_dir} && rm -f local_settings.py && cp conf/production.py local_settings.py`
    const install_requirements = `${virtualenv_dir}bin/pip install -r ${project_dir}requirements.txt --exists-action=w`
    const run_migrations = `${manage_cmd} migrate --noinput`
    const collect_static = `${manage_cmd} collectstatic --noinput`
    const restart_app = "sudo service web reload; sudo service worker reload"

    const commands = [
      backup_database,
      update_repo,
      update_settings,
      install_requirements,
      run_migrations,
      collect_static,
      restart_app,
    ]

    executeRemote(`${config.ssh_user}@${server_address}`, commands)
  },
}
