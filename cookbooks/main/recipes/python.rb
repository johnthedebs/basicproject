#
# Bootstrapping a modern Python ecosystem
#

node[:ubuntu_python_packages].each do |pkg|
    package pkg do
        :upgrade
    end
end

script "Install pip" do
    interpreter "bash"
    user "root"
    code <<-EOH
    easy_install pip
    EOH
    not_if "which pip"
end

# System-wide packages installed by pip.
# Careful here: most Python stuff should be in a virtualenv.

node[:pip_python_packages].each_pair do |pkg, version|
    execute "install-#{pkg}" do
        command "pip install -U -i http://crate.io/s/ #{pkg}==#{version}"
        not_if "[ `pip freeze | grep #{pkg} | cut -d'=' -f3` = '#{version}' ]"
    end
end
