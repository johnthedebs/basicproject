basicproject
============

This is a Django skeleton project with a ton of other stuff included. I
created it mostly for my personal use, but it's open source in the hope
that other people will get something out of it as well.


New Deploy Checklist
--------------------

* Set SECRET_KEY in settings.py
* Set host and user in fabfile
* Rename ops/host_vars/basicproject
    * Set hostname, user, ansile_ssh_host, and ansible_ssh_user
    * Change ops/production to reflect host_vars file name
* Set hostname, site_name, site_path in group_vars
* Set remote_user in ops/site.yml
* In conf/production.py
    * Set ALLOWED_HOSTS, ADMINS, RAVEN_CONFIG dsn
