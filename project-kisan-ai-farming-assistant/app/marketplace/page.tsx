'use client'

import { PriceChart } from '@/components/PriceChart'
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">₹2.4M</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-sm text-green-600 mt-2">+12.5% from yesterday</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Markets</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <BarChart3 className="text-blue-500" size={24} />
            </div>
            <p className="text-sm text-blue-600 mt-2">4 new markets today</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">₹1,850</p>
              </div>
              <DollarSign className="text-yellow-500" size={24} />
            </div>
            <p className="text-sm text-yellow-600 mt-2">+3.2% this week</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price Trend</p>
                <p className="text-2xl font-bold text-gray-900">Bullish</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-sm text-green-600 mt-2">Strong demand</p>
          </div>
        </div>

        {/* Price Charts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Real-time Price Charts</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Live data</span>
            </div>
          </div>
          <PriceChart />
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Rice Prices</p>
                  <p className="text-sm text-gray-600">Expected to rise 8-12%</p>
                </div>
                <TrendingUp className="text-green-600" size={20} />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Wheat Supply</p>
                  <p className="text-sm text-gray-600">Stable supply expected</p>
                </div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Cotton Demand</p>
                  <p className="text-sm text-gray-600">Decreasing demand</p>
                </div>
                <TrendingDown className="text-red-600" size={20} />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Tips</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Best Selling Days</h4>
                <p className="text-sm text-gray-600">
                  Tuesday and Wednesday typically have the highest prices due to increased 
                  market activity and demand from processing units.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Storage Recommendations</h4>
                <p className="text-sm text-gray-600">
                  Consider storing grains in proper conditions to sell during peak demand 
                  periods when prices are 15-20% higher.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Market Timing</h4>
                <p className="text-sm text-gray-600">
                  Early morning (6-9 AM) and late afternoon (4-6 PM) are optimal times 
                  for better price discovery and negotiations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Price Alerts</h3>
            <p className="text-gray-600 text-sm">
              Get notified when crop prices reach your target levels
            </p>
          </button>
          
          <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Analysis</h3>
            <p className="text-gray-600 text-sm">
              Detailed reports on market trends and price predictions
            </p>
          </button>
          
          <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Traders</h3>
            <p className="text-gray-600 text-sm">
              Direct connection with verified buyers and sellers
            </p>
          </button>
        </div>
      </div>
    </div>
  )
} 