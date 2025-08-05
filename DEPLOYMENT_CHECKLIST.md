# Deployment Checklist

## ✅ Pre-Deployment Tasks

### Frontend (Netlify)
- [x] Created `netlify.toml` configuration
- [x] Created `public/_redirects` for client-side routing
- [x] Tested build process (`npm run build`)
- [x] Created deployment script (`deploy-to-netlify.sh`)

### Backend Preparation
- [x] Updated CORS settings in `server.js`
- [x] Created `railway.json` for Railway deployment
- [x] Created `render.yaml` for Render deployment
- [x] Created comprehensive deployment guide

## 🚀 Deployment Steps

### Step 1: Backend Deployment
- [ ] Choose backend hosting service (Railway or Render)
- [ ] Deploy backend using the configuration files
- [ ] Get the backend URL (e.g., `https://your-app.railway.app`)
- [ ] Test backend endpoints are working

### Step 2: Frontend Deployment
- [ ] Push code to GitHub repository
- [ ] Connect repository to Netlify
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `build`
- [ ] Set environment variables in Netlify dashboard:
  - `REACT_APP_API_URL`: Your backend URL
  - `REACT_APP_ENABLE_DEBUG`: `false`
  - `NODE_ENV`: `production`

### Step 3: Post-Deployment Configuration
- [ ] Update CORS settings in backend with Netlify domain
- [ ] Test all functionality:
  - [ ] User registration/login
  - [ ] Listing creation and management
  - [ ] Booking system
  - [ ] Image uploads
  - [ ] Search and filtering
  - [ ] Responsive design

## 🔧 Environment Variables Needed

### Netlify (Frontend)
```
REACT_APP_API_URL=https://your-backend-url.railway.app
REACT_APP_ENABLE_DEBUG=false
NODE_ENV=production
```

### Railway/Render (Backend)
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
PORT=5002 (or let the service set it)
```

## 🐛 Common Issues & Solutions

### Build Failures
- Check all dependencies are in `package.json`
- Ensure Node.js version compatibility
- Review build logs for specific errors

### CORS Errors
- Update backend CORS settings with Netlify domain
- Ensure environment variables are set correctly
- Check that backend URL is accessible

### API Connection Issues
- Verify backend URL is correct
- Check that backend is running and accessible
- Test API endpoints directly

### Routing Issues
- Ensure `_redirects` file is in `public/` directory
- Check that all routes are handled by React Router

## 📊 Performance Optimization

### After Deployment
- [ ] Enable Netlify's CDN
- [ ] Optimize images
- [ ] Monitor Core Web Vitals
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)

## 🔒 Security Checklist

- [ ] All API keys in environment variables
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] CORS properly configured
- [ ] Authentication working correctly
- [ ] No sensitive data in client-side code

## 📱 Testing Checklist

### Desktop Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive design
- [ ] Touch interactions

### Functionality Testing
- [ ] User registration
- [ ] User login/logout
- [ ] Listing creation
- [ ] Listing editing
- [ ] Booking creation
- [ ] Booking management
- [ ] Search functionality
- [ ] Image uploads
- [ ] Form validations
- [ ] Error handling

## 🎯 Final Steps

- [ ] Share the live URL
- [ ] Document any deployment-specific configurations
- [ ] Set up monitoring and alerts
- [ ] Plan for future updates and maintenance 