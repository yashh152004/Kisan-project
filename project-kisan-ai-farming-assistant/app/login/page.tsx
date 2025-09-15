'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Phone, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuthStore, TEST_USERS } from '../../lib/authStore';

interface LoginFormData {
  mobile: string;
  otp: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [selectedTestUser, setSelectedTestUser] = useState('');
  const { login, verifyOtp, isLoading, otpSent, setOtpSent } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>();

  const mobile = watch('mobile');

  const handleMobileSubmit = async (data: LoginFormData) => {
    const success = await login(data.mobile);
    if (success) {
      setShowOtpInput(true);
      toast.success('OTP sent to your mobile number');
    } else {
      toast.error('Mobile number not found. Please try a test user.');
    }
  };

  const handleOtpSubmit = async (data: LoginFormData) => {
    const success = await verifyOtp(data.otp);
    if (success) {
      toast.success('Login successful!');
      router.push('/');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleSkipLogin = () => {
    router.push('/');
    toast.success('Continuing as guest');
  };

  const handleTestUserLogin = async (mobile: string) => {
    const success = await login(mobile);
    if (success) {
      toast.success('Logged in as test user');
      router.push('/');
    }
  };

  const handleBackToMobile = () => {
    setShowOtpInput(false);
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Project Kisan
          </h1>
          <p className="text-gray-600">
            {showOtpInput ? 'Enter OTP to continue' : 'Login to access your account'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {/* Back Button */}
          {showOtpInput && (
            <button
              onClick={handleBackToMobile}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to mobile number
            </button>
          )}

          {/* Mobile Number Form */}
          {!showOtpInput && (
            <form onSubmit={handleSubmit(handleMobileSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian mobile number',
                      },
                    })}
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {showOtpInput && (
            <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('otp', {
                      required: 'OTP is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a 6-digit OTP',
                      },
                    })}
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  In demo mode, any 6-digit number will work
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* Test Users Section */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Quick Login (Demo Mode)
            </h3>
            <div className="space-y-2">
              {TEST_USERS.map((user) => (
                <button
                  key={user.mobile}
                  onClick={() => handleTestUserLogin(user.mobile)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors disabled:opacity-50"
                >
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.mobile}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Skip Login Button */}
          <div className="border-t pt-6">
            <button
              onClick={handleSkipLogin}
              className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Skip Login (Continue as Guest)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Project Kisan - AI Farming Assistant
          </p>
        </div>
      </div>
    </div>
  );
} 