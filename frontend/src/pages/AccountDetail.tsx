import  { useState } from 'react';
import { Menu, Edit, ChevronDown } from 'lucide-react';

const AccountDetail = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Alexander Smith',
    email: 'johnsmith@email.com',
    phone: '+000 (000) 000-0000',
    dateOfBirth: '00/00/0000',
    city: 'Input City',
    zipCode: '00000',
    country: 'Input Country'
  });

  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save account details to backend
    console.log('Account details updated:', formData);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-orange-500 w-full py-6 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Ray</h1>
          <div className="text-white">
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl account-title mb-2">Account Details</h2>
            <p className="text-lg account-description">Tell us about yourself and complete registration</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm account-label mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
                <button
                  type="button"
                  onClick={() => handleEdit('fullName')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm account-label mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your email address"
                />
                <button
                  type="button"
                  onClick={() => handleEdit('email')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm account-label mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
                <button
                  type="button"
                  onClick={() => handleEdit('phone')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm account-label mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="MM/DD/YYYY"
                />
                <button
                  type="button"
                  onClick={() => handleEdit('dateOfBirth')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* City and Zip Code - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm account-label mb-2">
                  City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your city"
                  />
                  <button
                    type="button"
                    onClick={() => handleEdit('city')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label htmlFor="zipCode" className="block text-sm account-label mb-2">
                  Zip Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter zip code"
                  />
                  <button
                    type="button"
                    onClick={() => handleEdit('zipCode')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm account-label mb-2">
                Country
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 account-input rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your country"
                />
                <button
                  type="button"
                  onClick={() => handleEdit('country')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 account-icon"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 text-center">
              <button
                type="submit"
                className="bg-orange-500 text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
