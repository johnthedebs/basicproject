Vagrant::Config.run do |config|
    config.vm.box = "lucid32"
    config.vm.box_url = "http://files.vagrantup.com/lucid32.box"
    config.vm.forward_port 80, 8080
    config.vm.share_folder "basicproject", "/var/www/basicproject/basicproject/", "."
    config.vm.customize [
        "modifyvm", :id,
        "--name", "basicproject",
        "--memory", "512",
        "--nictype1", "Am79C973"
    ]

    config.ssh.forward_agent = true

    config.vm.provision :chef_solo do |chef|
      chef.cookbooks_path = "cookbooks"

      chef.add_recipe "main::default"
      chef.add_recipe "main::python"
      chef.add_recipe "build-essential::default"
      chef.add_recipe "main::basicproject"
      chef.add_recipe "main::compass"
      chef.add_recipe "main::coffee"
      chef.add_recipe "main::supervisor"
      chef.add_recipe "main::nginx"
      chef.add_recipe "main::postgresql"

      chef.json = {
          "base_packages" => ["git-core", "bash-completion"],
          "users" => {
              "typeish" => {
                  "id" => 1003,
                  "full_name" => "type(ish)",
                  "key" => ""
              },
          },
          "groups" => {
              "www-pub" => {
                  "gid" => 1002,
                  "members" => ["root", "typeish", "www-data", "vagrant"]
              }
          },
          "ubuntu_python_packages" => ["python-setuptools", "python-dev", "libpq-dev"],
          "pip_python_packages" => {
              "virtualenv" => "1.7.1.2",
              "virtualenvwrapper" => "3.0.1",
              "mercurial" => "2.0.2"
          },
      }
    end
end
