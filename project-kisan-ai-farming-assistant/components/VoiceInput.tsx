'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2, Languages } from 'lucide-react'
import toast from 'react-hot-toast'

interface VoiceInputProps {
  onTranscript?: (text: string) => void
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>('en')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ]

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'kn-IN'
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true)
        toast.success('Recording started')
      }
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          onTranscript?.(finalTranscript)
        }
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        toast.error('Speech recognition error')
      }
      
      recognitionRef.current.onend = () => {
        setIsRecording(false)
        toast.success('Recording stopped')
      }
    }
  }, [language, onTranscript])

  const toggleRecording = () => {
    if (!isSupported) {
      toast.error('Speech recognition not supported in this browser')
      return
    }

    if (isRecording) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  const clearTranscript = () => {
    setTranscript('')
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex items-center space-x-4">
        <Languages className="text-gray-600" size={20} />
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as 'en' | 'hi' | 'kn')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                language === lang.code
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recording Interface */}
      <div className="text-center">
        <button
          onClick={toggleRecording}
          disabled={!isSupported}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 haptic-feedback ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse-slow'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
        
        <p className="mt-4 text-gray-600">
          {isRecording ? 'Recording... Speak now' : 'Click to start recording'}
        </p>
      </div>

      {/* Waveform Visualization */}
      {isRecording && (
        <div className="flex justify-center">
          <div className="voice-wave">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="voice-wave-bar"
                style={{
                  height: `${Math.random() * 40 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Transcript Display */}
      {transcript && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transcript</h3>
            <button
              onClick={clearTranscript}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-800">{transcript}</p>
          </div>
          
          <div className="flex space-x-2">
            <button className="btn-primary">
              <Volume2 size={16} className="mr-2" />
              Listen
            </button>
            <button className="btn-secondary">
              Share
            </button>
          </div>
        </div>
      )}

      {/* Browser Support Warning */}
      {!isSupported && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.
          </p>
        </div>
      )}
    </div>
  )
} 