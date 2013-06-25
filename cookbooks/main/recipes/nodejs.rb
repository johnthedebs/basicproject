script "Add nodejs PPA" do
    interpreter "bash"
    user "root"
    code <<-EOH
    add-apt-repository ppa:chris-lea/node.js
    aptitude update
    EOH
    not_if "which node"
end

package "nodejs"

script "Install coffee-script" do
    interpreter "bash"
    user "root"
    code <<-EOH
    sudo npm install coffee-script -g
    EOH
    not_if "which coffee"
end
