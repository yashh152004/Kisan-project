import { Camera, Mic, TrendingUp, Gift, Star } from 'react-feather';
import Tooltip from './Tooltip';
import { useRouter } from 'next/navigation';

const features = [
  {
    id: 'voice',
    title: 'Voice Analysis',
    icon: <Mic className="text-green-600" aria-label="Voice Analysis" />,
    description: 'Speak in your language for instant advice',
    priority: 'Most Used',
    demo: 'Try voice input for crop queries!',
  },
  {
    id: 'image',
    title: 'Crop Diagnosis',
    icon: <Camera className="text-blue-600" aria-label="Crop Diagnosis" />,
    description: 'Upload crop images for AI diagnosis',
    priority: '',
    demo: 'See how image upload works!',
  },
  {
    id: 'market',
    title: 'Market Prices',
    icon: <TrendingUp className="text-orange-600" aria-label="Market Prices" />,
    description: 'Check real-time crop prices',
    priority: '',
    demo: 'Explore price trends!',
  },
  {
    id: 'subsidies',
    title: 'Govt. Schemes',
    icon: <Gift className="text-purple-600" aria-label="Government Schemes" />,
    description: 'Find and apply for subsidies',
    priority: '',
    demo: 'Browse available schemes!',
  },
];

export default function FeatureCards({ setActiveFeature }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {features.map((feature) => (
        <div
          key={feature.id}
          tabIndex={0}
          className="flex flex-col items-center p-3 bg-white rounded-xl border shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-400 transition-all relative group cursor-pointer"
          aria-label={feature.title}
          role="button"
          onClick={() => {
            if (feature.id === 'voice' || feature.id === 'image') {
              setActiveFeature && setActiveFeature(feature.id);
            } else if (feature.id === 'market') {
              router.push('/marketplace');
            } else if (feature.id === 'subsidies') {
              router.push('/subsidies');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (feature.id === 'voice' || feature.id === 'image') {
                setActiveFeature && setActiveFeature(feature.id);
              } else if (feature.id === 'market') {
                router.push('/marketplace');
              } else if (feature.id === 'subsidies') {
                router.push('/subsidies');
              }
            }
          }}
        >
          <div className="mb-2">{feature.icon}</div>
          <div className="text-xs font-bold text-gray-800 text-center">{feature.title}</div>
          {feature.priority && (
            <span className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} /> {feature.priority}
            </span>
          )}
          <Tooltip text={feature.demo}>
            <span className="mt-1 text-[10px] text-gray-500 group-hover:underline cursor-help">
              {feature.description}
            </span>
          </Tooltip>
        </div>
      ))}
    </div>
  );
} 