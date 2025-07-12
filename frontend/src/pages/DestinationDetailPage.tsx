import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign, 
  Camera, 
  Heart, 
  Share2, 
  ArrowLeft,
  Thermometer,
  Droplets,
  Wind,
  Eye
} from 'lucide-react';
import { destinations, Destination } from '../data/destinations';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = destinations.find(d => d.id === id);
      setDestination(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <Link to="/destinations" className="btn-primary">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'budget', label: 'Budget' },
    { id: 'weather', label: 'Weather' },
    { id: 'culture', label: 'Culture & History' }
  ];

  const weatherData = destination.weather[selectedMonth] || destination.weather[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute top-6 left-6">
          <Link
            to="/destinations"
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Destinations</span>
          </Link>
        </div>

        <div className="absolute top-6 right-6 flex space-x-2">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-2 text-white/80 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{destination.city}, {destination.state && `${destination.state}, `}{destination.country}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{destination.name}</h1>
          <div className="flex items-center space-x-4 text-white/80">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{destination.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{destination.bestTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{destination.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{destination.description}</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-600">Rating: {destination.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <span className="text-gray-600">Best Time: {destination.bestTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-secondary-600" />
                      <span className="text-gray-600">Duration: {destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-accent-600" />
                      <span className="text-gray-600">Budget: From ₹{destination.budget.accommodation.budget}/day</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Interesting Facts</h3>
                  <ul className="space-y-2">
                    {destination.interestingFacts.map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Attractions</h2>
                {destination.attractions.map((attraction) => (
                  <div key={attraction.id} className="card">
                    <div className="flex items-start space-x-4">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{attraction.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            attraction.type === 'Essential'
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {attraction.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{attraction.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">Hours:</span>
                            <div className="text-gray-600">{attraction.openingHours}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Entry Fee:</span>
                            <div className="text-gray-600">
                              {attraction.entryFee === 0 ? 'Free' : `₹${attraction.entryFee}`}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Duration:</span>
                            <div className="text-gray-600">{attraction.visitDuration}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Budget Breakdown</h2>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Accommodation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
                      <p className="text-2xl font-bold text-gray-900">₹{destination.budget.accommodation.budget}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Mid-range</h4>
                      <p className="text-2xl font-bold text-primary-600">₹{destination.budget.accommodation.mid}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                    <div className="p-4 bg-accent-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Luxury</h4>
                      <p className="text-2xl font-bold text-accent-600">₹{destination.budget.accommodation.luxury}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Food & Dining</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
                      <p className="text-2xl font-bold text-gray-900">₹{destination.budget.food.budget}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Mid-range</h4>
                      <p className="text-2xl font-bold text-primary-600">₹{destination.budget.food.mid}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                    <div className="p-4 bg-accent-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Luxury</h4>
                      <p className="text-2xl font-bold text-accent-600">₹{destination.budget.food.luxury}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Transportation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Public Transport</h4>
                      <p className="text-2xl font-bold text-gray-900">₹{destination.budget.transport.local}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Private/Taxi</h4>
                      <p className="text-2xl font-bold text-primary-600">₹{destination.budget.transport.private}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Activities & Sightseeing</h3>
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <p className="text-2xl font-bold text-secondary-600">₹{destination.budget.activities}</p>
                    <p className="text-sm text-gray-600">Average per day</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Weather Information</h2>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Weather</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                    {destination.weather.map((weather, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMonth(index)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedMonth === index
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {weather.month}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Thermometer className="h-5 w-5 text-red-600" />
                        <h4 className="font-medium text-gray-900">Temperature</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {weatherData.temperature.min}°C - {weatherData.temperature.max}°C
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium text-gray-900">Rainfall</h4>
                      </div>
                      <p className="text-sm text-gray-600">{weatherData.rainfall}mm</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Wind className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-gray-900">Humidity</h4>
                      </div>
                      <p className="text-sm text-gray-600">{weatherData.humidity}%</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                        <h4 className="font-medium text-gray-900">Conditions</h4>
                      </div>
                      <p className="text-sm text-gray-600">{weatherData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'culture' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Culture & History</h2>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Historical Significance</h3>
                  <p className="text-gray-600 leading-relaxed">{destination.history}</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultural Importance</h3>
                  <p className="text-gray-600 leading-relaxed">{destination.culture}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Your Trip</h3>
              <div className="space-y-3">
                <Link
                  to={`/trip-planner?destination=${destination.id}`}
                  className="w-full btn-primary text-center"
                >
                  Create Itinerary
                </Link>
                <Link
                  to={`/budget-calculator?destination=${destination.id}`}
                  className="w-full btn-outline text-center"
                >
                  Calculate Budget
                </Link>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{destination.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{destination.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Best Time</span>
                  <span className="font-medium text-gray-900">{destination.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">{destination.duration}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{destination.city}</span>
                </div>
                {destination.state && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" />
                    <span className="text-gray-600">{destination.state}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  <span className="text-gray-600">{destination.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;