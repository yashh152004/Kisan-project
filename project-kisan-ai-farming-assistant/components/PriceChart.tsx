'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, MapPin, Calendar, DollarSign } from 'lucide-react'

interface PriceData {
  date: string
  price: number
  volume: number
  trend: 'up' | 'down' | 'stable'
}

interface MarketData {
  crop: string
  region: string
  currentPrice: number
  bestSellDay: string
  priceData: PriceData[]
}

export function PriceChart() {
  const [selectedCrop, setSelectedCrop] = useState('rice')
  const [selectedRegion, setSelectedRegion] = useState('karnataka')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'corn', name: 'Corn', icon: '🌽' },
    { id: 'cotton', name: 'Cotton', icon: '🧶' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' }
  ]

  const regions = [
    { id: 'karnataka', name: 'Karnataka', state: 'KA' },
    { id: 'maharashtra', name: 'Maharashtra', state: 'MH' },
    { id: 'tamilnadu', name: 'Tamil Nadu', state: 'TN' },
    { id: 'andhrapradesh', name: 'Andhra Pradesh', state: 'AP' }
  ]

  // Mock data - replace with real API
  const mockPriceData: PriceData[] = [
    { date: '2024-01-01', price: 1850, volume: 1200, trend: 'up' },
    { date: '2024-01-02', price: 1875, volume: 1350, trend: 'up' },
    { date: '2024-01-03', price: 1890, volume: 1100, trend: 'up' },
    { date: '2024-01-04', price: 1865, volume: 1400, trend: 'down' },
    { date: '2024-01-05', price: 1880, volume: 1250, trend: 'up' },
    { date: '2024-01-06', price: 1900, volume: 1300, trend: 'up' },
    { date: '2024-01-07', price: 1925, volume: 1150, trend: 'up' }
  ]

  const currentMarketData: MarketData = {
    crop: 'Rice',
    region: 'Karnataka',
    currentPrice: 1925,
    bestSellDay: '2024-01-15',
    priceData: mockPriceData
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      default: return '→'
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Crop Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Crop:</span>
          <div className="flex space-x-1">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCrop === crop.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {crop.icon} {crop.name}
              </button>
            ))}
          </div>
        </div>

        {/* Region Selector */}
        <div className="flex items-center space-x-2">
          <MapPin className="text-gray-600" size={16} />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="input-field py-1 px-3 text-sm"
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name} ({region.state})
              </option>
            ))}
          </select>
        </div>

        {/* Time Range */}
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-600" size={16} />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="input-field py-1 px-3 text-sm"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
        </div>
      </div>

      {/* Current Price Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Current Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(currentMarketData.currentPrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Best Sell Day</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(currentMarketData.bestSellDay).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">↗️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price Trend</p>
              <p className="text-lg font-semibold text-green-600">+4.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentMarketData.priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              />
              <YAxis 
                tickFormatter={(value) => `₹${value}`}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value}`, 'Price']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#34D399" 
                strokeWidth={3}
                dot={{ fill: '#34D399', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#34D399', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Volume</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentMarketData.priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: '2-digit' })}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'Volume']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Bar dataKey="volume" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Price Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Prices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Volume</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {currentMarketData.priceData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">
                    {new Date(data.date).toLocaleDateString('en-IN', { 
                      weekday: 'short', 
                      day: '2-digit', 
                      month: 'short' 
                    })}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    {formatPrice(data.price)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {data.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
                      <span>{getTrendIcon(data.trend)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 