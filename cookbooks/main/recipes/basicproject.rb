package "libxml2"
package "libxml2-dev"
package "libjpeg62-dev"
package "libevent-dev"
package "checkinstall"
package "vim"
package "htop"
package "screen"

directory "/tmp/src/" do
    owner "root"
    group "root"
    mode 0777
end

directory "/var/www/basicproject/" do
    owner "www-data"
    group "www-pub"
    mode 0775
    recursive true
end

directory "/var/www/basicproject/logs/" do
    owner "www-data"
    group "www-pub"
    mode 0775
end

directory "/var/www/basicproject/emails/" do
    owner "www-data"
    group "www-pub"
    mode 0775
end

file "/var/www/basicproject/logs/access.log" do
    owner "www-data"
    group "www-pub"
    mode 0664
end

file "/var/www/basicproject/logs/error.log" do
    owner "www-data"
    group "www-pub"
    mode 0664
end

directory "/var/www/envs/" do
    owner "www-data"
    group "www-pub"
    mode 0775
end

directory "/var/www/basicproject/site_media/static/" do
    owner "www-data"
    group "www-pub"
    mode 0775
    recursive true
end

directory "/var/www/basicproject/site_media/media/" do
    owner "www-data"
    group "www-pub"
    mode 0775
end

cookbook_file "/home/vagrant/.bashrc" do
    source "bashrc"
    owner "vagrant"
    group "vagrant"
    mode 0755
end

script "Install Requirements" do
    interpreter "bash"
    user "vagrant"
    cwd "/var/www/basicproject/"
    code <<-EOH
    source /home/vagrant/.bashrc
    virtualenv /var/www/envs/basicproject
    /var/www/envs/basicproject/bin/pip install -r /var/www/basicproject/basicproject/requirements.txt
    EOH
end
