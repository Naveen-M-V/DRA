#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/dra-secure"
BRANCH="main"
APP_NAME="dra-secure"

cd "$APP_DIR"

# Pull latest code
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Install dependencies and build
npm ci
npm run build

# Start or reload with PM2
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --only "$APP_NAME" --update-env
fi

pm2 save

echo "Deployment complete."
pm2 status "$APP_NAME"
