#
# PostgreSQL and PostGIS Setup
#

package "postgresql-9.3-postgis-2.1"
package "postgresql-server-dev-9.3"
package "gdal-bin"
package "libproj-dev"
package "libpq-dev"
package "libgeoip1"

service "postgresql" do
    enabled true
    running true
    supports :status => true, :restart => true, :reload => true
    action [:start, :enable]
end

cookbook_file "/etc/postgresql/9.3/main/pg_hba.conf" do
    source "postgresql/pg_hba.conf"
    owner "postgres"
    group "postgres"
    mode 0644
    notifies :reload, resources(:service => "postgresql"), :immediately
end

script "Create database user and set password" do
    interpreter "bash"
    user "postgres"
    code <<-EOH
    # TODO: This user shouldn't need to be a superuser
    createuser basicproject --createdb --superuser --no-createrole
    psql -c "alter user basicproject with password 'basicproject';"
    EOH
    not_if "psql -c '\\du' | grep basicproject", :user => "postgres"
end

script "Create site database" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code <<-EOH
    createdb basicproject
    psql basicproject -c "CREATE EXTENSION postgis;"
    psql basicproject -c "CREATE EXTENSION postgis_topology;"
    EOH
    not_if "psql -l | grep basicproject", :user => "postgres"
end
