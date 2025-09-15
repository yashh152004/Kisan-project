// Authentication utility functions

export const AUTH_MODE = process.env.NEXT_PUBLIC_AUTH_MODE || 'mock';

export const isMockMode = () => AUTH_MODE === 'mock';
export const isFirebaseMode = () => AUTH_MODE === 'firebase';

// Mock authentication functions
export const mockAuth = {
  sendOtp: async (mobile: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // Always succeed in mock mode
  },

  verifyOtp: async (mobile: string, otp: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Accept any 6-digit OTP in mock mode
    return /^\d{6}$/.test(otp);
  },

  loginWithMobile: async (mobile: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // Always succeed in mock mode
  }
};

// Firebase authentication functions (for future implementation)
export const firebaseAuth = {
  sendOtp: async (mobile: string): Promise<boolean> => {
    // TODO: Implement Firebase Phone Auth
    console.log('Firebase OTP not implemented yet');
    return false;
  },

  verifyOtp: async (mobile: string, otp: string): Promise<boolean> => {
    // TODO: Implement Firebase Phone Auth verification
    console.log('Firebase OTP verification not implemented yet');
    return false;
  },

  loginWithMobile: async (mobile: string): Promise<boolean> => {
    // TODO: Implement Firebase Phone Auth
    console.log('Firebase login not implemented yet');
    return false;
  }
};

// Export the appropriate auth functions based on mode
export const auth = isMockMode() ? mockAuth : firebaseAuth; 