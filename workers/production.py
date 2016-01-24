import multiprocessing

accesslog    = None
bind         = "127.0.0.1:8000"
errorlog     = "-"
group        = "www-pub"
loglevel     = "info"
workers      = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
