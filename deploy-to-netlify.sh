#!/bin/bash

# Netlify Deployment Script for Airbnb Capstone
echo "🚀 Starting Netlify deployment process..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Installing now..."
    npm install -g netlify-cli
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

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=build

echo "🎉 Deployment complete!"
echo "📝 Don't forget to:"
echo "   1. Set environment variables in Netlify dashboard"
echo "   2. Deploy your backend to Railway/Render"
echo "   3. Update CORS settings in backend/server.js"
echo "   4. Test all functionality" 