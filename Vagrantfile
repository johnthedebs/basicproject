# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.require_version ">= 1.9.0"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "bento/ubuntu-16.04"
    config.vm.network :forwarded_port, guest: 80, host: 8080
    config.vm.synced_folder ".", "/var/www/basicproject/basicproject/"
    config.ssh.forward_agent = true

    config.vm.provider :virtualbox do |vb|
        vb.customize [
            "modifyvm", :id,
            "--memory", "512"
        ]
    end

    config.vm.provision "ansible" do |ansible|
        ansible.playbook    = "ops/vagrant.yml"
        ansible.config_file = "ops/ansible.cfg"
        #ansible.verbose    = "vvvv"
    end
end
