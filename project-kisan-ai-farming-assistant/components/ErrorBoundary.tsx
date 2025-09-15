'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetError}
              className="btn-primary flex items-center justify-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary flex items-center justify-center"
            >
              <Home size={16} className="mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error)
    setError(error)
  }, [])

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, resetError }
}

// Component for API error handling
export function ApiErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isTimeoutError = error.message.includes('timeout')
  const isServerError = error.message.includes('500') || error.message.includes('server')

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'Network connection error. Please check your internet connection and try again.'
    }
    if (isTimeoutError) {
      return 'Request timed out. Please try again.'
    }
    if (isServerError) {
      return 'Server error. Please try again later.'
    }
    return 'An unexpected error occurred. Please try again.'
  }

  const getErrorIcon = () => {
    if (isNetworkError) return '📡'
    if (isTimeoutError) return '⏰'
    if (isServerError) return '🔧'
    return '⚠️'
  }

  return (
    <div className="card text-center">
      <div className="text-4xl mb-4">{getErrorIcon()}</div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {isNetworkError ? 'Connection Error' : 
         isTimeoutError ? 'Timeout Error' :
         isServerError ? 'Server Error' : 'Error'}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {getErrorMessage()}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={resetError}
          className="btn-primary flex items-center justify-center"
        >
          <RefreshCw size={16} className="mr-2" />
          Retry
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary flex items-center justify-center"
        >
          <RefreshCw size={16} className="mr-2" />
          Reload Page
        </button>
      </div>
    </div>
  )
}

// Hook for API error handling
export function useApiError() {
  const [apiError, setApiError] = React.useState<Error | null>(null)

  const handleApiError = React.useCallback((error: Error) => {
    console.error('API Error:', error)
    setApiError(error)
  }, [])

  const clearApiError = React.useCallback(() => {
    setApiError(null)
  }, [])

  return { apiError, handleApiError, clearApiError }
} 