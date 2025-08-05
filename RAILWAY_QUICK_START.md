# 🚂 Railway Quick Start Guide

## ✅ What's Ready

Your backend is now configured for Railway deployment:

### Updated Files:
- ✅ `backend/package.json` - Added `start` script and axios dependency
- ✅ `backend/db/connection.js` - Now uses environment variables for MongoDB URI
- ✅ `backend/railway.json` - Railway configuration
- ✅ `backend/test-local.js` - Local testing script
- ✅ `deploy-railway.sh` - Automated deployment script

### Environment Variables Ready:
```
MONGODB_URI=mongodb+srv://thabang129m:129m129m@airbnb-capstone.tkq35et.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-capstone
NODE_ENV=production
PORT=5002
```

## 🚀 Deploy Now

### Option 1: Automated Script (Recommended)
```bash
./deploy-railway.sh
```

### Option 2: Manual Steps
1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   cd backend
   railway up
   ```

## 📋 Railway Dashboard Steps

1. **Go to [Railway.app](https://railway.app)**
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select your repository**: `airbnb-capstone`
4. **Set Root Directory**: `backend`
5. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
   - `PORT`: `5002`

## 🧪 Test Before Deploying

Run this to test your backend locally:
```bash
cd backend
node test-local.js
```

## 📊 After Deployment

1. **Get your backend URL** from Railway dashboard
2. **Test the deployed endpoints**:
   ```bash
   curl https://your-app.railway.app/api/listings
   curl https://your-app.railway.app/api/cities
   ```
3. **Save the URL** for Netlify frontend deployment

## 🔧 Troubleshooting

### Common Issues:
- **Build fails**: Check Railway logs for specific errors
- **Database connection**: Verify MONGODB_URI is set correctly
- **Port issues**: Railway sets PORT automatically

### Railway CLI Commands:
```bash
railway logs          # View deployment logs
railway variables     # Manage environment variables
railway status        # Check deployment status
railway open          # Open project in browser
```

## 🎯 Next Steps

After successful Railway deployment:
1. ✅ Backend is live at `https://your-app.railway.app`
2. 🔄 Deploy frontend to Netlify
3. 🔗 Update CORS settings with Netlify domain
4. 🧪 Test full application

---

**Ready to deploy?** Run `./deploy-railway.sh` or follow the manual steps above! 