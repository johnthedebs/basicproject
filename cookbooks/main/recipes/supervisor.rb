cookbook_file "/etc/init.d/supervisord" do
    source "supervisor/init.d/supervisord"
    owner "root"
    group "root"
    mode 0755
end

script "Install supervisor" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    pip install supervisor cElementTree
    #update-rc.d supervisord defaults
    EOH
    not_if "which supervisorctl"
end

cookbook_file "/etc/supervisord.conf" do
    source "supervisor/supervisord_vagrant.conf"
    owner "root"
    group "root"
    mode 0644
end

directory "/etc/supervisor/" do
    owner "root"
    group "root"
    mode 0755
end

cookbook_file "/etc/supervisor/gunicorn.conf" do
    source "supervisor/gunicorn_vagrant.conf"
    owner "root"
    group "root"
    mode 0644
end

service "supervisord" do
    supports :status => true, :restart => true, :reload => true
    action [:enable, :start]
end
