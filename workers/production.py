import multiprocessing

accesslog    = "/var/www/basicproject/logs/gunicorn-access.log"
bind         = "127.0.0.1:8000"
errorlog     = "/var/www/basicproject/logs/gunicorn-error.log"
group        = "www-pub"
loglevel     = "info"
workers      = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
