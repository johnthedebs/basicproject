#
# PostgreSQL and PostGIS Setup
#

package "postgresql-9.1-postgis"
package "postgresql-server-dev-9.1"
package "libproj-dev"
package "gdal-bin"
package "libpq-dev"

service "postgresql" do
    enabled true
    running true
    supports :status => true, :restart => true, :reload => true
    action [:start, :enable]
end

script "Create and setup template_postgis database" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code <<-EOH
    POSTGIS_SQL_PATH=`pg_config --sharedir`/contrib/postgis-1.5
    createdb -E UTF8 -T template0 --locale=en_US.utf8 template_postgis # Create the template spatial database.
    createlang -d template_postgis plpgsql # Adding PLPGSQL language support.
    psql -d postgres -c "UPDATE pg_database SET datistemplate='true' WHERE datname='template_postgis';"
    psql -d template_postgis -f $POSTGIS_SQL_PATH/postgis.sql # Loading the PostGIS SQL routines
    psql -d template_postgis -f $POSTGIS_SQL_PATH/spatial_ref_sys.sql
    psql -d template_postgis -c "GRANT ALL ON geometry_columns TO PUBLIC;" # Enabling users to alter spatial tables.
    psql -d template_postgis -c "GRANT ALL ON geography_columns TO PUBLIC;"
    psql -d template_postgis -c "GRANT ALL ON spatial_ref_sys TO PUBLIC;"
    EOH
    not_if "psql -l | grep template_postgis", :user => "postgres"
end

cookbook_file "/etc/postgresql/9.1/main/pg_hba.conf" do
    source "postgresql/pg_hba.conf"
    owner "postgres"
    group "postgres"
    mode 0644
    notifies :reload, resources(:service => "postgresql"), :immediately
end

# TODO: This user shouldn't need to be a superuser
script "Create database user" do
    interpreter "bash"
    user "postgres"
    code <<-EOH
    createuser basicproject --createdb --superuser --no-createrole
    EOH
    not_if "psql -c '\\du' | grep basicproject", :user => "postgres"
end

script "Set database user password" do
    interpreter "bash"
    user "postgres"
    code <<-EOH
    psql -c "alter user basicproject with password 'basicproject';"
    EOH
end

script "Create site database" do
    interpreter "bash"
    user "postgres"
    cwd "/var/lib/postgresql/"
    code "createdb -T template_postgis basicproject"
    not_if "psql -l | grep basicproject", :user => "postgres"
end
