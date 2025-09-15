# Project Kisan Setup Guide

This guide will help you set up and run Project Kisan on your local machine.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000` in your browser.

## 📁 Project Structure Overview

```
project-kisan/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── gemini-analyze/ # Mock AI analysis endpoint
│   ├── diagnosis/         # Crop diagnosis page
│   ├── marketplace/       # Market prices page
│   ├── subsidies/         # Government schemes page
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage with hero section
│   └── providers.tsx      # React Query provider
├── components/            # Reusable components
│   ├── VoiceInput.tsx     # Voice analysis with multi-language
│   ├── ImageUpload.tsx    # Image upload with drag-drop
│   ├── PriceChart.tsx     # Interactive market charts
│   └── ErrorBoundary.tsx  # Error handling
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker for offline
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Key Features Implemented

### ✅ Core Pages
- **Homepage**: Hero section with voice/image input options
- **Diagnosis Dashboard**: Crop photo upload + results display
- **Marketplace**: Real-time price charts (mock API)
- **Subsidies**: Filterable scheme listings

### ✅ Key Components
- **VoiceInput.jsx**: Voice-to-text with Kannada/Hindi/English support
- **ImageUpload.jsx**: Drag-and-drop with Gemini API integration stub
- **PriceChart.jsx**: Interactive charts with Recharts

### ✅ Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **PWA Support** with service worker
- **Responsive Design** (320px+)
- **Error Boundaries** for graceful error handling

## 🔧 Configuration Files

### Environment Variables
Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_APP_NAME=Project Kisan
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Tailwind Configuration
The app uses a custom color palette:
- Primary: #34D399 (Green)
- Secondary: #FACC15 (Yellow)
- Custom animations for voice recording

### PWA Configuration
- Service worker for offline functionality
- Manifest file for app-like experience
- Cache strategies for static and dynamic content

## 🧪 Testing the Features

### Voice Analysis
1. Go to homepage
2. Click "Voice Analysis" card
3. Allow microphone permissions
4. Speak in English, Hindi, or Kannada
5. View transcript and analysis

### Image Diagnosis
1. Go to `/diagnosis` page
2. Upload a crop image (drag & drop or click)
3. Click "Analyze Image"
4. View disease diagnosis and treatment options

### Market Prices
1. Go to `/marketplace` page
2. Select different crops and regions
3. View interactive price charts
4. Check market insights and trading tips

### Government Schemes
1. Go to `/subsidies` page
2. Use filters to find relevant schemes
3. View eligibility criteria and documents
4. Share schemes with others

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 🔍 Troubleshooting

### Common Issues

**1. Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Install missing types
npm install --save-dev @types/react @types/react-dom
```

**3. Tailwind CSS not working**
```bash
# Rebuild CSS
npm run build

# Check Tailwind configuration
npx tailwindcss --help
```

**4. PWA not working**
- Ensure HTTPS in production
- Check service worker registration
- Verify manifest.json is accessible

### Browser Compatibility
- Chrome 80+ (recommended)
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Mobile Testing

### Responsive Design
- Test on various screen sizes
- Check touch interactions
- Verify PWA installation

### Performance
- Use Chrome DevTools Lighthouse
- Test on slow networks
- Verify offline functionality

## 🔧 Development Tips

### Hot Reload
The development server supports hot reload. Changes to files will automatically refresh the browser.

### Debugging
- Use browser DevTools
- Check console for errors
- Use React Developer Tools

### Code Quality
```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build for production
npm run build
```

## 📚 Next Steps

### Adding Real APIs
1. Replace mock API routes with real endpoints
2. Integrate with Gemini API for image analysis
3. Connect to real market data sources
4. Implement user authentication

### Enhancing Features
1. Add more languages
2. Implement push notifications
3. Add offline data sync
4. Integrate with backend services

### Performance Optimization
1. Implement image optimization
2. Add code splitting
3. Optimize bundle size
4. Add performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Refer to the main README.md

---

**Happy Farming! 🌾** 