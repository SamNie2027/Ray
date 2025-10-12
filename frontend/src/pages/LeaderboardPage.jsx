import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLeaderboard } from '../api/leaderboard'
import { Trophy, Calendar, BarChart3, Zap, Medal, Flame, RefreshCw } from 'lucide-react';

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all-time');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all-time', label: 'All Time', icon: Trophy },
    { id: 'this-month', label: 'This Month', icon: Calendar },
    { id: 'this-week', label: 'This Week', icon: BarChart3 },
    { id: 'today', label: 'Today', icon: Zap }
  ];

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLeaderboard();
      
      // Transform backend data to match our component structure
      const transformedData = data.leaderboard.map((entry, index) => ({
        id: index + 1,
        name: entry.displayname,
        avatar: entry.displayname.split(' ').map(n => n[0]).join('').toUpperCase(),
        streak: entry.streak,
        totalDonated: entry.streak * 50, // Estimate based on streak (could be improved with real donation data)
        rank: index + 1
      }));
      
      setLeaderboardData(transformedData);
    } catch (err) {
      setError('Failed to load leaderboard data');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    // For now, we only have all-time data from backend
    // In the future, we could add different endpoints for different time periods
    return leaderboardData;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Medal className="w-6 h-6" style={{ color: '#FFD700' }} />;
      case 2:
        return <Medal className="w-6 h-6" style={{ color: '#C0C0C0' }} />;
      case 3:
        return <Medal className="w-6 h-6" style={{ color: '#CD7F32' }} />;
      default:
        return <span className="text-lg font-bold" style={{ color: '#6B7280' }}>#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <div className="min-h-screen mt-18" style={{ backgroundColor: '#F8F8F8' }}>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-black mb-4"
            style={{ 
              fontFamily: 'Bricolage Grotesque, sans-serif'
            }}
          >
            Leaderboard
          </h1>
          <p 
            className="text-lg text-black"
            style={{ 
              fontFamily: 'Inter, sans-serif'
            }}
          >
            See who's making the biggest impact in our community
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'text-white transform scale-105'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? '#E06B3D' : 'white',
                fontFamily: 'Inter, sans-serif',
                boxShadow: activeCategory === category.id ? '0 4px 12px rgba(224, 107, 61, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#E06B3D' }} />
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Loading leaderboard...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div 
                className="text-red-500 mb-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {error}
              </div>
              <button
                onClick={fetchLeaderboardData}
                className="px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#E06B3D',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead 
                  className="text-left"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  <tr>
                    <th 
                      className="px-6 py-4 font-semibold text-gray-900"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Rank
                    </th>
                    <th 
                      className="px-6 py-4 font-semibold text-gray-900"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      User
                    </th>
                    <th 
                      className="px-6 py-4 font-semibold text-gray-900 text-center"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Streak
                    </th>
                    <th 
                      className="px-6 py-4 font-semibold text-gray-900 text-right"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Total Donated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentData().length > 0 ? (
                    getCurrentData().map((person, index) => (
                      <tr 
                        key={person.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                          user && user.id === person.id ? 'bg-orange-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getRankIcon(person.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: '#E06B3D' }}
                            >
                              {person.avatar}
                            </div>
                            <div>
                              <div 
                                className="font-semibold text-gray-900"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {person.name}
                                {user && user.id === person.id && (
                                  <span 
                                    className="ml-2 text-sm px-2 py-1 rounded-full text-white"
                                    style={{ backgroundColor: '#E06B3D' }}
                                  >
                                    You
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Flame 
                              className="w-5 h-5"
                              style={{ color: '#14B8A6' }}
                            />
                            <span 
                              className="font-semibold"
                              style={{ 
                                color: '#14B8A6',
                                fontFamily: 'Inter, sans-serif'
                              }}
                            >
                              {person.streak} days
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span 
                            className="font-bold text-lg"
                            style={{ 
                              color: '#E06B3D',
                              fontFamily: 'Inter, sans-serif'
                            }}
                          >
                            ${person.totalDonated.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        <p style={{ fontFamily: 'Inter, sans-serif' }}>
                          No leaderboard data available yet. Be the first to start a streak!
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: '#E06B3D',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                {getCurrentData().length}
              </div>
              <div 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Active Donors
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: '#14B8A6',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                {getCurrentData().reduce((sum, person) => sum + person.streak, 0)}
              </div>
              <div 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Total Streak Days
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: '#D97706',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                ${getCurrentData().reduce((sum, person) => sum + person.totalDonated, 0).toLocaleString()}
              </div>
              <div 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Total Donated
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p 
            className="text-gray-600 mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Want to climb the leaderboard? Start your giving streak today!
          </p>
          <button
            onClick={() => window.location.href = '/causes'}
            className="px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90 transform hover:scale-105"
            style={{ 
              backgroundColor: '#E06B3D',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Start Donating
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;