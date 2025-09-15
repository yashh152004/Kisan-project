'use client'

import { useState } from 'react'
import { ArrowLeft, Filter, Search, Download, Share2, Calendar, MapPin, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface Scheme {
  id: string
  title: string
  description: string
  amount: string
  deadline: string
  category: string
  state: string
  eligibility: string[]
  documents: string[]
  status: 'active' | 'upcoming' | 'closed'
}

export default function SubsidiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedState, setSelectedState] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'seeds', name: 'Seeds & Fertilizers' },
    { id: 'equipment', name: 'Farm Equipment' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'insurance', name: 'Crop Insurance' },
    { id: 'storage', name: 'Storage & Processing' }
  ]

  const states = [
    { id: 'all', name: 'All States' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'andhrapradesh', name: 'Andhra Pradesh' }
  ]

  const schemes: Scheme[] = [
    {
      id: '1',
      title: 'PM-KISAN Direct Benefit Transfer',
      description: 'Direct income support of ₹6,000 per year to eligible farmer families',
      amount: '₹6,000/year',
      deadline: '2024-03-31',
      category: 'income',
      state: 'All India',
      eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares'],
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
      status: 'active'
    },
    {
      id: '2',
      title: 'Karnataka Seed Subsidy Scheme',
      description: '50% subsidy on certified seeds for paddy, wheat, and pulses',
      amount: 'Up to ₹5,000',
      deadline: '2024-02-15',
      category: 'seeds',
      state: 'Karnataka',
      eligibility: ['Registered farmers', 'Minimum 1 acre land'],
      documents: ['Farmer ID Card', 'Land Documents', 'Seed Purchase Receipts'],
      status: 'active'
    },
    {
      id: '3',
      title: 'PM Fasal Bima Yojana',
      description: 'Comprehensive crop insurance scheme covering natural calamities',
      amount: 'Premium: 1.5-5% of sum insured',
      deadline: '2024-01-31',
      category: 'insurance',
      state: 'All India',
      eligibility: ['All farmers', 'Loanee and non-loanee farmers'],
      documents: ['Aadhaar Card', 'Land Records', 'Crop Details'],
      status: 'active'
    },
    {
      id: '4',
      title: 'Agricultural Equipment Subsidy',
      description: 'Subsidy for purchase of tractors, harvesters, and other farm machinery',
      amount: 'Up to ₹1,25,000',
      deadline: '2024-04-30',
      category: 'equipment',
      state: 'Maharashtra',
      eligibility: ['Small farmers', 'SC/ST farmers', 'Women farmers'],
      documents: ['Farmer Certificate', 'Equipment Quotation', 'Bank Loan Sanction'],
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Micro Irrigation Scheme',
      description: 'Subsidy for drip and sprinkler irrigation systems',
      amount: 'Up to ₹50,000',
      deadline: '2024-03-15',
      category: 'irrigation',
      state: 'Tamil Nadu',
      eligibility: ['Horticulture farmers', 'Minimum 0.5 acre land'],
      documents: ['Land Documents', 'Soil Test Report', 'Technical Feasibility'],
      status: 'active'
    }
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
    const matchesState = selectedState === 'all' || scheme.state.toLowerCase().includes(selectedState)
    const matchesStatus = selectedStatus === 'all' || scheme.status === selectedStatus

    return matchesSearch && matchesCategory && matchesState && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const shareScheme = (scheme: Scheme) => {
    if (navigator.share) {
      navigator.share({
        title: scheme.title,
        text: `${scheme.title}\n${scheme.description}\nAmount: ${scheme.amount}`,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `${scheme.title}\n${scheme.description}\nAmount: ${scheme.amount}\nDeadline: ${scheme.deadline}`
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Government Schemes</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field py-2 px-3 text-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="input-field py-2 px-3 text-sm"
              >
                {states.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field py-2 px-3 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map(scheme => (
            <div key={scheme.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{scheme.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-green-500" size={16} />
                      <span className="text-sm text-gray-600">Amount: <span className="font-medium text-gray-900">{scheme.amount}</span></span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-600">Deadline: <span className="font-medium text-gray-900">{new Date(scheme.deadline).toLocaleDateString()}</span></span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-purple-500" size={16} />
                      <span className="text-sm text-gray-600">State: <span className="font-medium text-gray-900">{scheme.state}</span></span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Eligibility:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {scheme.eligibility.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                    <div className="flex flex-wrap gap-2">
                      {scheme.documents.map((doc, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 lg:ml-4">
                  <button className="btn-primary">
                    <Download size={16} className="mr-2" />
                    Apply Now
                  </button>
                  <button 
                    onClick={() => shareScheme(scheme)}
                    className="btn-secondary"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 