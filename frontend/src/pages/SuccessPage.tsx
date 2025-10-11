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
    <div className="min-h-screen mt-18" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Success Icon */}
        <div className="mb-8">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#2D8B9C' }}
          >
            {/* White Checkmark */}
            <div className="relative text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
              </svg>
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
