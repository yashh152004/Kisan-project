import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock analysis result
    const mockResult = {
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
      description: 'Leaf blight is a fungal disease that causes brown spots on leaves. It spreads rapidly in humid conditions and can significantly reduce crop yield if not treated promptly.',
      prevention: [
        'Maintain proper spacing between plants',
        'Avoid overhead irrigation',
        'Remove and destroy infected plant debris',
        'Use disease-resistant varieties'
      ],
      severity: 'moderate',
      affectedArea: 'leaves',
      cropType: 'rice'
    }

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
} 