import { useAuth } from '../contexts/AuthContext';
import { getUserStreak } from '../api/leaderboard';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserStreak();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserStreak = async () => {
    try {
      setLoading(true);
      setError(null);
      const streakData = await getUserStreak(user.id);
      setStreak(streakData.streak || 0);
    } catch (err) {
      setError('Failed to load streak data');
      console.error('Error fetching user streak:', err);
      setStreak(0); // Fallback to 0
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-18 min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Giving with Ray</h1>
          <p className="text-lg text-black">Explore your dashboard. Be proactive and donate with Ray!</p>
        </div>

        {/* Day Streak Section */}
        <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: '#F0F0F0' }}>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#C0C0C0' }}>
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <span className="text-white font-bold text-2xl">{streak}</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">day streak</h2>
              <p className="text-black">
                {error ? 'Unable to load streak data' : 'start donating with us to start your giving streak.'}
              </p>
            </div>
          </div>
          <button className="text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#E06B3D' }}>
            Donate with us
          </button>
        </div>

        {/* Your Donation Goal Section */}
        <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: '#F0F0F0' }}>
          <h2 className="text-2xl font-bold text-black mb-2">Your donation goal</h2>
          <p className="text-black mb-4">Create goals in your settings</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-4 rounded-full" style={{ backgroundColor: '#C0C0C0' }}>
              <div 
                className="h-4 rounded-full" 
                style={{ 
                  backgroundColor: '#E06B3D', 
                  width: `${Math.min((streak * 10), 100)}%` // Dynamic progress based on streak
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-black mt-2">
               <span>${streak * 10}/$100</span>
              <span>{Math.max(0, 10 - streak)} days left</span>
            </div>
          </div>
        </div>

        {/* Quick Donate Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">Quick Donate</h2>
          <p className="text-black mb-6">Choose a cause or organization to start donating with us</p>
          
          {/* Donation Cards */}
          <div className="flex flex-wrap">
            {/* The Salvation Army Card */}
              <div className="w-20 h-20 mx-auto">
                  <img
                    src="/dashboard/the-salvation-army.png"
                  />
              </div>

            {/* UNICEF Card */}
            <div className="w-20 h-20 mx-auto">
                <img
                  src="/dashboard/unicef.png"
                />
            </div>

            {/* Food and Poverty Card */}
              <div className="w-20 h-20 mx-auto">
                <img
                  src="/dashboard/food-and-poverty.png"
                />
              </div>

            {/* Clothing Card */}
              <div className="w-20 h-20 mx-auto">
                <img
                  src="/dashboard/clothing.png"
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
