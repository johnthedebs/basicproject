import os

from fabric.api import (
    cd,
    env,
    execute,
    local,
    run,
    sudo,
    task,
)
from fabric.colors          import green, red
from fabric.contrib.console import confirm
from fabric.contrib.files   import exists, append
from fabric.operations      import get


env.host           = ""
env.hosts          = [env.host]
env.user           = "deploy"
env.password       = ""
env.repo_url       = "git@github.com:johnthedebs/basicproject.git"
env.project_id     = "basicproject"
env.project_dir    = "/var/www/{project_id}/{project_id}/".format(**env)
env.site_dir       = "/var/www/{project_id}/".format(**env)
env.virtualenv_dir = "/var/www/envs/{project_id}/".format(**env)
env.ansible_config = "{}/ops/ansible.cfg".format(os.path.dirname(__file__))
env.forward_agent  = True

GITHUB_HOST_KEY = "github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ=="


#
# Tasks
#

@task
def backup_database():
    """
    Run database backup script
    """
    with cd("/var/lib/postgresql"):
        sudo("./create_{project_id}_backup.py".format(**env), user="postgres")


@task
def collect_static():
    """
    Collect static files
    """
    _manage("collectstatic --noinput")


@task
def deploy():
    """
    Run all deploy tasks
    """
    execute(backup_database)
    execute(update_repo)
    execute(install_requirements)
    execute(run_migrations)
    execute(collect_static)
    execute(restart_app)


@task
def db_to_local():
    """
    This task needs to be run from within the Vagrant VM!...
    after the DB has been deleted and recreated with as little data as
    possible. Usually, this means doing the following:

        sudo su postgres
        dropdb <db_name> && createdb <db_name>
    """
    local_db_name      = env.project_id
    local_db_user      = env.project_id
    local_db_password  = env.project_id
    remote_db_name     = env.project_id
    remote_db_user     = env.project_id
    remote_db_password = env.project_id

    ask = confirm(red("""
Are you sure you want to overwrite your local database "{}"
with database "{}" from host "{}"?""".format(
        local_db_name,
        remote_db_name,
        env.hosts[0],
    )), default=False)

    if ask:
        run("pg_dump --user %s %s | gzip > /tmp/%s.sql.gz" % (
            remote_db_user,
            remote_db_name,
            remote_db_name
        ))
        # TODO: Add some safeguards against running this outside vagrant
        # TODO: Clear and recreate an empty DB
        get("/tmp/%s.sql.gz" % remote_db_name, "/tmp/%s.sql.gz" % remote_db_name)
        local("gunzip < /tmp/%s.sql.gz | psql --user %s -d %s" % (
            local_db_name,
            local_db_user,
            local_db_name
        ), capture=False)


@task
def install_requirements():
    """
    Install the project's python requirements
    """
    run("%(virtualenv_dir)sbin/pip install -r %(project_dir)srequirements.txt --exists-action=w" % env)


@task
def manage(command):
    """
    Run an arbitrary management command (eg, `fab manage:run_migrations`)
    """
    _manage(command)


#@task
#def media_to_local():
    #get("%(site_dir)s/site_media/media/*" % env, "%(site_dir)s/site_media/media/" % env)


@task
def ping():
    """
    Test connection
    """
    run("echo 'pong'")


@task
def provision():
    """
    Update, provision, and deploy the site
    """
    execute(backup_database)
    execute(update_repo)
    local("ANSIBLE_CONFIG={ansible_config} ansible-playbook ops/site.yml -i ops/production".format(**env))
    execute(collect_static)
    execute(restart_app)


@task
def rebuild_index():
    """
    Rebuild the search index
    """
    _manage("rebuild_index --noinput")


@task
def restart_app():
    """
    Restart the web app gracefully
    """
    sudo("reload web".format(**env))


@task
def run_migrations():
    """
    Run database migrations
    """
    _manage("migrate --noinput")


@task
def ssh():
    """
    SSH into the remote dev machine
    """
    try:
        # catch the port number to pass to ssh
        host, port = env.host_string.split(":")
        local("ssh -p %s -A %s@%s" % (port, env.user, host))
    except ValueError:
        local("ssh -A %s@%s" % (env.user, env.host))


@task
def update_packages():
    """
    Update system level packages
    """
    sudo("apt-get update && apt-get upgrade")


@task
def update_repo():
    """
    Bring the remote repo up to date
    """
    if not exists(env.project_dir):
        with cd("/"):
            sudo("mkdir -p {site_dir}".format(**env))
            sudo("chown -R {user}:{user} {site_dir}".format(**env))
            sudo("apt-get update")
            sudo("apt-get install -y git-core")

        with cd(env.site_dir):
            append("/home/{user}/.ssh/known_hosts".format(**env), GITHUB_HOST_KEY)
            run("git clone {repo_url}".format(**env))

    with cd(env.project_dir):
        run("git remote prune origin && git fetch -p && git pull")
        run("rm -f local_settings.py && cp conf/production.py local_settings.py")


#
# Helpers
#

def _manage(command):
    """
    Make it easy for tasks to call django management commands.
    """
    run("%sbin/python %smanage.py %s" % (
        env.virtualenv_dir,
        env.project_dir,
        command,
    ))
