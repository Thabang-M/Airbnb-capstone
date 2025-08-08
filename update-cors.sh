#!/bin/bash

# Script to update CORS settings in backend/server.js with new Netlify domain
echo "🔧 Updating CORS settings for new Netlify domain..."

# Check if domain is provided as argument
if [ -z "$1" ]; then
    echo "📝 Please provide the new Netlify domain (e.g., airbnb-capstone-2024.netlify.app):"
    read -r new_domain
else
    new_domain="$1"
fi

# Remove https:// if provided
new_domain=$(echo "$new_domain" | sed 's|https://||')

# Check if the domain is already in the CORS settings
if grep -q "$new_domain" backend/server.js; then
    echo "✅ Domain $new_domain is already in CORS settings"
else
    echo "➕ Adding $new_domain to CORS settings..."
    
    # Create a backup
    cp backend/server.js backend/server.js.backup
    
    # Add the new domain to the allowedOrigins array
    sed -i.bak "s|    'https://ziao-capstone.netlify.app'|    'https://ziao-capstone.netlify.app',\n    'https://$new_domain'|" backend/server.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully added $new_domain to CORS settings"
        echo "📝 Backup created as backend/server.js.backup"
    else
        echo "❌ Failed to update CORS settings"
        exit 1
    fi
fi

echo ""
echo "🔧 Next steps:"
echo "   1. Commit and push the changes to GitHub"
echo "   2. Redeploy the backend to Railway"
echo "   3. Test the new Netlify site"
