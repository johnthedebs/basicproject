# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "precise32"
    config.vm.box_url = "http://files.vagrantup.com/precise32.box"
    config.vm.network :forwarded_port, guest: 80, host: 8080
    config.vm.synced_folder ".", "/var/www/basicproject/basicproject/"
    config.ssh.forward_agent = true

    # Create a private network, which allows host-only access to the machine
    # using a specific IP.
    # config.vm.network :private_network, ip: "192.168.33.10"

    # Create a public network, which generally matched to bridged network.
    # Bridged networks make the machine appear as another physical device on
    # your network.
    # config.vm.network :public_network

    config.vm.provider :virtualbox do |vb|
        vb.customize [
            "modifyvm", :id,
            "--name", "basicproject",
            "--memory", "512",
            "--nictype1", "Am79C973"
        ]
    end

    config.vm.provision :shell, :inline => "gem install chef --no-ri --no-rdoc"
    config.vm.provision :chef_solo do |chef|
        chef.cookbooks_path = "cookbooks"

        chef.add_recipe "build-essential::default"
        chef.add_recipe "main::default"
        #chef.add_recipe "main::security"
        chef.add_recipe "main::python"
        chef.add_recipe "main::nodejs"
        chef.add_recipe "main::compass"
        chef.add_recipe "main::supervisor"
        chef.add_recipe "main::postgresql"
        chef.add_recipe "main::nginx"
        chef.add_recipe "main::site-setup"

        chef.json = {
            "base_packages" => ["git-core", "bash-completion"],
            "users" => {
                "basicproject" => {
                    "id" => 1003,
                    "full_name" => "basicproject",
                    "key" => ""
                },
            },
            "groups" => {
                "www-pub" => {
                    "gid" => 1004,
                    "members" => ["root", "basicproject", "www-data", "vagrant"]
                }
            },
            "ubuntu_python_packages" => ["python-setuptools", "python-dev", "libpq-dev"],
            "pip_python_packages" => {
                    "virtualenv" => "1.9.1",
                    "virtualenvwrapper" => "4.0",
                    "pip" => "1.3.1",
                    "mercurial" => "2.6"
            },
        }
    end
end
