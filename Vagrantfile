Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 1
  end  

  config.vm.define "somatochart" do |somatochart|
    somatochart.vm.hostname = "somatochart"
    somatochart.vm.network "forwarded_port", guest: 4200, host: 4200
    somatochart.vm.network "forwarded_port", guest: 5200, host: 5200
    
    somatochart.vm.provision "shell", path: ".provision/setup.sh"
  end
end
