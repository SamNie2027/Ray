import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RayLogo from '../components/RayLogo';
import { Apple, Chrome, Mail, Lock } from 'lucide-react';

const Login = () => {
  const { signIn, signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        // For sign up, we need additional fields - using defaults for now
        await signUp(formData.email, formData.password, 'User', 'local');
      } else {
        await signIn(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign-in
    console.log('Apple sign-in');
    setError('Apple sign-in not yet implemented');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google sign-in');
    setError('Google sign-in not yet implemented');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 login-gradient"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-8 min-h-[calc(100vh-120px)]">
        {/* Logo */}
        <RayLogo className="mb-6" />
        
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">
            Sign up for <span className="text-orange-500">Ray</span>
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-sm mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 sm:space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johnsmith@email.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 input-focus text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="************"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 input-focus text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-primary text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>

          {/* Apple Sign In Button */}
          <button
            type="button"
            onClick={handleAppleSignIn}
            className="w-full py-3 btn-secondary text-gray-800 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <Apple className="w-5 h-5" />
            <span>Sign up with Apple</span>
          </button>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 btn-secondary text-gray-800 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <Chrome className="w-5 h-5 text-blue-600" />
            <span>Sign up with Google</span>
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;