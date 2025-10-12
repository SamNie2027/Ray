import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer 
      className="py-12"
      style={{ backgroundColor: '#F8F8F8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex gap-4">
            <Link to="/" className="text-white sub-heading">
              <img
                src="/logo.png"
                className="w-10 md:w-14 lg:w-24"
              />
            </Link>
            <p 
              className="text-gray-600 mb-4 max-w-md"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px'
              }}
            >
              Making giving a habit. Join our community of changemakers and start your giving streak today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px'
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/causes" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/goals" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Goals
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px'
              }}
            >
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p 
            className="text-gray-500 text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            © 2025 Ray. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;