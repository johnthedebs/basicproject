script "Install Nginx" do
    interpreter "bash"
    user "root"
    code <<-EOH
    add-apt-repository -y ppa:nginx/stable
    aptitude update
    EOH
    not_if "which nginx"
end

package "nginx"

service "nginx" do
    supports :status => true, :restart => true, :reload => true
    action [:enable, :start]
end

cookbook_file "/etc/nginx/sites-enabled/default" do
    action :delete
end

cookbook_file "/etc/nginx/nginx.conf" do
    source "nginx/nginx.conf"
    owner "root"
    group "root"
    mode 0644
    notifies :restart, resources(:service => "nginx"), :immediately
end
