# 🚀 Deployment Guide - Airbnb Capstone Project

This guide will help you deploy your Airbnb capstone project to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ All tests passing (`npm run deploy-test`)
- ✅ Environment variables configured
- ✅ Database connection working
- ✅ No console.log statements in production code

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend (Vercel)
1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository

2. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push

#### Backend (Railway)
1. **Connect to GitHub**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Create new project from GitHub repo

2. **Configure Settings**
   - Set root directory to `backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Environment Variables**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   PORT=5002
   ```

4. **Deploy**
   - Railway will auto-deploy on push

### Option 2: Heroku (Full Stack)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-airbnb-app
   ```

3. **Configure Buildpacks**
   ```bash
   heroku buildpacks:set heroku/nodejs
   heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-static
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify)
1. Connect to GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set environment variables

#### Backend (Render)
1. Create new Web Service
2. Connect to GitHub repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`

## 🔧 Environment Configuration

### Required Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
NODE_ENV=production
```

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://your-frontend-url.com
PORT=5002
NODE_ENV=production
```

## 📊 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API responds correctly
- [ ] Database connection works
- [ ] User registration/login works
- [ ] Property listings load
- [ ] Booking functionality works
- [ ] Images load properly
- [ ] Responsive design works on mobile
- [ ] No console errors in browser

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` is set correctly
   - Check that frontend URL matches exactly

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Check network access to MongoDB

3. **Build Failures**
   - Run `npm run build` locally first
   - Check for missing dependencies

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly

### Debug Commands

```bash
# Test deployment readiness
npm run deploy-test

# Build locally
npm run build

# Check environment
node -e "console.log(process.env.NODE_ENV)"

# Test API locally
curl http://localhost:5002/api/listings
```

## 🔒 Security Considerations

- Use HTTPS in production
- Set strong JWT secrets
- Enable CORS properly
- Use environment variables for secrets
- Regular security audits

## 📈 Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable caching headers
- Monitor performance metrics

---

**Note:** This is a demonstration project. For production use, implement additional security measures and monitoring. 