import { useNavigate } from 'react-router-dom';

const StreakPage = () => {
  const navigate = useNavigate();

  const handleShareProgress = () => {
    // TODO: Implement share functionality
    console.log('Share progress clicked');
  };

  const handleDonateToOtherCauses = () => {
    navigate('/causes');
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen mt-18" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Central Celebration Graphic */}
        <div className="flex items-center justify-center mb-8">
          {/* Left hand - yellow emoji style */}
          <div className="mr-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="text-5xl">👏</div>
            </div>
          </div>
          
          {/* Large number 1 with teal color and subtle glow */}
          <div className="relative">
            <div 
              className="text-9xl font-bold text-center"
              style={{ 
                color: '#14B8A6',
                textShadow: '0 0 15px rgba(20, 184, 166, 0.4)',
                filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.2))'
              }}
            >
              1
            </div>
          </div>
          
          {/* Right hand - yellow emoji style */}
          <div className="ml-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="text-5xl">👏</div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-black mb-4 text-center">
          You have a 1 day streak
        </h1>

        {/* Sub-text */}
        <p className="text-lg text-black text-center mb-12 max-w-md">
          Your donation successfully went through and your streak continues!
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          {/* Share your progress button - burnt orange */}
          <button
            onClick={handleShareProgress}
            className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#E06B3D' }}
          >
            Share your progress
          </button>

          {/* Donate to other causes button - light grey */}
          <button
            onClick={handleDonateToOtherCauses}
            className="w-full py-4 px-6 rounded-lg text-black font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#D0D0D0' }}
          >
            Donate to other causes/organizations
          </button>

          {/* Continue to dashboard button - slightly darker grey */}
          <button
            onClick={handleContinueToDashboard}
            className="w-full py-4 px-6 rounded-lg text-black font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#B8B8B8' }}
          >
            Continue to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakPage;
