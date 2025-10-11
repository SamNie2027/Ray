import { useState } from 'react';
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/UNICEF_Logo.svg/1200px-UNICEF_Logo.svg.png',
      description: 'United Nations Children\'s Fund'
    },
    {
      id: 2,
      name: 'The Salvation Army',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Salvation_Army.svg/1200px-Salvation_Army.svg.png',
      description: 'Christian charitable organization'
    },
    {
      id: 3,
      name: 'Cancer Care',
      logo: 'https://www.cancercare.org/sites/default/files/2021-03/cancercare-logo.png',
      description: 'Supporting cancer patients and families'
    },
    {
      id: 4,
      name: 'American Red Cross',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/American_Red_Cross_logo.svg/1200px-American_Red_Cross_logo.svg.png',
      description: 'Humanitarian organization'
    },
    {
      id: 5,
      name: 'The Marine Mammal Center',
      logo: 'https://www.marinemammalcenter.org/images/default-source/default-album/marine-mammal-center-logo.png',
      description: 'Marine mammal rescue and rehabilitation'
    },
    {
      id: 6,
      name: 'Helen Keller International',
      logo: 'https://www.hki.org/sites/default/files/2021-03/hki-logo.png',
      description: 'Preventing blindness and malnutrition'
    },
    {
      id: 7,
      name: 'Goodwill',
      logo: 'https://www.goodwill.org/wp-content/uploads/2021/03/goodwill-logo.png',
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
              <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 p-6 flex flex-col items-center justify-center">
                {/* Organization Logo */}
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="max-w-full max-h-full object-contain filter grayscale"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  {/* Fallback text if image fails to load */}
                  <div className="hidden text-2xl font-bold text-gray-600 text-center">
                    {org.name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                
                {/* Organization Name */}
                <div className="text-center">
                  <span className="text-black font-semibold text-sm text-center">
                    {org.name}
                  </span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organization;