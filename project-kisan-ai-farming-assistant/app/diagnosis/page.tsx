'use client'

import { ImageUpload } from '@/components/ImageUpload'
import { VoiceInput } from '@/components/VoiceInput'
import { useState } from 'react'
import { Camera, Mic, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosisPage() {
  const [activeTab, setActiveTab] = useState<'image' | 'voice'>('image')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Crop Diagnosis</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'image'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Camera size={20} />
            <span>Image Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'voice'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mic size={20} />
            <span>Voice Analysis</span>
          </button>
        </div>

        {/* Content */}
        <div className="card">
          {activeTab === 'image' ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Crop Image</h2>
              <p className="text-gray-600 mb-6">
                Take a clear photo of the affected crop area. Our AI will analyze the image 
                and provide disease diagnosis along with treatment recommendations.
              </p>
              <ImageUpload />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Diagnosis</h2>
              <p className="text-gray-600 mb-6">
                Describe your crop problem in Kannada, Hindi, or English. Our AI will 
                understand your query and provide personalized farming advice.
              </p>
              <VoiceInput />
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📸 Best Photo Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Take photos in good lighting</li>
              <li>• Focus on the affected area</li>
              <li>• Include both healthy and diseased parts</li>
              <li>• Take multiple angles if needed</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎤 Voice Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Speak clearly and slowly</li>
              <li>• Describe symptoms in detail</li>
              <li>• Mention crop type and stage</li>
              <li>• Include weather conditions</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔬 Analysis Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 95% accuracy rate</li>
              <li>• Chemical & organic treatments</li>
              <li>• Prevention strategies</li>
              <li>• Expert consultation referral</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 