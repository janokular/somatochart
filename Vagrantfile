Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "somatochart" do |somatochart|
    somatochart.vm.hostname = "somatochart"
    somatochart.vm.network "forwarded_port", guest: 5001, host: 5001

    somatochart.vm.provision "shell", inline: <<-SHELL
      # Install curl, gnupg and python virtual environment
      apt-get update
      apt-get install -y curl gnupg python3.11-venv

      # Create an virtual environment
      python3 -m venv /vagrant/.venv

      # Activate the virtual environment
      . /vagrant/.venv/bin/activate

      # Install requirements.txt
      pip install -r /vagrant/requirements.txt

      # Deactivate virtual environment
      deactivate

      # Import the public key
      curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
          gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
          --dearmor

      # Create the list file
      echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | \
          sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

      # Install MongoDB
      apt-get update
      apt-get install -y mongodb-org

      # Start and enable MongoDB
      systemctl start mongod
      systemctl enable mongod

      # Set up environment variables for the project
      echo 'FLASK_MONGO_URI=mongodb://localhost:27017/somatochart' | sudo tee -a /etc/environment
      echo 'FLASK_APP=somatochart' | sudo tee -a /etc/environment
      echo 'FLASK_DEBUG=True' | sudo tee -a /etc/environment
      echo 'FLASK_RUN_HOST=0.0.0.0' | sudo tee -a /etc/environment
      echo 'FLASK_RUN_PORT=5001' | sudo tee -a /etc/environment
    SHELL

    somatochart.vm.provision "docker" do |docker|
    end
  end
end
