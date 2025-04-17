Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 1
  end  

  config.vm.define "somatochart" do |somatochart|
    somatochart.vm.hostname = "somatochart"
    somatochart.vm.network "private_network", ip: "10.23.45.30"
    
    somatochart.vm.provision "shell", path: ".provision/setup.sh"
  end
end
