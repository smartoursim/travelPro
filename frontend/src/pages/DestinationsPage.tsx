import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import DestinationCard from '../components/destination/DestinationCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { destinations, categories } from '../data/destinations';

const DestinationsPage = () => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query.trim()) {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.city.toLowerCase().includes(query.toLowerCase()) ||
        dest.state?.toLowerCase().includes(query.toLowerCase()) ||
        dest.country.toLowerCase().includes(query.toLowerCase()) ||
        dest.category.toLowerCase().includes(query.toLowerCase()) ||
        dest.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
    
    setLoading(false);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = destinations;

    if (filters.category) {
      filtered = filtered.filter(dest => dest.category === filters.category);
    }
    if (filters.country) {
      filtered = filtered.filter(dest => dest.country === filters.country);
    }
    if (filters.budget) {
      filtered = filtered.filter(dest => {
        const dailyBudget = dest.budget.accommodation.budget + dest.budget.food.budget + dest.budget.transport.local;
        switch (filters.budget) {
          case 'low':
            return dailyBudget < 5000;
          case 'medium':
            return dailyBudget >= 5000 && dailyBudget <= 15000;
          case 'high':
            return dailyBudget > 15000;
          default:
            return true;
        }
      });
    }

    setFilteredDestinations(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredDestinations].sort((a, b) => {
      switch (value) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'budget':
          const budgetA = a.budget.accommodation.budget + a.budget.food.budget;
          const budgetB = b.budget.accommodation.budget + b.budget.food.budget;
          return budgetA - budgetB;
        default:
          return 0;
      }
    });
    setFilteredDestinations(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing places around the world with detailed guides and insider tips.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredDestinations.length} destinations found
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="budget">Sort by Budget</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;