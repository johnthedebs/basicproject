#
# PostgreSQL and PostGIS Setup
#
script "Add updated postgresql repositories" do
    interpreter "bash"
    user "root"
    cwd "/tmp/"
    code <<-EOH
    apt-get install -y python-software-properties
    add-apt-repository ppa:ubuntugis/ubuntugis-unstable
    add-apt-repository ppa:pitti/postgresql
    add-apt-repository ppa:pi-deb/gis
    apt-get update
    EOH
end

package "postgresql-9.0"
package "postgresql-9.0-postgis"
package "postgresql-server-dev-9.0"
package "postgresql-contrib-9.0"
package "proj"
package "libgeos-3.2.2"
package "libgeos-c1"
package "libgeos-dev"
package "libgdal1-1.8.0"
package "libgdal1-dev"

service "postgresql" do
    enabled true
    running true
    supports :status => true, :restart => true, :reload => true
    action [:start, :enable]
end

cookbook_file "/var/lib/postgresql/.bashrc" do
    source "postgresql/bashrc_postgres"
    owner "postgres"
    group "postgres"
    mode 0644
end

cookbook_file "/var/lib/postgresql/.bash_profile" do
    source "postgresql/bash_profile_postgres"
    owner "postgres"
    group "postgres"
    mode 0644
end

cookbook_file "/etc/postgresql/9.0/main/postgresql.conf" do
    source "postgresql/postgresql_default.conf"
    owner "postgres"
    group "postgres"
    mode 0644
    notifies :restart, resources(:service => "postgresql")
end

cookbook_file "/etc/postgresql/9.0/main/pg_hba.conf" do
    source "postgresql/pg_hba.conf"
    owner "postgres"
    group "postgres"
    mode 0644
    notifies :restart, resources(:service => "postgresql")
end

script "Create and setup template_postgis database" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code <<-EOH
    createdb template_postgis
    psql -q -d template_postgis -f /usr/share/postgresql/9.0/contrib/postgis-1.5/postgis.sql
    psql -q -d template_postgis -f /usr/share/postgresql/9.0/contrib/postgis-1.5/spatial_ref_sys.sql
    psql -q -d template_postgis -f /usr/share/postgresql/9.0/contrib/postgis_comments.sql

    psql -q -d template_postgis -c "UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template_postgis';"
    psql -q -d template_postgis -c "REVOKE ALL ON SCHEMA public FROM public;"
    psql -q -d template_postgis -c "GRANT USAGE ON SCHEMA public TO public;"
    psql -q -d template_postgis -c "GRANT ALL ON SCHEMA public TO postgres;"
    psql -q -d template_postgis -c "GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE public.geometry_columns TO PUBLIC;"
    psql -q -d template_postgis -c "GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE public.spatial_ref_sys TO PUBLIC;"
    EOH
    not_if "psql -l | grep template_postgis", :user => "postgres"
    only_if "pgrep postgres"
end

# TODO: vagrant shouldn't need to be a superuser
script "Create vagrant user" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code <<-EOH
    createuser vagrant --createdb --superuser --no-createrole
    EOH
    not_if "psql -c '\\du' | grep vagrant", :user => "postgres"
    only_if "pgrep postgres"
end

script "Create basicproject database" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code <<-EOH
    createdb -T template_postgis basicproject
    EOH
    not_if "psql -l | grep basicproject", :user => "postgres"
    only_if "pgrep postgres"
end


#
# PgBouncer Setup
#
directory "/var/log/pgbouncer/" do
    owner "postgres"
    group "postgres"
    recursive true
    mode 0755
end

script "Install pgbouncer" do
    interpreter "bash"
    user "root"
    cwd "/tmp/src/"
    code <<-EOH
    wget http://pgfoundry.org/frs/download.php/3197/pgbouncer-1.5.tar.gz
    tar xzf pgbouncer-1.5.tar.gz
    cd pgbouncer-1.5
    ./configure --prefix=/usr/local
    make
    make install
    EOH
    not_if "which pgbouncer"
end

cookbook_file "/etc/pgbouncer.ini" do
    source "pgbouncer/pgbouncer.ini"
    owner "root"
    group "root"
    mode 0644
end

cookbook_file "/etc/userlist.txt" do
    source "pgbouncer/userlist.txt"
    owner "postgres"
    group "root"
    mode 0644
end

script "Start pgbouncer" do
    interpreter "bash"
    user "postgres"
    code <<-EOH
    pgbouncer -d /etc/pgbouncer.ini
    EOH
    not_if "pgrep pgbouncer"
end
