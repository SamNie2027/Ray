import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';

const Donation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCause, selectedOrganization } = location.state || {};
  const [donationAmount, setDonationAmount] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/success', { 
        state: { 
          selectedCause,
          selectedOrganization,
          donationAmount 
        } 
      });
    }, 2000);
  };

  const quickAmounts = [5, 10, 25, 50, 100];

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
      <ProgressTracker currentStep={3} />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Payment</h1>
          <p className="text-lg text-black">Complete your donation</p>
        </div>

        {/* Donation Summary */}
        {selectedCause && selectedOrganization && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h3 className="text-xl font-semibold text-black mb-4">Donation Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Cause:</span>
                <span className="text-black font-medium">{selectedCause.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Organization:</span>
                <span className="text-black font-medium">{selectedOrganization.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Form */}
        <form onSubmit={handleDonationSubmit} className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-black mb-6">Payment Details</h3>
          
          {/* Donation Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Donation Amount
            </label>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setDonationAmount(amount)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    donationAmount === amount
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter custom amount"
              min="1"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  defaultChecked
                  className="mr-3 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700">Credit/Debit Card</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  className="mr-3 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700">PayPal</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#E06B3D' }}
          >
            {isProcessing ? 'Processing...' : `Donate $${donationAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;