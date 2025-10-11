import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const donationData = location.state;

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewStreak = () => {
    navigate('/streak');
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Success Icon */}
        <div className="mb-8">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#2D8B9C' }}
          >
            {/* White Checkmark */}
            <div className="relative w-16 h-16">
              <div className="absolute top-1/2 left-1/4 w-8 h-1 bg-white transform rotate-45 origin-left"></div>
              <div className="absolute top-1/2 left-1/4 w-4 h-1 bg-white transform -rotate-45 origin-left"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-black mb-6 text-center">
          Success!
        </h1>

        {/* Donation Confirmation */}
        <p className="text-lg text-black text-center mb-12 max-w-md">
          Your donation of ${donationData?.donationAmount || 5} successfully<br />
          went through and your streak<br />
          continues!
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          {/* View Streak button */}
          <button
            onClick={handleViewStreak}
            className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#E06B3D' }}
          >
            View your streak
          </button>

          {/* Continue to dashboard button */}
          <button
            onClick={handleContinueToDashboard}
            className="w-full py-4 px-6 rounded-lg text-black font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#D0D0D0' }}
          >
            Continue to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
