import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, DollarSign, Star, TrendingUp, Users, Globe } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import DestinationCard from '../components/destination/DestinationCard';
import { destinations } from '../data/destinations';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState(destinations.slice(0, 6));

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(destinations.slice(0, 6));
      return;
    }

    const filtered = destinations.filter(dest =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.city.toLowerCase().includes(query.toLowerCase()) ||
      dest.state?.toLowerCase().includes(query.toLowerCase()) ||
      dest.country.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = destinations;

    if (filters.category) {
      filtered = filtered.filter(dest => dest.category === filters.category);
    }
    if (filters.country) {
      filtered = filtered.filter(dest => dest.country === filters.country);
    }

    setSearchResults(filtered.slice(0, 6));
  };

  const featuredDestinations = destinations.slice(0, 3);
  const stats = [
    { icon: MapPin, label: 'Destinations', value: '500+' },
    { icon: Users, label: 'Happy Travelers', value: '10K+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Globe, label: 'Countries', value: '15+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Your Next
              <span className="block text-accent-400">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Plan your perfect trip with our comprehensive travel platform. From hidden gems to iconic destinations, create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/destinations"
                className="btn-secondary text-lg px-8 py-3"
              >
                Explore Destinations
              </Link>
              <Link
                to="/trip-planner"
                className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular and breathtaking destinations handpicked by our travel experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/destinations"
            className="btn-primary text-lg px-8 py-3"
          >
            View All Destinations
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TravelPro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to plan and enjoy your perfect trip, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-6">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Search</h3>
              <p className="text-gray-600">
                Find destinations by location, activities, budget, or season with our intelligent search system.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-6">
                <Calendar className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Planning</h3>
              <p className="text-gray-600">
                Create detailed itineraries with optimal routes, timing, and personalized recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Budget Calculator</h3>
              <p className="text-gray-600">
                Get accurate cost estimates for accommodation, food, transport, and activities.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Season Guide</h3>
              <p className="text-gray-600">
                Discover the best time to visit each destination with weather insights and seasonal tips.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Guides</h3>
              <p className="text-gray-600">
                Access comprehensive destination guides written by local experts and seasoned travelers.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mx-auto mb-6">
                <Globe className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Coverage</h3>
              <p className="text-gray-600">
                Explore destinations across multiple countries with detailed local insights and cultural tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Search Results ({searchResults.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of travelers who have discovered their perfect destinations with TravelPro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="btn-secondary text-lg px-8 py-3"
            >
              Explore Now
            </Link>
            <Link
              to="/trip-planner"
              className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;