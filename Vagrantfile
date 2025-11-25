Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "somatochart" do |somatochart|
    somatochart.vm.hostname = "somatochart"
    somatochart.vm.network "forwarded_port", guest: 8080, host: 8080

    somatochart.vm.provision "shell", path: ".provision/setup.sh"
  end
end
