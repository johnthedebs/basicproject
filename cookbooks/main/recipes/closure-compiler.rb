script "Add Oracle Java PPA" do
    interpreter "bash"
    user "root"
    code <<-EOH
    add-apt-repository ppa:webupd8team/java
    aptitude update
    # Prevent java installer from asking about license
    echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
    echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
    EOH
    not_if "which java"
end

package "oracle-java7-installer"

script "Install Closure Compiler" do
    interpreter "bash"
    user "root"
    cwd "/tmp"
    code <<-EOH
    wget http://closure-compiler.googlecode.com/files/compiler-20130823.tar.gz
    tar xvfz compiler-20130823.tar.gz
    rm compiler-20130823.tar.gz
    mv compiler.jar /usr/bin
    EOH
    not_if "which compiler.jar"
end

file "/usr/bin/compiler.jar" do
    owner "root"
    group "root"
    mode 0755
    action :touch
end
