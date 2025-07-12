import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Calendar, Users } from 'lucide-react';
import { destinations, categories, countries } from '../../data/destinations';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
  showFilters?: boolean;
}

interface SearchFilters {
  category: string;
  country: string;
  budget: string;
  duration: string;
  bestTime: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange, showFilters = true }) => {
  const [query, setQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    country: '',
    budget: '',
    duration: '',
    bestTime: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearFilters = {
      category: '',
      country: '',
      budget: '',
      duration: '',
      bestTime: ''
    };
    setFilters(clearFilters);
    onFilterChange(clearFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations, cities, or attractions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Taj Mahal', 'Kerala', 'Goa', 'Rajasthan', 'Himachal'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-full text-sm transition-colors duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {showFilters && (
        <>
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </button>
            {(filters.category || filters.country || filters.budget || filters.duration || filters.bestTime) && (
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => handleFilterChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Budget</option>
                  <option value="low">Budget (Under ₹5,000/day)</option>
                  <option value="medium">Mid-range (₹5,000-15,000/day)</option>
                  <option value="high">Luxury (₹15,000+/day)</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Duration</option>
                  <option value="1-2">1-2 Days</option>
                  <option value="3-5">3-5 Days</option>
                  <option value="6-10">6-10 Days</option>
                  <option value="10+">10+ Days</option>
                </select>
              </div>

              {/* Best Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Time to Visit
                </label>
                <select
                  value={filters.bestTime}
                  onChange={(e) => handleFilterChange('bestTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Time</option>
                  <option value="winter">Winter (Oct-Mar)</option>
                  <option value="summer">Summer (Apr-Jun)</option>
                  <option value="monsoon">Monsoon (Jul-Sep)</option>
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;