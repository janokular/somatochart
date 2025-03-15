#!/bin/bash

# This script is used for automatic configuration of MEAN stack
# On Debian based distributions
# For deploy of SomatoChart application

# Check if script was run with sudo privileges
if [[ $(id -u) -ne 0 ]]
then
  echo "Please run with sudo or as a root." >&2
  exit 1
fi

# Reload the package database
apt-get update

# Install Node.js and npm
apt-get install -y nodejs npm

# Install Angular CLI
npm install -g @angular/cli

# Install gnupg and curl
apt-get install -y gnupg curl

# Import the public key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor

# Create the list file
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Reload the package database
apt-get update

# Install MongoDB Community Server
apt-get install -y mongodb-org

# Start and enable MongoDB
systemctl start mongod
systemctl enable mongod
