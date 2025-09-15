'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuthStore, TEST_USERS } from '../lib/authStore';
import { toast } from 'react-hot-toast';
import ProfileImageEditor from './ProfileImageEditor';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <User className="w-4 h-4 mr-2" />
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
              <button
          onClick={handleProfileClick}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ProfileImageEditor size="sm" showUploadButton={false} />
          <span className="hidden sm:block">{user.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              <ProfileImageEditor size="md" showUploadButton={true} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.mobile}</p>
                {user.role && (
                  <p className="text-xs text-green-600 capitalize">{user.role.replace('_', ' ')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/profile');
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3" />
              Profile Settings
            </button>
            <button
              onClick={() => setShowSwitch((v) => !v)}
              className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <User className="w-4 h-4 mr-3" />
              Switch Account
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>

          {/* Switch Account Dropdown */}
          {showSwitch && (
            <div className="border-t pt-2 px-2">
              <div className="text-xs text-gray-500 mb-2 px-2">Switch to:</div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {TEST_USERS.map((testUser) => (
                  <button
                    key={testUser.mobile}
                    disabled={user.mobile === testUser.mobile}
                    onClick={() => {
                      setUser(testUser);
                      setShowSwitch(false);
                      setIsOpen(false);
                      toast.success(`Switched to ${testUser.name}`);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${user.mobile === testUser.mobile ? 'bg-green-100 text-gray-400 cursor-not-allowed' : 'hover:bg-green-50 text-gray-700'}`}
                  >
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    <span className="flex-1 text-left">{testUser.name}</span>
                    <span className="text-xs text-gray-400">{testUser.mobile}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 