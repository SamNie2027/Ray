import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';

const Causes = () => {
  const navigate = useNavigate();
  const [selectedCause, setSelectedCause] = useState(null);

  const causes = [
    {
      id: 1,
      name: 'Food and Poverty',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
      description: 'Help fight hunger and poverty'
    },
    {
      id: 2,
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
      description: 'Provide clothing to those in need'
    },
    {
      id: 3,
      name: 'Medicine and Health',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      description: 'Support healthcare and medical needs'
    },
    {
      id: 4,
      name: 'Civil Rights',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center',
      description: 'Advocate for civil rights and justice'
    },
    {
      id: 5,
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&crop=center',
      description: 'Support educational opportunities'
    },
    {
      id: 6,
      name: 'Animal Welfare',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d0400c0?w=400&h=300&fit=crop&crop=center',
      description: 'Protect and care for animals'
    },
    {
      id: 7,
      name: 'Disaster Relief',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      description: 'Provide relief during disasters'
    }
  ];

  const handleCauseSelect = (cause) => {
    setSelectedCause(cause);
    // Navigate to organizations page with selected cause
    navigate('/organizations', { state: { selectedCause: cause } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Header */}
      <div className="h-16 flex items-center px-6" style={{ backgroundColor: '#E06B3D' }}>
        <div className="w-8 h-8 flex items-center justify-center">
          {/* Heart with hands icon */}
          <div className="relative w-6 h-6">
            {/* Heart shape - yellow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-3 h-4 bg-yellow-400"></div>
            
            {/* Two yellow hands underneath the heart */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
              <div className="w-1 h-1.5 bg-yellow-400 rounded-full transform rotate-12"></div>
              <div className="w-1 h-1.5 bg-yellow-400 rounded-full transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker currentStep={1} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Donation Causes</h1>
          <p className="text-lg text-black">Choose a cause you would like to donate towards</p>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {causes.map((cause) => (
            <div
              key={cause.id}
              onClick={() => handleCauseSelect(cause)}
              className="relative cursor-pointer group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                {/* Background Image with Grayscale Filter */}
                <div
                  className="w-full h-full bg-cover bg-center filter grayscale"
                  style={{
                    backgroundImage: `url(${cause.image})`,
                    filter: 'grayscale(100%) brightness(0.7)'
                  }}
                ></div>
                
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-lg text-center px-2">
                    {cause.name}
                  </span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Causes;