script "Add redis-server PPA" do
    interpreter "bash"
    user "root"
    code <<-EOH
    add-apt-repository ppa:chris-lea/redis-server
    aptitude update
    EOH
    not_if "which redis-server"
end

package "redis-server"

service "redis-server" do
    supports :status => true, :restart => true, :reload => true
    action [:enable, :start]
end
