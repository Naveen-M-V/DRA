#!/usr/bin/env bash
set -euo pipefail

# Ubuntu/Debian fresh server setup for Next.js + PM2
sudo apt update
sudo apt install -y curl git build-essential

# Install Node.js LTS (20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Optional: create app directory
sudo mkdir -p /var/www
sudo chown -R "$USER":"$USER" /var/www

node -v
npm -v
pm2 -v

echo "Base setup done. Clone repo to /var/www/dra-secure and run scripts/deploy.sh"
