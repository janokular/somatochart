#!/bin/bash

# Setup script for installing MOngoDB on Debian VM

# Check if script was run with sudo privileges
if [[ $(id -u) -ne 0 ]]; then
  echo "Please run with sudo or as a root." >&2
  exit 1
fi

# Install curl, gnupg and python virtual environment
apt-get update
apt-get install -y curl gnupg python3.11-venv

# Create an environment
python3 -m venv /vagrant/somatochart/.venv

# Activate the environment
. /vagrant/somatochart/.venv/bin/activate

# Install requirements.txt
pip install -r /vagrant/somatochart/requirements.txt

# Quit from a Python virtual environment
deactivate

# Import the public key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
    --dearmor

# Create the list file
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | \
    tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Reload the package database
apt-get update

# Install MongoDB Community Server
apt-get install -y mongodb-org

# Start and enable MongoDB
systemctl start mongod
systemctl enable mongod
