import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Clock, Star, Navigation } from 'lucide-react';
import TripPlannerForm, { TripPlanData } from '../components/trip-planner/TripPlannerForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { destinations } from '../data/destinations';

interface GeneratedItinerary {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
  travelTime: string;
}

interface Activity {
  id: string;
  name: string;
  type: 'attraction' | 'meal' | 'transport' | 'accommodation';
  time: string;
  duration: string;
  cost: number;
  description: string;
  location: string;
}

const TripPlannerPage = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'generating' | 'results'>('form');
  const [tripData, setTripData] = useState<TripPlanData | null>(null);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary[]>([]);

  const handleTripSubmit = async (data: TripPlanData) => {
    setTripData(data);
    setCurrentStep('generating');

    // Simulate API call to generate itinerary
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate sample itinerary
    const itinerary = generateSampleItinerary(data);
    setGeneratedItinerary(itinerary);
    setCurrentStep('results');
  };

  const generateSampleItinerary = (data: TripPlanData): GeneratedItinerary[] => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const sampleItinerary: GeneratedItinerary[] = [];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const activities: Activity[] = [
        {
          id: `day-${i}-breakfast`,
          name: 'Breakfast',
          type: 'meal',
          time: '08:00 AM',
          duration: '1 hour',
          cost: data.budget === 'budget' ? 200 : data.budget === 'mid' ? 500 : 800,
          description: 'Start your day with a delicious local breakfast',
          location: 'Local restaurant near hotel'
        },
        {
          id: `day-${i}-attraction1`,
          name: `Main Attraction ${i + 1}`,
          type: 'attraction',
          time: '10:00 AM',
          duration: '3 hours',
          cost: data.budget === 'budget' ? 300 : data.budget === 'mid' ? 600 : 1200,
          description: 'Visit the most popular attractions based on your interests',
          location: data.destination
        },
        {
          id: `day-${i}-lunch`,
          name: 'Lunch',
          type: 'meal',
          time: '01:00 PM',
          duration: '1 hour',
          cost: data.budget === 'budget' ? 300 : data.budget === 'mid' ? 700 : 1200,
          description: 'Enjoy authentic local cuisine',
          location: 'Recommended local restaurant'
        },
        {
          id: `day-${i}-attraction2`,
          name: `Secondary Attraction ${i + 1}`,
          type: 'attraction',
          time: '03:00 PM',
          duration: '2 hours',
          cost: data.budget === 'budget' ? 200 : data.budget === 'mid' ? 400 : 800,
          description: 'Explore additional sights and experiences',
          location: data.destination
        },
        {
          id: `day-${i}-dinner`,
          name: 'Dinner',
          type: 'meal',
          time: '07:00 PM',
          duration: '1.5 hours',
          cost: data.budget === 'budget' ? 400 : data.budget === 'mid' ? 1000 : 2000,
          description: 'End your day with a memorable dining experience',
          location: 'Local restaurant'
        }
      ];

      if (i === 0) {
        activities.unshift({
          id: `day-${i}-checkin`,
          name: 'Hotel Check-in',
          type: 'accommodation',
          time: '02:00 PM',
          duration: '30 minutes',
          cost: 0,
          description: 'Check into your accommodation',
          location: 'Hotel/Resort'
        });
      }

      const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);

      sampleItinerary.push({
        day: i + 1,
        date: currentDate.toISOString().split('T')[0],
        activities,
        totalCost,
        travelTime: '2-3 hours'
      });
    }

    return sampleItinerary;
  };

  const getTotalTripCost = () => {
    return generatedItinerary.reduce((sum, day) => sum + day.totalCost, 0);
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'attraction':
        return <MapPin className="h-5 w-5 text-primary-600" />;
      case 'meal':
        return <Clock className="h-5 w-5 text-accent-600" />;
      case 'transport':
        return <Navigation className="h-5 w-5 text-secondary-600" />;
      case 'accommodation':
        return <Star className="h-5 w-5 text-purple-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Trip Planner
          </h1>
          <p className="text-lg text-gray-600">
            Create your perfect itinerary with our intelligent trip planning system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'form' && (
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tell us about your trip
              </h2>
              <TripPlannerForm onSubmit={handleTripSubmit} />
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="card">
              <LoadingSpinner size="large" className="mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Creating Your Perfect Itinerary
              </h2>
              <p className="text-gray-600 mb-6">
                We're analyzing your preferences and creating a customized trip plan just for you.
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Analyzing destination data...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Matching attractions to your interests...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Optimizing route and timing...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Calculating budget breakdown...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && tripData && (
          <div className="space-y-8">
            {/* Trip Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Trip to {tripData.destination}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{generatedItinerary.length} days</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-secondary-600" />
                      <div>
                        <div className="text-sm text-gray-600">Travelers</div>
                        <div className="font-medium">{tripData.travelers}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-accent-600" />
                      <div>
                        <div className="text-sm text-gray-600">Total Cost</div>
                        <div className="font-medium">₹{getTotalTripCost().toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-sm text-gray-600">Budget</div>
                        <div className="font-medium capitalize">{tripData.budget}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <strong>Interests:</strong> {tripData.interests.join(', ')}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      Download Itinerary
                    </button>
                    <button className="w-full btn-outline">
                      Share Trip Plan
                    </button>
                    <button className="w-full btn-outline">
                      Modify Plan
                    </button>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Daily Average</span>
                      <span className="font-medium">₹{Math.round(getTotalTripCost() / generatedItinerary.length).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Per Person</span>
                      <span className="font-medium">₹{Math.round(getTotalTripCost() / tripData.travelers).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Trip Cost</span>
                        <span>₹{getTotalTripCost().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Daily Itinerary</h3>
              {generatedItinerary.map((day) => (
                <div key={day.day} className="card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Day {day.day}
                      </h4>
                      <p className="text-gray-600">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{day.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Daily cost</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{activity.name}</h5>
                            <span className="text-sm font-medium text-gray-900">
                              ₹{activity.cost.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span>{activity.time}</span>
                            <span>•</span>
                            <span>{activity.duration}</span>
                            <span>•</span>
                            <span>{activity.location}</span>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentStep('form');
                  setTripData(null);
                  setGeneratedItinerary([]);
                }}
                className="btn-outline px-8 py-3"
              >
                Plan Another Trip
              </button>
              <button className="btn-primary px-8 py-3">
                Book This Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlannerPage;