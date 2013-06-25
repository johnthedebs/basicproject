script "Install Compass/Sass" do
    interpreter "bash"
    user "root"
    code <<-EOH
    gem update --system 1.8.25 --no-ri --no-rdoc
    gem install compass --version 0.13.alpha.4 --no-ri --no-rdoc
    gem install rb-inotify --no-ri --no-rdoc
    EOH
    not_if "compass --version | grep 0.13.alpha.4"
end
