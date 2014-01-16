script "Install Compass/Sass" do
    interpreter "bash"
    user "root"
    code <<-EOH
    gem update --system --no-ri --no-rdoc
    gem install compass --version 1.0.0.alpha.17 --no-ri --no-rdoc
    gem install rb-inotify --no-ri --no-rdoc
    EOH
    not_if "compass --version | grep 1.0.0.alpha.17"
end
