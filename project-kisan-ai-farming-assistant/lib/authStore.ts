import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, isMockMode } from './auth';

export interface User {
  mobile: string;
  name: string;
  role?: string;
  profileImage?: string; // Cropped circular image for profile display
  originalImage?: string; // Full original image
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  setUser: (user: User | null) => void;
  updateProfileImage: (imageData: string) => void;
  updateOriginalImage: (imageData: string) => void;
  login: (mobile: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  setOtpSent: (sent: boolean) => void;
  setLoading: (loading: boolean) => void;
}

// Test users for mock authentication
export const TEST_USERS = [
  { mobile: '9876543210', name: 'Rohan (Farmer)', role: 'farmer' },
  { mobile: '8765432109', name: 'Priya (FPO Admin)', role: 'fpo_admin' },
  { mobile: '7654321098', name: 'KVK Officer', role: 'kvk_officer' },
  { mobile: '6543210987', name: 'Agri Dealer', role: 'agri_dealer' },
  { mobile: '5432109876', name: 'Guest', role: 'guest' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      updateProfileImage: (imageData: string) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              profileImage: imageData
            }
          });
        }
      },

      updateOriginalImage: (imageData: string) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              originalImage: imageData
            }
          });
        }
      },

      login: async (mobile: string) => {
        set({ isLoading: true });
        
        // Use auth utility functions
        const success = await auth.loginWithMobile(mobile);
        
        if (success) {
          // In mock mode, find test user or create a generic one
          const testUser = TEST_USERS.find(user => user.mobile === mobile) || {
            mobile,
            name: `User (${mobile})`,
            role: 'farmer'
          };
          
          set({ 
            user: testUser, 
            isAuthenticated: true, 
            isLoading: false,
            otpSent: true 
          });
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },

      verifyOtp: async (otp: string) => {
        set({ isLoading: true });
        
        const { user } = get();
        if (!user) {
          set({ isLoading: false });
          return false;
        }
        
        // Use auth utility functions
        const success = await auth.verifyOtp(user.mobile, otp);
        
        if (success) {
          set({ isLoading: false, otpSent: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        otpSent: false 
      }),

      setOtpSent: (sent) => set({ otpSent: sent }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 