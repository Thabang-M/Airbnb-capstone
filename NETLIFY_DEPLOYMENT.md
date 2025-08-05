# Netlify Deployment Guide

## Overview
This guide will help you deploy your Airbnb capstone project to Netlify. Since your project has a separate backend, we'll need to deploy the frontend to Netlify and the backend to a separate service.

## Prerequisites
- A GitHub account
- A Netlify account
- A backend hosting service (Railway, Render, Heroku, etc.)

## Step 1: Backend Deployment

### Option A: Deploy to Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub account
3. Create a new project
4. Select your repository
5. Set the root directory to `backend`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5002 (or let Railway set it)
   - `NODE_ENV`: production

### Option B: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Set root directory to `backend`
7. Add environment variables as above

## Step 2: Frontend Deployment to Netlify

### Method 1: Deploy via Netlify UI
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

### Method 2: Deploy via Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login to Netlify:
   ```bash
   netlify login
   ```
3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Step 3: Environment Variables

In your Netlify dashboard, go to Site settings > Environment variables and add:

```
REACT_APP_API_URL=https://your-backend-url.railway.app
REACT_APP_ENABLE_DEBUG=false
NODE_ENV=production
```

Replace `your-backend-url.railway.app` with your actual backend URL.

## Step 4: Update CORS Settings

Update your backend `server.js` to allow your Netlify domain:

```javascript
// Update CORS middleware
server.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://your-netlify-app.netlify.app',
    'https://your-custom-domain.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Step 5: Test Your Deployment

1. Visit your Netlify URL
2. Test all major functionality:
   - User registration/login
   - Listing creation
   - Booking system
   - Image uploads
   - Search functionality

## Troubleshooting

### Common Issues:

1. **API calls failing**: Check that your backend URL is correct in environment variables
2. **CORS errors**: Ensure your backend allows your Netlify domain
3. **Build failures**: Check that all dependencies are in `package.json`
4. **Routing issues**: The `_redirects` file should handle client-side routing

### Debug Steps:
1. Check Netlify build logs
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Check browser console for errors

## Post-Deployment

1. Set up a custom domain (optional)
2. Enable HTTPS (automatic with Netlify)
3. Set up form handling if needed
4. Configure analytics
5. Set up monitoring

## Security Considerations

1. Ensure all API keys are in environment variables
2. Use HTTPS for all API calls
3. Implement proper authentication
4. Set up rate limiting on your backend
5. Regular security updates

## Performance Optimization

1. Enable Netlify's CDN
2. Optimize images
3. Implement lazy loading
4. Use compression
5. Monitor Core Web Vitals 