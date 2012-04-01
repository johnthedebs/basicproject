package "ufw"

service "ufw" do
  enabled true
  running true
  supports :status => true, :restart => true, :reload => true
  action [:enable, :start]
end


bash "Enable UFW" do
user "root"
  code <<-EOH
  ufw allow 22   # SSH
  ufw allow 80   # HTTP
  ufw allow 8000 # DEV-HTTP
  EOH
end
