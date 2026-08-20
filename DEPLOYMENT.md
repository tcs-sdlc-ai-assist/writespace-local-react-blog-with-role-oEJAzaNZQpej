# WriteSpace Deployment Guide

## Overview

This guide covers deployment options and configurations for WriteSpace, a React 18+ blogging platform built with Vite and Tailwind CSS.

## Quick Deploy

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy your project:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

The project includes a `vercel.json` configuration file that handles:
- Static site deployment
- Clean URL routing
- Automatic redirects

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy your project:
   ```bash
   netlify deploy
   ```

3. For production deployment:
   ```bash
   netlify deploy --prod
   ```

## Build Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=WriteSpace
```

All environment variables must be prefixed with `VITE_` to be accessible in your Vite application.

### Build Command

```bash
npm run build
```

This generates a production-ready build in the `dist/` directory.

### Preview Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment Platforms

### Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

This configuration:
- Uses Vercel's static site builder
- Points to the `dist` directory for deployment
- Handles client-side routing for React Router

### Netlify Configuration

Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  base = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

1. Update `vite.config.js` to set the correct base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/writespace/'
})
```

2. Add a deploy script to `package.json`:

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```

4. Add a `homepage` field to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/writespace"
   ```

### Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create an `nginx.conf` file:

```nginx
server {
  listen 80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

Build and run the Docker container:

```bash
docker build -t writespace .
docker run -p 80:80 writespace
```

## CI/CD Setup

### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy WriteSpace

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### GitLab CI/CD

Create a `.gitlab-ci.yml` file:

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18-alpine
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: node:18-alpine
  script:
    - npm install -g vercel
    - vercel --prod --token $VERCEL_TOKEN --confirm
  only:
    - main
```

## Post-Deployment Checklist

1. **Test all routes**: Verify that all application routes work correctly in production
2. **Check environment variables**: Ensure all required environment variables are set in your hosting provider
3. **Test authentication**: Verify login, registration, and session management work properly
4. **Test CRUD operations**: Create, read, update, and delete blog posts to ensure data persistence
5. **Check responsive design**: Test the application on various device sizes
6. **Verify admin functionality**: If applicable, test admin-only features

## Troubleshooting

### Common Issues

1. **Blank page on deployment**:
   - Ensure the `base` path in `vite.config.js` matches your deployment URL
   - Check that the `dist` directory contains the built files
   - Verify that your hosting provider is serving the `index.html` file

2. **Routing not working**:
   - Ensure your hosting provider is configured to redirect all requests to `index.html`
   - Check that your `vercel.json` or `netlify.toml` has the correct routing configuration

3. **Environment variables not loading**:
   - Verify that all environment variables are prefixed with `VITE_`
   - Check that the variables are set in your hosting provider's configuration

4. **Build failures**:
   - Ensure Node.js version 18+ is used
   - Check that all dependencies are installed (`npm install`)
   - Verify that there are no syntax errors in your code

### Debugging

To debug deployment issues:

1. Check the browser console for errors
2. Review the build logs from your hosting provider
3. Test the production build locally using `npm run preview`
4. Verify that all API endpoints are accessible from your deployed application

## Performance Optimization

### Vite Configuration

Optimize your `vite.config.js` for production:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

### Caching

Implement caching strategies:
- Browser caching for static assets
- CDN caching for improved global performance
- Service worker for offline capabilities

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment variables**: Never commit sensitive information to version control
3. **Content Security Policy (CSP)**: Configure CSP headers to prevent XSS attacks
4. **Rate limiting**: Implement rate limiting for API endpoints
5. **Input validation**: Always validate user input on both client and server

## Monitoring

Set up monitoring for your deployed application:
- Error tracking (Sentry, Rollbar)
- Performance monitoring (Lighthouse, WebPageTest)
- Uptime monitoring (UptimeRobot, Pingdom)
- Analytics (Google Analytics, Plausible)

## Scaling

For high-traffic applications:
- Consider using a CDN for static assets
- Implement server-side rendering (SSR) if SEO is important
- Use a dedicated backend service for data persistence
- Consider containerization with Docker and orchestration with Kubernetes