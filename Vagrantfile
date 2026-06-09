Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "somatochart" do |somatochart|
    somatochart.vm.hostname = "somatochart"
    somatochart.vm.network "forwarded_port", guest: 5001, host: 5001

    somatochart.vm.provision "shell", inline: <<-SHELL
      # Set up the environment variables for the project
      echo "FLASK_MONGO_URI=mongodb://localhost:27017/somatochart" | sudo tee -a /etc/environment
      echo "FLASK_APP=somatochart" | sudo tee -a /etc/environment
      echo "FLASK_DEBUG=True" | sudo tee -a /etc/environment
      echo "FLASK_RUN_HOST=0.0.0.0" | sudo tee -a /etc/environment
      echo "FLASK_RUN_PORT=5001" | sudo tee -a /etc/environment

      # Install Docker and Python virtual environment
      apt-get update
      apt-get install -y docker.io python3-venv

      # Start and enable Docker
      systemctl start docker
      systemctl enable docker

      # Run MongoDB Docker container
      docker run --name mongodb \
        --restart unless-stopped \
        -p 27017:27017 \
        -v mongodb_data:/data/db \
        -d mongodb/mongodb-community-server:latest-slim

      # Create an virtual environment
      python3 -m venv /vagrant/.venv

      # Activate the virtual environment
      . /vagrant/.venv/bin/activate

      # Install requirements.txt
      pip install -r /vagrant/requirements.txt

      # Deactivate the virtual environment
      deactivate
    SHELL
  end
end
