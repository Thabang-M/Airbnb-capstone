#!/bin/bash

# Railway Deployment Script for Airbnb Backend
echo "🚂 Starting Railway deployment process..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Installing now..."
    npm install -g @railway/cli
fi

# Check if user is logged in to Railway
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

# Test backend locally first
echo "🧪 Testing backend locally..."
cd backend
node test-local.js

if [ $? -eq 0 ]; then
    echo "✅ Local tests passed!"
else
    echo "❌ Local tests failed! Please fix issues before deploying."
    exit 1
fi

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "🎉 Railway deployment initiated!"
echo "📝 Next steps:"
echo "   1. Check Railway dashboard for deployment status"
echo "   2. Set environment variables in Railway dashboard:"
echo "      - MONGODB_URI"
echo "      - NODE_ENV=production"
echo "      - PORT=5002"
echo "   3. Get your backend URL from Railway dashboard"
echo "   4. Test the deployed backend endpoints"
echo "   5. Use the backend URL for Netlify frontend deployment" 