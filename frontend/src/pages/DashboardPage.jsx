const Dashboard = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
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
              <span className="text-white font-bold text-2xl">0</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">day streak</h2>
              <p className="text-black">start donating with us to start your giving streak.</p>
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
              <div className="h-4 rounded-full" style={{ backgroundColor: '#E06B3D', width: '2%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-black mt-2">
              <span>$0/$100</span>
              <span>0 days left</span>
            </div>
          </div>
        </div>

        {/* Quick Donate Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">Quick Donate</h2>
          <p className="text-black mb-6">Choose a cause or organization to start donating with us</p>
          
          {/* Donation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TODO: Add Images */}
            {/* The Salvation Army Card */}
            <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#F0F0F0' }}>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {/* Image */}
              </div>
              <h3 className="font-semibold text-black">The Salvation Army</h3>
            </div>

            {/* UNICEF Card */}
            <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#F0F0F0' }}>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {/* Image */}
              </div>
              <h3 className="font-semibold text-black">Unicef</h3>
            </div>

            {/* Food and Poverty Card */}
            <div className="rounded-lg p-6 text-center relative overflow-hidden" style={{ backgroundColor: '#F0F0F0' }}>
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  {/* Image */}
                </div>
                <h3 className="font-bold text-white">Food and Poverty</h3>
            </div>

            {/* Clothing Card */}
            <div className="rounded-lg p-6 text-center relative overflow-hidden" style={{ backgroundColor: '#F0F0F0' }}>
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  {/* Image */}
                </div>
                <h3 className="font-bold text-white">Clothing</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
