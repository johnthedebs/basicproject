#!/usr/bin/env python

from datetime   import datetime
from subprocess import  call


DB_NAME = "{{ site_name }}"

datestring = datetime.utcnow().strftime("%Y-%m-%dT%H-%M-%SZ")
OUTPUT  =  "/var/lib/postgresql/backups/{0}/{0}-{1}.gz".format(DB_NAME, datestring)


call("pg_dump {} | gzip > {}".format(DB_NAME, OUTPUT), shell=True)
