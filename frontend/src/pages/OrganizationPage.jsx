import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';

const Organization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCause = location.state?.selectedCause;
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const organizations = [
    {
      id: 1,
      name: 'Unicef',
      logo: '/organizations/unicef.png',
      description: 'United Nations Children\'s Fund'
    },
    {
      id: 2,
      name: 'The Salvation Army',
      logo: '/organizations/the-salvation-army.png',
      description: 'Christian charitable organization'
    },
    {
      id: 3,
      name: 'Cancer Care',
      logo: '/organizations/cancer-care.png',
      description: 'Supporting cancer patients and families'
    },
    {
      id: 4,
      name: 'American Red Cross',
      logo: '/organizations/american-red-cross.png',
      description: 'Humanitarian organization'
    },
    {
      id: 5,
      name: 'The Marine Mammal Center',
      logo: '/organizations/the-marine-mammal-center.png',
      description: 'Marine mammal rescue and rehabilitation'
    },
    {
      id: 6,
      name: 'Helen Keller International',
      logo: '/organizations/helen-keller-international.png',
      description: 'Preventing blindness and malnutrition'
    },
    {
      id: 7,
      name: 'Goodwill',
      logo: '/organizations/goodwill.png',
      description: 'Job training and employment services'
    }
  ];

  const handleOrganizationSelect = (organization) => {
    setSelectedOrganization(organization);
    // Navigate to payment page with selected cause and organization
    navigate('/donations', { 
      state: { 
        selectedCause: selectedCause,
        selectedOrganization: organization 
      } 
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Header */}
      <div className="h-16 flex items-center px-6" style={{ backgroundColor: '#E06B3D' }}>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker currentStep={2} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Organizations</h1>
          <p className="text-lg text-black">Choose an organization you would like to donate towards</p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => handleOrganizationSelect(org)}
              className="relative cursor-pointer group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                {/* Background Image with Grayscale Filter */}
                <div
                  className="w-full h-full bg-cover bg-center filter grayscale"
                  style={{
                    backgroundImage: `url(${org.logo})`,
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

export default Organization;