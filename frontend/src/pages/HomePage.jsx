import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}

      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #BF5334 0%, #fffff 50%)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-6xl font-bol mt-10 mb-8"
              style={{ 
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: 'clamp(36px, 8vw, 64px)'
              }}
            >
              Making Giving a Habit
            </h1>
            
            {/* Subheading */}
            <p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)'
              }}
            >
              Join our community of changemakers and start your giving streak today. 
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                    style={{ 
                      backgroundColor: '#E06B3D',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/causes"
                    className="px-8 py-4 rounded-lg text-gray-700 font-semibold text-lg transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                    style={{ 
                      backgroundColor: '#F3F4F6',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Start Donating
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                    style={{ 
                      backgroundColor: '#E06B3D',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 rounded-lg text-gray-700 font-semibold text-lg transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                    style={{ 
                      backgroundColor: '#F3F4F6',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ 
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: 'clamp(24px, 6vw, 48px)'
              }}
            >
              Why Choose Ray?
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(16px, 3vw, 20px)'
              }}
            >
              We make giving simple and trackable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#E06B3D' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-semibold text-gray-900 mb-4"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px'
                }}
              >
                Build Streaks
              </h3>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Track your giving habits and build meaningful donation streaks that create lasting impact.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#14B8A6' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-semibold text-gray-900 mb-4"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px'
                }}
              >
                Trusted Organizations
              </h3>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Donate to verified, trusted organizations making real change in communities worldwide.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#D97706' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-semibold text-gray-900 mb-4"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px'
                }}
              >
                Community Impact
              </h3>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Join a community of like-minded individuals working together to create positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ 
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: 'clamp(24px, 6vw, 48px)'
              }}
            >
              Our Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ 
                  color: '#E06B3D',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                10K+
              </div>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Active Donors
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ 
                  color: '#14B8A6',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                $2M+
              </div>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Donated
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ 
                  color: '#D97706',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                500+
              </div>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Organizations
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ 
                  color: '#E06B3D',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                50K+
              </div>
              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px'
                }}
              >
                Lives Impacted
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: '#E06B3D' }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ 
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontSize: 'clamp(24px, 6vw, 48px)'
            }}
          >
            Ready to Start Your Giving Journey?
          </h2>
          <p 
            className="text-xl text-white mb-8"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 3vw, 20px)'
            }}
          >
            Join thousands of people making a difference, one donation at a time.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 rounded-lg text-orange-500 font-semibold text-lg transition-all duration-200 hover:opacity-90 transform hover:scale-105"
              style={{ 
                backgroundColor: 'white',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Get Started Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
