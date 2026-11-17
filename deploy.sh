#!/usr/bin/env bash
# Rebuild and publish the site to the VPS (http://69.62.81.193:8080).
# Run from Git Bash on Windows: ./deploy.sh   (uses the `ahanaf` SSH alias from WSL; no sudo needed)
set -euo pipefail
cd "$(dirname "$0")"

npm run build
# Upload to a staging folder first, then swap it in, so a failed upload never leaves a half-updated site.
tar -czf - -C out . | wsl -e ssh ahanaf \
  'rm -rf ~/rubya-portfolio.new && mkdir -p ~/rubya-portfolio.new && tar -xzf - -C ~/rubya-portfolio.new \
   && rsync -a --delete ~/rubya-portfolio.new/ /var/www/rubya-portfolio/'

curl -s -o /dev/null -w "Live check: HTTP %{http_code}\n" http://69.62.81.193:8080/
