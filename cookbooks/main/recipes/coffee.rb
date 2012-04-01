script "Install Node" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    # Node
    git clone https://github.com/joyent/node.git
    cd node
    git checkout v0.6.12
    ./configure --prefix=/usr/local
    make install
    EOH
    not_if "which node"
end

script "Install NPM" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    git clone git://github.com/isaacs/npm.git
    cd npm
    git checkout v1.1.4
    git submodule update --init --recursive
    make install
    EOH
    not_if "which npm"
end

script "Install CoffeeScript" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    npm install -g coffee-script
    EOH
    not_if "which coffee"
end
