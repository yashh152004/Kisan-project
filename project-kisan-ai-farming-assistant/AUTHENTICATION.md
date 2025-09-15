# Project Kisan Authentication System

## Overview

This document describes the switchable authentication system implemented for Project Kisan, supporting both mock and Firebase authentication modes.

## Features

### ✅ Implemented
- **Mock Authentication Mode**: For development and demo purposes
- **Mobile Number Validation**: 10-digit Indian mobile number format
- **OTP Flow**: Send and verify OTP (mock implementation)
- **Test Users**: 5 predefined test users for quick login
- **Profile Management**: User profile page with account information
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **State Management**: Zustand store with persistence
- **Route Protection**: AuthGate component for protected routes

### 🔄 Future Implementation
- **Firebase Authentication**: Real SMS OTP integration
- **Role-based Access**: Different features for different user types
- **Session Management**: Advanced session handling
- **Security Features**: Rate limiting, brute force protection

## Test Users

| Mobile Number | Name | Role |
|---------------|------|------|
| 9876543210 | Rohan (Farmer) | farmer |
| 8765432109 | Priya (FPO Admin) | fpo_admin |
| 7654321098 | KVK Officer | kvk_officer |
| 6543210987 | Agri Dealer | agri_dealer |
| 5432109876 | Guest | guest |

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Authentication Mode (mock | firebase)
NEXT_PUBLIC_AUTH_MODE=mock

# Firebase Configuration (for future use)
# NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Usage

### Login Flow

1. **Navigate to `/login`**
2. **Enter Mobile Number**: Use any 10-digit Indian mobile number
3. **Send OTP**: Click "Send OTP" button
4. **Enter OTP**: Use any 6-digit number (in mock mode)
5. **Quick Login**: Use test user buttons for instant login
6. **Skip Login**: Continue as guest

### Test User Login

```javascript
// Quick login with test users
const { login } = useAuthStore();
await login('9876543210'); // Rohan (Farmer)
```

### Route Protection

```jsx
import AuthGate from '../components/AuthGate';

// Protect a route
<AuthGate requireAuth={true}>
  <ProtectedComponent />
</AuthGate>
```

### Profile Management

```jsx
import ProfileDropdown from '../components/ProfileDropdown';

// Add to navigation
<ProfileDropdown />
```

## File Structure

```
lib/
├── authStore.ts      # Zustand store for auth state
├── auth.ts          # Auth utility functions
components/
├── AuthGate.tsx     # Route protection component
├── ProfileDropdown.tsx # User profile dropdown
app/
├── login/
│   └── page.tsx     # Login page
├── profile/
│   └── page.tsx     # Profile page
└── page.tsx         # Updated with profile dropdown
```

## API Integration

### Mock Mode
- Accepts any valid mobile number
- Accepts any 6-digit OTP
- Simulates API delays
- Uses predefined test users

### Firebase Mode (Future)
- Real SMS OTP via Firebase Phone Auth
- Secure token-based authentication
- User data stored in Firebase
- Real-time session management

## State Management

### Auth Store (Zustand)

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  setUser: (user: User | null) => void;
  login: (mobile: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  setOtpSent: (sent: boolean) => void;
  setLoading: (loading: boolean) => void;
}
```

### Persistence
- User data persists across browser sessions
- Authentication state maintained on page refresh
- Automatic logout on token expiration (future)

## Security Considerations

### Current (Mock Mode)
- ✅ Input validation
- ✅ Mobile number format validation
- ✅ OTP format validation
- ✅ XSS protection via React
- ✅ CSRF protection via Next.js

### Future (Firebase Mode)
- 🔄 Real SMS verification
- 🔄 Rate limiting
- 🔄 Brute force protection
- 🔄 Token-based sessions
- 🔄 Secure cookie handling

## Development

### Adding New Test Users

```typescript
// In lib/authStore.ts
export const TEST_USERS = [
  // ... existing users
  { mobile: '1234567890', name: 'New User', role: 'farmer' },
];
```

### Switching Auth Modes

```bash
# Mock mode (development)
NEXT_PUBLIC_AUTH_MODE=mock

# Firebase mode (production)
NEXT_PUBLIC_AUTH_MODE=firebase
```

### Customizing UI

The authentication components use Tailwind CSS classes and can be customized by modifying:

- `app/login/page.tsx` - Login page styling
- `components/ProfileDropdown.tsx` - Profile dropdown styling
- `app/profile/page.tsx` - Profile page styling

## Troubleshooting

### Common Issues

1. **Login not working**: Check if mobile number is in test users list
2. **OTP not accepted**: Ensure 6-digit format in mock mode
3. **Profile not showing**: Check if user is authenticated
4. **Route protection not working**: Verify AuthGate implementation

### Debug Mode

```javascript
// Enable debug logging
localStorage.setItem('debug', 'auth');
```

## Next Steps

1. **Implement Firebase Authentication**
2. **Add role-based access control**
3. **Implement session management**
4. **Add security features**
5. **Create admin dashboard**
6. **Add user management**

## Support

For issues or questions about the authentication system, please refer to the project documentation or create an issue in the repository. 