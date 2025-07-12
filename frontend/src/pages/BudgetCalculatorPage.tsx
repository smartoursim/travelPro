import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, TrendingUp, Users, Calendar } from 'lucide-react';

interface BudgetCalculation {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  shopping: number;
  miscellaneous: number;
  total: number;
}

const BudgetCalculatorPage = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 1,
    travelers: 1,
    accommodationType: '',
    mealPreference: '',
    transportMode: '',
    activityLevel: '',
    shoppingBudget: ''
  });

  const [calculation, setCalculation] = useState<BudgetCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBudget = () => {
    const { duration, travelers, accommodationType, mealPreference, transportMode, activityLevel, shoppingBudget } = formData;

    // Base costs per person per day
    const accommodationCosts = {
      budget: 1500,
      mid: 4000,
      luxury: 8000
    };

    const foodCosts = {
      budget: 800,
      mid: 2000,
      luxury: 4000
    };

    const transportCosts = {
      local: 500,
      private: 2000,
      luxury: 3500
    };

    const activityCosts = {
      low: 1000,
      medium: 2500,
      high: 5000
    };

    const shoppingCosts = {
      none: 0,
      minimal: 1000,
      moderate: 3000,
      extensive: 6000
    };

    const accommodation = (accommodationCosts[accommodationType as keyof typeof accommodationCosts] || 0) * duration;
    const food = (foodCosts[mealPreference as keyof typeof foodCosts] || 0) * duration * travelers;
    const transport = (transportCosts[transportMode as keyof typeof transportCosts] || 0) * duration * travelers;
    const activities = (activityCosts[activityLevel as keyof typeof activityCosts] || 0) * duration * travelers;
    const shopping = (shoppingCosts[shoppingBudget as keyof typeof shoppingCosts] || 0) * travelers;
    const miscellaneous = (accommodation + food + transport + activities + shopping) * 0.1; // 10% buffer

    const total = accommodation + food + transport + activities + shopping + miscellaneous;

    setCalculation({
      accommodation,
      food,
      transport,
      activities,
      shopping,
      miscellaneous,
      total
    });
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      destination: '',
      duration: 1,
      travelers: 1,
      accommodationType: '',
      mealPreference: '',
      transportMode: '',
      activityLevel: '',
      shoppingBudget: ''
    });
    setCalculation(null);
    setShowResults(false);
  };

  const getBudgetBreakdown = () => {
    if (!calculation) return [];

    return [
      { label: 'Accommodation', value: calculation.accommodation, color: 'bg-blue-500' },
      { label: 'Food & Dining', value: calculation.food, color: 'bg-green-500' },
      { label: 'Transportation', value: calculation.transport, color: 'bg-yellow-500' },
      { label: 'Activities', value: calculation.activities, color: 'bg-purple-500' },
      { label: 'Shopping', value: calculation.shopping, color: 'bg-pink-500' },
      { label: 'Miscellaneous', value: calculation.miscellaneous, color: 'bg-gray-500' }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Budget Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Get accurate cost estimates for your trip with our comprehensive budget planning tool.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Trip Details
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      placeholder="Enter destination"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      min="1"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      value={formData.travelers}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                      min="1"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accommodation Type
                    </label>
                    <select
                      value={formData.accommodationType}
                      onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select accommodation</option>
                      <option value="budget">Budget (₹1,500/night)</option>
                      <option value="mid">Mid-range (₹4,000/night)</option>
                      <option value="luxury">Luxury (₹8,000/night)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meal Preference
                    </label>
                    <select
                      value={formData.mealPreference}
                      onChange={(e) => handleInputChange('mealPreference', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select meal preference</option>
                      <option value="budget">Budget (₹800/day)</option>
                      <option value="mid">Mid-range (₹2,000/day)</option>
                      <option value="luxury">Fine dining (₹4,000/day)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transportation
                    </label>
                    <select
                      value={formData.transportMode}
                      onChange={(e) => handleInputChange('transportMode', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select transport mode</option>
                      <option value="local">Public transport (₹500/day)</option>
                      <option value="private">Private taxi (₹2,000/day)</option>
                      <option value="luxury">Luxury transport (₹3,500/day)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Level
                    </label>
                    <select
                      value={formData.activityLevel}
                      onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select activity level</option>
                      <option value="low">Low (₹1,000/day)</option>
                      <option value="medium">Medium (₹2,500/day)</option>
                      <option value="high">High (₹5,000/day)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shopping Budget
                    </label>
                    <select
                      value={formData.shoppingBudget}
                      onChange={(e) => handleInputChange('shoppingBudget', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select shopping budget</option>
                      <option value="none">No shopping</option>
                      <option value="minimal">Minimal (₹1,000)</option>
                      <option value="moderate">Moderate (₹3,000)</option>
                      <option value="extensive">Extensive (₹6,000)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={resetCalculator}
                    className="btn-outline px-6 py-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={calculateBudget}
                    className="btn-primary px-6 py-2"
                  >
                    <Calculator className="inline h-4 w-4 mr-2" />
                    Calculate Budget
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {showResults && calculation ? (
              <>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <DollarSign className="inline h-5 w-5 mr-2" />
                    Total Budget
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      ₹{calculation.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      For {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'} × {formData.duration} days
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <PieChart className="inline h-5 w-5 mr-2" />
                    Budget Breakdown
                  </h3>
                  <div className="space-y-3">
                    {getBudgetBreakdown().map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm font-medium text-gray-900">
                            ₹{item.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{
                              width: `${(item.value / calculation.total) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <TrendingUp className="inline h-5 w-5 mr-2" />
                    Per Person Costs
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per person total</span>
                      <span className="font-medium">₹{Math.round(calculation.total / formData.travelers).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per person per day</span>
                      <span className="font-medium">₹{Math.round(calculation.total / (formData.travelers * formData.duration)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Budget Tips
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Book accommodation in advance for better rates</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Consider local transportation to save money</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Try local street food for authentic experiences</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Keep 10-15% extra for unexpected expenses</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card">
                <div className="text-center py-8">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Calculate Your Budget
                  </h3>
                  <p className="text-gray-600">
                    Fill in your trip details to get a comprehensive budget estimate.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculatorPage;