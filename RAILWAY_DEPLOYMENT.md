# Railway Backend Deployment Guide

## 🚀 Step-by-Step Railway Deployment

### Prerequisites
- GitHub account with your repository
- Railway account (free tier available)
- MongoDB Atlas database (already configured)

### Step 1: Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Complete the verification process

### Step 2: Create New Project
1. Click "New Project" in Railway dashboard
2. Select "Deploy from GitHub repo"
3. Choose your `airbnb-capstone` repository
4. Railway will automatically detect it's a Node.js project

### Step 3: Configure Project Settings
1. **Root Directory**: Set to `backend`
2. **Build Command**: Leave as default (Railway auto-detects)
3. **Start Command**: `npm start` (already configured in package.json)

### Step 4: Set Environment Variables
In Railway dashboard, go to your project → Variables tab and add:

```
MONGODB_URI=mongodb+srv://thabang129m:129m129m@airbnb-capstone.tkq35et.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-capstone
NODE_ENV=production
PORT=5002
```

### Step 5: Deploy
1. Railway will automatically start the deployment
2. Monitor the build logs for any issues
3. Wait for deployment to complete (usually 2-3 minutes)

### Step 6: Get Your Backend URL
1. Once deployed, go to the "Deployments" tab
2. Click on your latest deployment
3. Copy the generated URL (e.g., `https://your-app-name.railway.app`)
4. This is your backend API URL

### Step 7: Test Your Backend
Test these endpoints to ensure everything is working:

```bash
# Test basic connectivity
curl https://your-app-name.railway.app/api/listings

# Test cities endpoint
curl https://your-app-name.railway.app/api/cities

# Test health check
curl https://your-app-name.railway.app/api/listings
```

## 🔧 Railway Configuration Files

### railway.json (already created)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/api/listings",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## 📊 Monitoring Your Deployment

### Railway Dashboard Features:
- **Real-time logs**: Monitor your application logs
- **Metrics**: CPU, memory, and network usage
- **Deployments**: View deployment history
- **Variables**: Manage environment variables
- **Domains**: Custom domain configuration

### Health Checks:
- Railway automatically checks `/api/listings` endpoint
- If health check fails, Railway will restart the service
- Monitor the "Health" tab in your project

## 🔒 Security Best Practices

### Environment Variables:
- ✅ MongoDB URI is now in environment variables
- ✅ No sensitive data in code
- ✅ Railway encrypts environment variables

### CORS Configuration:
- Updated to allow multiple origins
- Ready for Netlify domain addition

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Railway build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Database Connection Issues**
   - Verify MONGODB_URI is set correctly
   - Check MongoDB Atlas network access
   - Ensure database user has proper permissions

3. **Port Issues**
   - Railway sets PORT automatically
   - Your code uses `process.env.PORT || 5002`
   - No manual port configuration needed

4. **CORS Errors**
   - Backend is configured for multiple origins
   - Will need to add Netlify domain after frontend deployment

### Debug Commands:
```bash
# Check Railway logs
railway logs

# Check environment variables
railway variables

# Restart deployment
railway up
```

## 📈 Scaling (Future)

### Railway Plans:
- **Free Tier**: 500 hours/month, 512MB RAM
- **Pro Plan**: $5/month, 1GB RAM, unlimited hours
- **Team Plan**: $20/month, 2GB RAM, team features

### Auto-scaling:
- Railway automatically scales based on traffic
- No manual configuration needed
- Pay only for what you use

## 🎯 Next Steps After Railway Deployment

1. **Test all endpoints** thoroughly
2. **Copy the backend URL** for Netlify configuration
3. **Deploy frontend to Netlify** (next step)
4. **Update CORS settings** with Netlify domain
5. **Test full application** functionality

## 📞 Railway Support

- **Documentation**: [docs.railway.app](https://docs.railway.app)
- **Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: [github.com/railwayapp/railway](https://github.com/railwayapp/railway)

---

**Your backend will be live at**: `https://your-app-name.railway.app`

**Save this URL** - you'll need it for the Netlify frontend deployment! 