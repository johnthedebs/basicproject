# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.require_version ">= 1.9.0"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "bento/ubuntu-20.04"
    config.vm.network :forwarded_port, guest: 80, host: 8080
    config.vm.synced_folder ".", "/var/www/basicproject/basicproject/"
    config.ssh.forward_agent = true

    config.vm.provider :virtualbox do |vb|
        vb.memory = 1024
        vb.cpus = 2
        vb.customize [
            "guestproperty", "set", :id,
            "/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold", 10000
        ]
    end

    config.vm.provision "ansible" do |ansible|
        ansible.playbook    = "ops/vagrant.yml"
        ansible.config_file = "ops/ansible.cfg"
        ansible.extra_vars  = {
          deploy_user: "vagrant",
        }
        #ansible.verbose    = "vvvv"
        ansible.compatibility_mode = "2.0"
    end
end
