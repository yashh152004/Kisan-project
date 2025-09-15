# Deployment Guide for Project Kisan

This guide covers deploying Project Kisan to various platforms with optimal configurations.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- Project repository on GitHub

### Steps

1. **Connect Repository**
   ```bash
   # Fork or clone the repository to your GitHub account
   git clone https://github.com/yourusername/project-kisan.git
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_APP_NAME=Project Kisan
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Configure DNS settings
   - Enable HTTPS

### Vercel Configuration File
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    }
  ]
}
```

## 🔥 Firebase Hosting

### Prerequisites
- Node.js 18+
- Firebase CLI
- Google account

### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Configure Firebase**
   ```bash
   # Select your project
   # Public directory: out
   # Configure as single-page app: No
   # Set up automatic builds: Yes
   # Build command: npm run build
   # Output directory: out
   ```

5. **Update firebase.json**
   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "/manifest.json",
           "headers": [
             {
               "key": "Content-Type",
               "value": "application/manifest+json"
             }
           ]
         },
         {
           "source": "/sw.js",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "no-cache"
             }
           ]
         }
       ]
     }
   }
   ```

6. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🌐 Netlify Deployment

### Prerequisites
- Netlify account
- GitHub repository

### Steps

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_APP_NAME=Project Kisan
   NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Deploy**
   - Netlify will automatically deploy on push
   - Custom domain can be configured in settings

## 📱 PWA Configuration

### Service Worker
The app includes a service worker for offline functionality:

```javascript
// public/sw.js
const CACHE_NAME = 'kisan-v1';
const urlsToCache = [
  '/',
  '/diagnosis',
  '/marketplace',
  '/subsidies',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### Manifest Configuration
Update `public/manifest.json` for your domain:

```json
{
  "name": "Project Kisan",
  "short_name": "Kisan",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#34D399",
  "background_color": "#f0fdf4"
}
```

## 🔧 Environment Configuration

### Development
```env
# .env.local
NEXT_PUBLIC_APP_NAME=Project Kisan
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GEMINI_API_KEY=your_dev_key
```

### Production
```env
# .env.production
NEXT_PUBLIC_APP_NAME=Project Kisan
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GEMINI_API_KEY=your_production_key
```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
npm run build
```

### CDN Configuration
- Configure CDN for static assets
- Enable gzip compression
- Set appropriate cache headers

### Monitoring
- Set up error tracking (Sentry)
- Configure analytics (Google Analytics)
- Monitor Core Web Vitals

## 🔒 Security Considerations

### HTTPS
- Enable HTTPS on all deployments
- Configure HSTS headers
- Use secure cookies

### API Security
- Validate all inputs
- Implement rate limiting
- Use environment variables for secrets

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https:;">
```

## 🚀 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Monitoring and Analytics

### Performance Monitoring
- Google PageSpeed Insights
- WebPageTest
- Lighthouse CI

### Error Tracking
- Sentry integration
- Error boundary implementation
- Log aggregation

### User Analytics
- Google Analytics 4
- Custom event tracking
- User behavior analysis

## 🔄 Updates and Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Update Next.js
npm install next@latest
```

### Backup Strategy
- Database backups (if applicable)
- Static asset backups
- Configuration backups

### Rollback Plan
- Keep previous deployments
- Database migration scripts
- Feature flags for gradual rollouts

---

**For additional support, refer to the main README.md file or create an issue on GitHub.** 