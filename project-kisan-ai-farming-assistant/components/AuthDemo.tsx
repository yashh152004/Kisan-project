'use client';

import { useAuthStore, TEST_USERS } from '../lib/authStore';
import { User, LogOut, Shield, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProfileImageEditor from './ProfileImageEditor';

export default function AuthDemo() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleQuickLogin = async (mobile: string) => {
    const { login } = useAuthStore.getState();
    const success = await login(mobile);
    if (success) {
      toast.success('Logged in successfully!');
    } else {
      toast.error('Login failed');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-600" />
          Authentication Demo
        </h2>
        <div className="text-sm text-gray-500">
          Mode: <span className="font-medium text-green-600">Mock</span>
        </div>
      </div>

      {/* Current User Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Current Status</h3>
        {isAuthenticated && user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ProfileImageEditor size="sm" showUploadButton={false} />
              <div className="ml-3">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.mobile}</p>
                {user.role && (
                  <p className="text-xs text-green-600 capitalize">{user.role.replace('_', ' ')}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Not Logged In</p>
                <p className="text-sm text-gray-500">Guest mode</p>
              </div>
            </div>
            <a
              href="/login"
              className="flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              Login
            </a>
          </div>
        )}
      </div>

      {/* Quick Login Buttons */}
      {!isAuthenticated && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Login (Test Users)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TEST_USERS.map((testUser) => (
              <button
                key={testUser.mobile}
                onClick={() => handleQuickLogin(testUser.mobile)}
                className="flex items-center p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{testUser.name}</p>
                  <p className="text-xs text-gray-500">{testUser.mobile}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demo Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Demo Mode Active</h4>
            <p className="text-sm text-blue-700">
              This is a mock authentication system for demonstration purposes. 
              In production, this would be connected to Firebase or another authentication service.
            </p>
            <ul className="text-xs text-blue-600 mt-2 space-y-1">
              <li>• Any 10-digit mobile number is accepted</li>
              <li>• Any 6-digit OTP is accepted</li>
              <li>• Test users provide instant login</li>
              <li>• User data persists across sessions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Available Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Profile Management</p>
              <p className="text-xs text-gray-500">View and manage account</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Route Protection</p>
              <p className="text-xs text-gray-500">Secure protected pages</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Role-based Access</p>
              <p className="text-xs text-gray-500">Different user roles</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <Shield className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Session Persistence</p>
              <p className="text-xs text-gray-500">Stay logged in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 