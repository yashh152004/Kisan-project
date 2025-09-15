'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, User, Crop, RotateCw } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';
import { toast } from 'react-hot-toast';
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ProfileImageEditorProps {
  size?: 'sm' | 'md' | 'lg';
  showUploadButton?: boolean;
  className?: string;
  allowRemove?: boolean; // NEW PROP
}

export default function ProfileImageEditor({ 
  size = 'md', 
  showUploadButton = true,
  className = '',
  allowRemove = false // NEW DEFAULT
}: ProfileImageEditorProps) {
  const { user, updateProfileImage, updateOriginalImage } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropType>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-32 h-32'
  };

  const handleImageSelect = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
      // Store the original image immediately
      updateOriginalImage(imageData);
      setIsModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getCroppedImg = useCallback(
    (imageSrc: string, crop: PixelCrop, rotation = 0): Promise<string> => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(imageSrc);
            return;
          }

          // Calculate scale between displayed image and actual image
          const scaleX = image.naturalWidth / (imgRef.current?.width || image.width);
          const scaleY = image.naturalHeight / (imgRef.current?.height || image.height);

          // Map crop coordinates to actual image size
          const cropX = crop.x * scaleX;
          const cropY = crop.y * scaleY;
          const cropWidth = crop.width * scaleX;
          const cropHeight = crop.height * scaleY;

          // Set canvas size to crop size
          canvas.width = cropWidth;
          canvas.height = cropHeight;

          // Move to center, rotate, then move back
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);

          ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
          );

          ctx.restore();

          resolve(canvas.toDataURL('image/jpeg'));
        };
      });
    },
    []
  );

  const handleSaveCrop = async () => {
    if (!selectedImage || !completedCrop) return;

    try {
      const croppedImage = await getCroppedImg(selectedImage, completedCrop, rotation);
      updateProfileImage(croppedImage);
      setIsModalOpen(false);
      setSelectedImage(null);
      setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
      setRotation(0);
      toast.success('Profile image updated successfully!');
    } catch (error) {
      toast.error('Failed to crop image');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
    setRotation(0);
  };

  const handleRemoveImage = () => {
    updateProfileImage('');
    updateOriginalImage('');
    toast.success('Profile image removed');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Profile Image Display */}
      <div 
        className={`relative ${sizeClasses[size]} ${className}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden cursor-pointer group">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
              <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-16 h-16'} text-green-600`} />
            </div>
          )}
          
          {/* Upload Overlay */}
          {showUploadButton && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <button
                onClick={triggerFileInput}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-1 hover:bg-opacity-100"
              >
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Remove Button (only for users with profile image) */}
        {user?.profileImage && showUploadButton && allowRemove && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Image Cropping Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Crop Profile Image</h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Cropper */}
                <div className="flex justify-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    circularCrop
                  >
                    <img
                      ref={imgRef}
                      src={selectedImage}
                      alt="Crop preview"
                      style={{ transform: `rotate(${rotation}deg)` }}
                      className="max-h-96 object-contain"
                    />
                  </ReactCrop>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setRotation((prev) => prev - 90)}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Rotate Left
                  </button>
                  
                  <button
                    onClick={() => setRotation((prev) => prev + 90)}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCw className="w-4 h-4 mr-2 rotate-180" />
                    Rotate Right
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCrop}
                    disabled={!completedCrop}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Crop className="w-4 h-4 mr-2 inline" />
                    Save Crop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 