package "ruby2.0"
package "ruby2.0-dev"

link "/usr/local/bin/gem" do
    to "/usr/bin/gem2.0"
end

script "Install Compass/Sass" do
    interpreter "bash"
    user "root"
    code <<-EOH
    gem install compass --version 1.0.0.alpha.21 --no-ri --no-rdoc
    gem install rb-inotify --no-ri --no-rdoc
    EOH
    not_if "compass --version | grep 1.0.0.alpha.21"
end
