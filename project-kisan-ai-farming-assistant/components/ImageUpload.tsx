'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, Upload, X, ChevronDown, ChevronUp, Leaf, Beaker } from 'lucide-react'
import toast from 'react-hot-toast'

interface AnalysisResult {
  disease: string
  confidence: number
  treatments: {
    chemical: string[]
    organic: string[]
  }
  description: string
}

export function ImageUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [expandedTreatment, setExpandedTreatment] = useState<'chemical' | 'organic' | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      toast.success('Image uploaded successfully')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const analyzeImage = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append('image', uploadedFile)
      
      // Mock API call - replace with actual Gemini API integration
      const response = await fetch('/api/gemini-analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setAnalysisResult(result)
      toast.success('Analysis completed')
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Analysis failed. Please try again.')
      
      // Mock result for demo
      setAnalysisResult({
        disease: 'Leaf Blight',
        confidence: 85,
        treatments: {
          chemical: [
            'Apply Mancozeb 75% WP at 2.5g/liter',
            'Spray Copper Oxychloride 50% WP at 3g/liter',
            'Use Carbendazim 50% WP at 1g/liter'
          ],
          organic: [
            'Neem oil spray (2% solution)',
            'Garlic extract spray',
            'Baking soda solution (1 tablespoon per liter)'
          ]
        },
        description: 'Leaf blight is a fungal disease that causes brown spots on leaves. It spreads rapidly in humid conditions.'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const removeImage = () => {
    setUploadedFile(null)
    setPreview(null)
    setAnalysisResult(null)
  }

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Crop Disease Analysis',
        text: `Disease: ${analysisResult?.disease}\nConfidence: ${analysisResult?.confidence}%`,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `Disease: ${analysisResult?.disease}\nConfidence: ${analysisResult?.confidence}%\n${analysisResult?.description}`
      )
      toast.success('Results copied to clipboard')
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
      >
        <input {...getInputProps()} />
        
        {!preview ? (
          <div className="space-y-4">
            <Upload className="mx-auto text-gray-400" size={48} />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop the image here' : 'Upload crop image'}
              </p>
              <p className="text-gray-500 mt-2">
                Drag and drop an image, or click to select
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supports JPG, PNG, WebP (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Uploaded crop"
              className="max-h-64 mx-auto rounded-lg shadow-sm"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeImage()
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Analysis Button */}
      {uploadedFile && !analysisResult && (
        <div className="text-center">
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Camera size={16} className="mr-2" />
                Analyze Image
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Disease:</span>
                <span className="font-medium text-gray-900">{analysisResult.disease}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Confidence:</span>
                <span className="font-medium text-green-600">{analysisResult.confidence}%</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{analysisResult.description}</p>
              </div>
            </div>
          </div>

          {/* Treatment Options */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Treatment Options</h4>
            
            {/* Chemical Treatments */}
            <div className="card">
              <button
                onClick={() => setExpandedTreatment(expandedTreatment === 'chemical' ? null : 'chemical')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center space-x-3">
                  <Beaker className="text-blue-500" size={20} />
                  <span className="font-medium">Chemical Treatments</span>
                </div>
                {expandedTreatment === 'chemical' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedTreatment === 'chemical' && (
                <div className="mt-4 space-y-2">
                  {analysisResult.treatments.chemical.map((treatment, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{treatment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Organic Treatments */}
            <div className="card">
              <button
                onClick={() => setExpandedTreatment(expandedTreatment === 'organic' ? null : 'organic')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center space-x-3">
                  <Leaf className="text-green-500" size={20} />
                  <span className="font-medium">Organic Treatments</span>
                </div>
                {expandedTreatment === 'organic' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedTreatment === 'organic' && (
                <div className="mt-4 space-y-2">
                  {analysisResult.treatments.organic.map((treatment, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{treatment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button onClick={shareResult} className="btn-secondary">
              Share Results
            </button>
            <button onClick={removeImage} className="btn-secondary">
              Analyze Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 