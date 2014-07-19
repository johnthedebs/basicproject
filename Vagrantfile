# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :forwarded_port, guest: 80, host: 8080
    config.vm.synced_folder ".", "/var/www/basicproject/basicproject/"
    config.ssh.forward_agent = true

    config.vm.provider :virtualbox do |vb|
        vb.customize [
            "modifyvm", :id,
            "--name", "basicproject",
            "--memory", "512"
        ]
    end

    config.vm.provision :chef_solo do |chef|
        chef.cookbooks_path = "cookbooks"

        chef.add_recipe "main::default"
        chef.add_recipe "main::python"
        chef.add_recipe "main::nodejs"
        chef.add_recipe "main::compass"
        chef.add_recipe "main::supervisor"
        chef.add_recipe "main::postgresql"
        chef.add_recipe "main::redis"
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
            "ubuntu_python_packages" => ["python-setuptools", "python-dev", "software-properties-common"],
            "pip_python_packages" => {
                    "virtualenv" => "1.11.6",
                    "virtualenvwrapper" => "4.3",
                    "pip" => "1.5.6",
                    "pip-tools" => "0.3.4",
                    "mercurial" => "3.0.1"
            },
        }
    end
end
