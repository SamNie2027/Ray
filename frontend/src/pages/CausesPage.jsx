import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';

const Causes = () => {
  const navigate = useNavigate();
  const [selectedCause, setSelectedCause] = useState(null);

  const causes = [
    {
      id: 1,
      name: 'Food and Poverty',
      image: '/causes/food-and-poverty.png',
      description: 'Help fight hunger and poverty'
    },
    {
      id: 2,
      name: 'Clothing',
      image: '/causes/clothing.png',
      description: 'Provide clothing to those in need'
    },
    {
      id: 3,
      name: 'Medicine and Health',
      image: '/causes/medicine-and-health.png',
      description: 'Support healthcare and medical needs'
    },
    {
      id: 4,
      name: 'Civil Rights',
      image: '/causes/civil-rights.png',
      description: 'Advocate for civil rights and justice'
    },
    {
      id: 5,
      name: 'Education',
      image: '/causes/education.png',
      description: 'Support educational opportunities'
    },
    {
      id: 6,
      name: 'Animal Welfare',
      image: '/causes/animal-relief.png',
      description: 'Protect and care for animals'
    },
    {
      id: 7,
      name: 'Disaster Relief',
      image: '/causes/disaster-relief.png',
      description: 'Provide relief during disasters'
    }
  ];

  const handleCauseSelect = (cause) => {
    setSelectedCause(cause);
    // Navigate to organizations page with selected cause
    navigate('/organizations', { state: { selectedCause: cause } });
  };

  return (
    <div className="min-h-screen mt-18" style={{ backgroundColor: '#F8F8F8' }}>
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
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
  
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Causes;
