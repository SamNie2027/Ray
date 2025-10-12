import React from 'react';

const ProgressTracker = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Cause' },
    { id: 2, label: 'Organization' },
    { id: 3, label: 'Payment' }
  ];

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.id === currentStep
                    ? 'border-2 border-orange-500 bg-white text-orange-500'
                    : step.id < currentStep
                    ? 'bg-teal-500 text-white'
                    : 'border-2 border-gray-300 bg-white text-gray-400'
                }`}
                style={{
                  borderColor: step.id === currentStep ? '#E06B3D' : step.id < currentStep ? '#14B8A6' : '#D1D5DB'
                }}
              >
                {step.id < currentStep ? '✓' : step.id}
              </div>
              <span className={`text-sm mt-2 ${
                step.id === currentStep ? 'text-orange-500 font-semibold' : 'text-gray-600'
              }`}
              style={{
                color: step.id === currentStep ? '#E06B3D' : '#6B7280'
              }}>
                {step.label}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className="w-16 h-0.5"
                style={{
                  backgroundColor: step.id < currentStep ? '#14B8A6' : '#D1D5DB'
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
