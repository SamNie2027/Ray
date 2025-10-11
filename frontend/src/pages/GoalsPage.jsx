import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const Goals = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const goalOptions = [
    { id: 1, text: "Support 10 families monthly", color: "bg-yellow-200" },
    { id: 2, text: "Donate clothes Monthly", color: "bg-pink-200" },
    { id: 3, text: "Donate $5,000 this year", color: "bg-teal-200" },
    { id: 4, text: "Customize goal", color: "bg-orange-500", isCustom: true }
  ];

  const milestoneOptions = [
    { id: 1, text: "Daily Milestones", color: "bg-yellow-200" },
    { id: 2, text: "Weekly Milestones", color: "bg-pink-200" },
    { id: 3, text: "Monthly Milestones", color: "bg-teal-200" }
  ];

  const handleGoalSelect = (goal) => {
    if (goal.isCustom) {
      setShowCustomModal(true);
    } else {
      setSelectedGoal(goal.id);
    }
  };

  const handleCustomGoalSubmit = () => {
    if (customGoal.trim()) {
      // Add custom goal to the list
      const newGoal = {
        id: Date.now(),
        text: customGoal.trim(),
        color: 'bg-orange-200',
        isCustom: false
      };
      goalOptions.push(newGoal);
      setSelectedGoal(newGoal.id);
      setShowCustomModal(false);
      setCustomGoal('');
    }
  };

  const handleMilestoneSelect = (milestone) => {
    setSelectedMilestone(milestone.id);
  };

  const handleContinue = () => {
    if (selectedGoal && selectedMilestone) {
      // TODO: Save goal and milestone selections and navigate to next page
      console.log('Goal:', selectedGoal, 'Milestone:', selectedMilestone);
    } else {
      alert('Please select both a goal and a milestone type');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-orange-500 w-full py-6 px-6">
        <h1 className="text-3xl font-bold text-white">Ray</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* Set Your Goal Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Set Your Goal</h2>
            <p className="text-base sm:text-lg text-gray-600">Choose a goal to stay motivated!</p>
          </div>
          
          {/* Goal Options */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {goalOptions.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className={`px-6 py-3 rounded-full text-gray-800 font-medium transition-all duration-200 hover:scale-105 ${
                  goal.isCustom 
                    ? 'bg-orange-500 text-white flex items-center space-x-2' 
                    : `${goal.color} ${selectedGoal === goal.id ? 'ring-2 ring-orange-500 ring-offset-2' : ''}`
                }`}
              >
                {goal.isCustom && <Plus className="w-5 h-5" />}
                <span>{goal.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Track Your Progress Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Track your progress</h2>
            <p className="text-base sm:text-lg text-gray-600">break your goals into milestones</p>
          </div>
          
          {/* Milestone Options */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {milestoneOptions.map((milestone) => (
              <button
                key={milestone.id}
                onClick={() => handleMilestoneSelect(milestone)}
                className={`px-6 py-3 rounded-full text-gray-800 font-medium transition-all duration-200 hover:scale-105 ${milestone.color} ${
                  selectedMilestone === milestone.id ? 'ring-2 ring-orange-500 ring-offset-2' : ''
                }`}
              >
                {milestone.text}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-8">
          <button
            onClick={handleContinue}
            className="bg-orange-500 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full hover:bg-orange-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Custom Goal Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Create Custom Goal</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="customGoal" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goal
                </label>
                <input
                  type="text"
                  id="customGoal"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomGoalSubmit()}
                  placeholder="Enter your custom goal..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomGoalSubmit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;