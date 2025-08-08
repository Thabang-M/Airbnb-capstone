#!/bin/bash

# Netlify Deployment Script for Airbnb Capstone - New Site
echo "🚀 Starting new Netlify deployment process..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Installing now..."
    npm install -g netlify-cli
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "🔐 Please login to Netlify..."
    netlify login
fi

# Build the React app
echo "📦 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check your code and try again."
    exit 1
fi

# Deploy to Netlify with a new site name
echo "🌐 Deploying to Netlify with new site name..."
echo "📝 Please enter a new site name for your Netlify deployment (e.g., airbnb-capstone-2024):"
read -r site_name

if [ -z "$site_name" ]; then
    site_name="airbnb-capstone-$(date +%Y%m%d)"
    echo "Using default site name: $site_name"
fi

# Deploy to Netlify with the new site name
netlify deploy --prod --dir=build --site-name="$site_name"

if [ $? -eq 0 ]; then
    echo "🎉 Deployment complete!"
    echo "📝 Your new Netlify site: https://$site_name.netlify.app"
    echo ""
    echo "🔧 Next steps:"
    echo "   1. Update CORS settings in backend/server.js with the new domain:"
    echo "      https://$site_name.netlify.app"
    echo "   2. Set environment variables in Netlify dashboard:"
    echo "      - REACT_APP_API_URL=https://airbnb-capstone-production.up.railway.app"
    echo "      - REACT_APP_ENABLE_DEBUG=false"
    echo "      - NODE_ENV=production"
    echo "   3. Test all functionality on the new site"
else
    echo "❌ Deployment failed! Please check the error messages above."
    exit 1
fi
