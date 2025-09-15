'use client';

import { User } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';

interface ProfileImageDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showOriginal?: boolean; // If true, shows original image, otherwise shows cropped profile image
}

export default function ProfileImageDisplay({ 
  size = 'md', 
  className = '',
  showOriginal = false
}: ProfileImageDisplayProps) {
  const { user } = useAuthStore();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  // Choose which image to display
  const imageToShow = showOriginal ? user?.originalImage : user?.profileImage;

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full overflow-hidden">
        {imageToShow ? (
          <img
            src={imageToShow}
            alt="Profile"
            className={`w-full h-full object-cover ${showOriginal ? 'rounded-lg' : 'rounded-full'}`}
          />
        ) : (
          <div className={`w-full h-full bg-green-100 flex items-center justify-center ${showOriginal ? 'rounded-lg' : 'rounded-full'}`}>
            <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-16 h-16' : 'w-24 h-24'} text-green-600`} />
          </div>
        )}
      </div>
    </div>
  );
} 