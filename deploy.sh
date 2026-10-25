#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting build of Boreland Website..."
npm run build

echo "🧹 Clearing old files on Oracle VM..."
ssh orachle "rm -rf /var/www/astro-site/dist/*"

echo "📤 Deploying new build to Oracle VM..."
scp -r dist/* orachle:/var/www/astro-site/dist/

echo "✅ Deployment completed successfully!"
