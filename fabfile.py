import fcntl
import os
import subprocess
import sys
import time

from fabric.api import task


commands = [
    "compass watch --relative-assets --sass-dir static_source/styles/ --css-dir static_files/css/ --images-dir static_files/img/ --javascripts-dir static_files/js/",
    "coffee -o static_files/js/ -w static_source/scripts/",
]

def nb_readline(output):
    fd = output.fileno()
    fl = fcntl.fcntl(fd, fcntl.F_GETFL)
    fcntl.fcntl(fd, fcntl.F_SETFL, fl | os.O_NONBLOCK)
    try:
        return output.readline()
    except:
        return ""

@task
def watch():
    """
    Watch coffee and sass files for changes
    """
    processes = []

    for command in commands:
        processes.append(subprocess.Popen(
            command,
            shell  = True,
            stdout = subprocess.PIPE,
            stderr = subprocess.STDOUT,
        ))

    line = ''.join([nb_readline(p.stdout) for p in processes])
    [p.stdout.flush() for p in processes]

    while any(processes):
        try:
            if line != "":
                sys.stdout.write(line)
            line = ''.join([nb_readline(p.stdout) for p in processes])
            [p.stdout.flush() for p in processes]
            time.sleep(0.1)
        except KeyboardInterrupt:
            break
    [p.wait() for p in processes]
