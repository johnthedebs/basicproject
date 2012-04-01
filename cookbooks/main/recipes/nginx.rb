package "libpcre3"
package "libpcre3-dev"
package "libpcrecpp0"
package "libssl-dev"
package "zlib1g-dev"

directory "/etc/nginx/conf.d/" do
    owner "root"
    group "root"
    mode 0755
    recursive true
end

directory "/etc/nginx/sites-enabled/" do
    owner "root"
    group "root"
    mode 0755
end

directory "/etc/nginx/sites-available/" do
    owner "root"
    group "root"
    mode 0755
end

directory "/var/log/nginx/" do
    owner "root"
    group "root"
    mode 0755
end

script "Install Nginx" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    git clone https://github.com/yaoweibin/nginx_tcp_proxy_module.git
    wget http://nginx.org/download/nginx-1.0.12.tar.gz
    tar xf nginx-1.0.12.tar.gz
    cd nginx-1.0.12
    patch -p1 < ../nginx_tcp_proxy_module/tcp.patch
    ./configure \
      --prefix=/usr/local \
      --conf-path=/etc/nginx/nginx.conf \
      --http-log-path=/var/log/nginx/access.log \
      --error-log-path=/var/log/nginx/error.log \
      --pid-path=/var/run/nginx.pid \
      --lock-path=/var/lock/nginx.lock \
      --http-client-body-temp-path=/var/tmp/nginx/client \
      --http-proxy-temp-path=/var/tmp/nginx/proxy \
      --http-fastcgi-temp-path=/var/tmp/nginx/fastcgi \
      --with-http_ssl_module \
      --with-http_gzip_static_module \
      --with-http_realip_module \
      --add-module=../nginx_tcp_proxy_module && make && make install
    EOH
    not_if "which nginx"
end

cookbook_file "/etc/init.d/nginx" do
    source "nginx/init.d/nginx"
    owner "root"
    group "root"
    mode 0755
end

cookbook_file "/etc/nginx/nginx.conf" do
    source "nginx/nginx.conf"
    owner "root"
    group "root"
    mode 0640
end

cookbook_file "/etc/nginx/sites-available/default" do
    source "nginx/sites-available/default"
    owner "root"
    group "root"
    mode 0640
end

service "nginx" do
    supports :status => true, :restart => true, :reload => true
    action [:enable, :start]
end
