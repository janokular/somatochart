Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "eisschloss" do |eisschloss|
    eisschloss.vm.hostname = "eisschloss"
    eisschloss.vm.network "forwarded_port", guest: 3000, host: 3000

    eisschloss.vm.provision "shell", path: ".provision/setup.sh"
  end
end
