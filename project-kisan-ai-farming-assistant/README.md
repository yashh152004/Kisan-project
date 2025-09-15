# Project Kisan - AI Farming Assistant 🌾

A comprehensive React.js frontend for an AI-powered farming assistant that provides crop disease diagnosis, market insights, and government scheme information through voice and image analysis.

## 🚀 Features

### Core Functionality
- **Voice Analysis**: Multi-language support (Kannada, Hindi, English) with real-time speech recognition
- **Image Diagnosis**: AI-powered crop disease detection with treatment recommendations
- **Market Insights**: Real-time price charts and market trends
- **Government Schemes**: Filterable subsidy and scheme listings

### Technical Features
- **PWA Support**: Offline functionality and app-like experience
- **Responsive Design**: Optimized for mobile devices (320px+)
- **Accessibility**: WCAG AA compliant
- **Performance**: Optimized for 2G networks
- **Internationalization**: Multi-language support

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN/ui
- **State Management**: Zustand + React Query
- **Charts**: Recharts
- **Audio**: Web Speech API
- **PWA**: next-pwa
- **Deployment**: Vercel/Firebase ready

## 📱 Key Components

### VoiceInput.jsx
- Microphone access with visual feedback
- Multi-language support (Kannada/Hindi/English)
- Auto-submit on silence detection
- Waveform visualization

### ImageUpload.jsx
- Drag-and-drop file upload
- Image preview with thumbnail
- Gemini API integration stub
- Treatment accordion (chemical/organic)

### PriceChart.jsx
- Interactive market data visualization
- 7-day price trends
- Best sell day indicators
- Region selector

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deviljitu1/project-kisan-ai-farming-assistant.git
   cd project-kisan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME=Project Kisan
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your API keys here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## 📁 Project Structure

```
project-kisan/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── diagnosis/         # Diagnosis page
│   ├── marketplace/       # Marketplace page
│   ├── subsidies/         # Subsidies page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # App providers
├── components/            # Reusable components
│   ├── VoiceInput.tsx     # Voice analysis component
│   ├── ImageUpload.tsx    # Image upload component
│   └── PriceChart.tsx     # Price charts component
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   └── icons/           # App icons
├── styles/              # Additional styles
└── types/               # TypeScript types
```

## 🎨 Design System

### Colors
- **Primary**: #34D399 (Green)
- **Secondary**: #FACC15 (Yellow)
- **Background**: Gradient from primary-50 to green-50

### Typography
- **Font**: Google Sans (via @fontsource)
- **Weights**: 400, 500, 700

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Primary (green) and Secondary (white) variants
- **Inputs**: Consistent styling with focus states

## 🔧 API Integration

### Mock API Routes
- `/api/gemini-analyze` - Crop disease analysis
- `/api/market-prices` - Real-time price data
- `/api/subsidies` - Government schemes

### Real API Integration
Replace mock routes with actual API endpoints:
```typescript
// Example: Gemini API integration
const response = await fetch('/api/gemini-analyze', {
  method: 'POST',
  body: formData
})
```

## 📱 PWA Features

### Offline Support
- Service worker for caching
- Offline-first architecture
- Background sync for data updates

### App-like Experience
- Standalone display mode
- Custom app icons
- Splash screen
- Home screen shortcuts

## 🌐 Internationalization

### Supported Languages
- **English** (en) - Default
- **Hindi** (hi) - हिंदी
- **Kannada** (kn) - ಕನ್ನಡ

### Implementation
```typescript
// Language switching
const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>('en')
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Environment Variables for Production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GEMINI_API_KEY=your_production_key
```

## 📊 Performance Optimization

### Bundle Size
- Code splitting with Next.js
- Tree shaking for unused code
- Image optimization

### Loading Performance
- Skeleton loading states
- Progressive image loading
- Lazy component loading

### Network Optimization
- Compressed assets
- CDN integration
- Service worker caching

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Accessibility Testing
- Automated WCAG compliance checks
- Screen reader compatibility
- Keyboard navigation testing

## 🔒 Security

### Best Practices
- Input validation
- XSS prevention
- CSRF protection
- Secure API communication

### Data Privacy
- Local storage encryption
- Secure transmission
- GDPR compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Recharts for data visualization
- Lucide React for icons
- Tailwind CSS for styling

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@projectkisan.com
- Documentation: [docs.projectkisan.com](https://docs.projectkisan.com)

---

**Built with ❤️ for Indian Farmers**
