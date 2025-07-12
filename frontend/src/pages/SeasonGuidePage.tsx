import React, { useState } from 'react';
import { Calendar, Thermometer, Droplets, Wind, Sun, Cloud, Snowflake, Umbrella } from 'lucide-react';

const SeasonGuidePage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const monthlyGuide = [
    {
      month: 'January',
      season: 'Winter',
      icon: <Snowflake className="h-6 w-6 text-blue-500" />,
      bestDestinations: ['Goa', 'Rajasthan', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh'],
      weather: {
        temperature: '10-25°C',
        conditions: 'Cool and dry',
        rainfall: 'Very low'
      },
      clothing: ['Light woolens', 'Warm layers for evenings', 'Comfortable walking shoes', 'Sunglasses'],
      activities: ['Beach holidays', 'Desert safaris', 'Cultural tours', 'Wildlife safaris'],
      festivals: ['Makar Sankranti', 'Pongal', 'Republic Day'],
      tips: [
        'Perfect time for South India travel',
        'Book accommodations early as it\'s peak season',
        'Carry light woolens for North India',
        'Ideal for golden triangle tours'
      ]
    },
    {
      month: 'February',
      season: 'Winter',
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      bestDestinations: ['Goa', 'Rajasthan', 'Kerala', 'Himachal Pradesh', 'Uttarakhand'],
      weather: {
        temperature: '12-28°C',
        conditions: 'Pleasant and sunny',
        rainfall: 'Minimal'
      },
      clothing: ['Light cotton clothes', 'Warm layers for hills', 'Sunscreen', 'Comfortable shoes'],
      activities: ['Beach activities', 'Mountain trekking', 'Cultural festivals', 'Photography'],
      festivals: ['Vasant Panchami', 'Maha Shivratri', 'Carnival (Goa)'],
      tips: [
        'Excellent weather for most destinations',
        'Peak tourist season - expect crowds',
        'Book flights and hotels in advance',
        'Perfect for honeymoon destinations'
      ]
    },
    {
      month: 'March',
      season: 'Spring',
      icon: <Sun className="h-6 w-6 text-orange-500" />,
      bestDestinations: ['Rajasthan', 'Himachal Pradesh', 'Uttarakhand', 'Maharashtra', 'Gujarat'],
      weather: {
        temperature: '15-30°C',
        conditions: 'Warm and pleasant',
        rainfall: 'Low'
      },
      clothing: ['Light cotton clothes', 'Sunhat', 'Sunglasses', 'Comfortable walking shoes'],
      activities: ['Wildlife safaris', 'Hill station visits', 'Cultural tours', 'Adventure sports'],
      festivals: ['Holi', 'Navratri', 'Gangaur'],
      tips: [
        'Great weather for North India',
        'Holi celebrations are spectacular',
        'Good time for wildlife viewing',
        'Temperature starts rising in plains'
      ]
    },
    {
      month: 'April',
      season: 'Spring',
      icon: <Thermometer className="h-6 w-6 text-red-400" />,
      bestDestinations: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh', 'Sikkim'],
      weather: {
        temperature: '20-35°C',
        conditions: 'Getting warmer',
        rainfall: 'Occasional showers'
      },
      clothing: ['Light cotton clothes', 'Sun protection', 'Light jacket for evenings', 'Comfortable shoes'],
      activities: ['Mountain trekking', 'Valley visits', 'Adventure sports', 'Photography'],
      festivals: ['Baisakhi', 'Ram Navami', 'Hanuman Jayanti'],
      tips: [
        'Perfect for hill stations',
        'Avoid plains as temperature rises',
        'Good for high-altitude destinations',
        'Rhododendrons bloom in hills'
      ]
    },
    {
      month: 'May',
      season: 'Summer',
      icon: <Sun className="h-6 w-6 text-red-500" />,
      bestDestinations: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh', 'Sikkim'],
      weather: {
        temperature: '25-42°C',
        conditions: 'Hot in plains, pleasant in hills',
        rainfall: 'Pre-monsoon showers'
      },
      clothing: ['Light cotton clothes', 'Sun protection', 'Hat and sunglasses', 'Hydration gear'],
      activities: ['Hill station visits', 'Mountain trekking', 'River rafting', 'Valley exploration'],
      festivals: ['Buddha Purnima', 'Eid (varies)'],
      tips: [
        'Escape to hill stations',
        'Avoid plains due to extreme heat',
        'Perfect for high-altitude treks',
        'Carry plenty of water'
      ]
    },
    {
      month: 'June',
      season: 'Summer',
      icon: <Cloud className="h-6 w-6 text-gray-500" />,
      bestDestinations: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh', 'Northeast'],
      weather: {
        temperature: '28-45°C',
        conditions: 'Hot, monsoon onset',
        rainfall: 'Increasing'
      },
      clothing: ['Light breathable clothes', 'Rainwear', 'Waterproof shoes', 'Quick-dry fabrics'],
      activities: ['Hill station visits', 'Mountain activities', 'Cultural experiences', 'Valley tours'],
      festivals: ['Rath Yatra', 'Hemis Festival'],
      tips: [
        'Monsoon begins in Kerala',
        'Great for hill stations',
        'Avoid coastal areas',
        'Perfect for Ladakh visits'
      ]
    },
    {
      month: 'July',
      season: 'Monsoon',
      icon: <Umbrella className="h-6 w-6 text-blue-600" />,
      bestDestinations: ['Rajasthan', 'Ladakh', 'Himachal Pradesh', 'Uttarakhand'],
      weather: {
        temperature: '26-35°C',
        conditions: 'Monsoon rains',
        rainfall: 'Heavy'
      },
      clothing: ['Waterproof clothes', 'Raincoat', 'Waterproof shoes', 'Quick-dry fabrics'],
      activities: ['Desert tours', 'High-altitude treks', 'Cultural tours', 'Indoor activities'],
      festivals: ['Teej', 'Kargil Vijay Diwas'],
      tips: [
        'Rajasthan looks beautiful in monsoon',
        'Perfect for Ladakh (dry region)',
        'Avoid hill stations prone to landslides',
        'Great for desert destinations'
      ]
    },
    {
      month: 'August',
      season: 'Monsoon',
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      bestDestinations: ['Rajasthan', 'Ladakh', 'Gujarat', 'Madhya Pradesh'],
      weather: {
        temperature: '25-33°C',
        conditions: 'Peak monsoon',
        rainfall: 'Very heavy'
      },
      clothing: ['Waterproof gear', 'Raincoat and umbrella', 'Waterproof bags', 'Non-slip shoes'],
      activities: ['Desert safaris', 'Cultural tours', 'Photography', 'Monsoon festivals'],
      festivals: ['Independence Day', 'Raksha Bandhan', 'Janmashtami'],
      tips: [
        'Monsoon at its peak',
        'Western Ghats look spectacular',
        'Avoid coastal and hill areas',
        'Great for desert photography'
      ]
    },
    {
      month: 'September',
      season: 'Post-Monsoon',
      icon: <Wind className="h-6 w-6 text-green-500" />,
      bestDestinations: ['Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Himachal Pradesh'],
      weather: {
        temperature: '22-30°C',
        conditions: 'Retreating monsoon',
        rainfall: 'Moderate'
      },
      clothing: ['Light cotton clothes', 'Light rain gear', 'Comfortable shoes', 'Layered clothing'],
      activities: ['Cultural tours', 'Photography', 'Wildlife safaris', 'Festival participation'],
      festivals: ['Ganesh Chaturthi', 'Navratri begins'],
      tips: [
        'Post-monsoon freshness',
        'Great for photography',
        'Festivals season begins',
        'Nature is at its greenest'
      ]
    },
    {
      month: 'October',
      season: 'Post-Monsoon',
      icon: <Sun className="h-6 w-6 text-orange-400" />,
      bestDestinations: ['Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Himachal Pradesh', 'Uttarakhand'],
      weather: {
        temperature: '18-28°C',
        conditions: 'Pleasant and clear',
        rainfall: 'Minimal'
      },
      clothing: ['Light cotton clothes', 'Light sweater for evenings', 'Comfortable shoes', 'Sunglasses'],
      activities: ['Cultural tours', 'Wildlife safaris', 'Trekking', 'Festival celebrations'],
      festivals: ['Dussehra', 'Navratri', 'Durga Puja'],
      tips: [
        'Perfect weather returns',
        'Great for North India',
        'Festival season in full swing',
        'Ideal for wildlife photography'
      ]
    },
    {
      month: 'November',
      season: 'Winter',
      icon: <Sun className="h-6 w-6 text-yellow-400" />,
      bestDestinations: ['Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Goa', 'Maharashtra'],
      weather: {
        temperature: '15-25°C',
        conditions: 'Cool and pleasant',
        rainfall: 'Very low'
      },
      clothing: ['Light cotton clothes', 'Warm layers for evenings', 'Comfortable walking shoes', 'Light jacket'],
      activities: ['Cultural tours', 'Beach holidays', 'Desert safaris', 'City exploration'],
      festivals: ['Diwali', 'Govardhan Puja', 'Bhai Dooj'],
      tips: [
        'Perfect weather for travel',
        'Tourist season begins',
        'Diwali celebrations are spectacular',
        'Great for all types of activities'
      ]
    },
    {
      month: 'December',
      season: 'Winter',
      icon: <Snowflake className="h-6 w-6 text-blue-400" />,
      bestDestinations: ['Goa', 'Rajasthan', 'Gujarat', 'Kerala', 'Tamil Nadu'],
      weather: {
        temperature: '10-22°C',
        conditions: 'Cool and dry',
        rainfall: 'Negligible'
      },
      clothing: ['Light woolens', 'Warm layers', 'Comfortable shoes', 'Sun protection'],
      activities: ['Beach holidays', 'Cultural tours', 'Wildlife safaris', 'New Year celebrations'],
      festivals: ['Christmas', 'New Year'],
      tips: [
        'Peak tourist season',
        'Book early for better rates',
        'Perfect for beach destinations',
        'Great for family holidays'
      ]
    }
  ];

  const currentMonth = monthlyGuide[selectedMonth];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Season Guide
          </h1>
          <p className="text-lg text-gray-600">
            Discover the best time to visit destinations with our comprehensive seasonal travel guide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Month</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {monthlyGuide.map((month, index) => (
              <button
                key={index}
                onClick={() => setSelectedMonth(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedMonth === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {month.month}
              </button>
            ))}
          </div>
        </div>

        {/* Current month details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Month overview */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                {currentMonth.icon}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentMonth.month}</h2>
                  <p className="text-gray-600">{currentMonth.season} Season</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Temperature</h3>
                  </div>
                  <p className="text-sm text-gray-600">{currentMonth.weather.temperature}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Conditions</h3>
                  </div>
                  <p className="text-sm text-gray-600">{currentMonth.weather.conditions}</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Rainfall</h3>
                  </div>
                  <p className="text-sm text-gray-600">{currentMonth.weather.rainfall}</p>
                </div>
              </div>
            </div>

            {/* Best destinations */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Destinations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMonth.bestDestinations.map((destination, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{destination}</h4>
                    <p className="text-sm text-gray-600">
                      Perfect weather conditions for exploration and outdoor activities.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Activities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentMonth.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-primary-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Festivals */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Festivals & Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentMonth.festivals.map((festival, index) => (
                  <div key={index} className="p-4 bg-accent-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-accent-600" />
                      <span className="font-medium text-gray-900">{festival}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Packing guide */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Packing Essentials</h3>
              <div className="space-y-3">
                {currentMonth.clothing.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Tips</h3>
              <div className="space-y-3">
                {currentMonth.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather chart placeholder */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Trends</h3>
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">Weather chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonGuidePage;