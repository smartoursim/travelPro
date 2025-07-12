import React, { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, Clock } from 'lucide-react';

interface TripPlannerFormProps {
  onSubmit: (data: TripPlanData) => void;
  initialData?: Partial<TripPlanData>;
}

export interface TripPlanData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  accommodationType: string;
  transportMode: string;
}

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<TripPlanData>({
    destination: initialData?.destination || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    travelers: initialData?.travelers || 1,
    budget: initialData?.budget || '',
    interests: initialData?.interests || [],
    accommodationType: initialData?.accommodationType || '',
    transportMode: initialData?.transportMode || '',
  });

  const interests = [
    'Historical Sites',
    'Nature & Wildlife',
    'Adventure Sports',
    'Cultural Experiences',
    'Food & Cuisine',
    'Photography',
    'Spiritual & Religious',
    'Shopping',
    'Nightlife',
    'Beaches',
    'Mountains',
    'Museums'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Destination
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="Enter destination"
            className="input-field"
            required
          />
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline h-4 w-4 mr-1" />
            Number of Travelers
          </label>
          <select
            value={formData.travelers}
            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
            className="input-field"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="input-field"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            End Date
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="input-field"
            required
          />
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Budget Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select budget range</option>
            <option value="budget">Budget (Under ₹5,000/day)</option>
            <option value="mid">Mid-range (₹5,000-15,000/day)</option>
            <option value="luxury">Luxury (₹15,000+/day)</option>
          </select>
        </div>

        {/* Accommodation Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accommodation Type
          </label>
          <select
            value={formData.accommodationType}
            onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select accommodation</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="homestay">Homestay</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
            <option value="heritage">Heritage Property</option>
          </select>
        </div>

        {/* Transport Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Transport
          </label>
          <select
            value={formData.transportMode}
            onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select transport mode</option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="car">Car/Taxi</option>
            <option value="mixed">Mixed Transport</option>
          </select>
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Your Interests (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {interests.map((interest) => (
            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary px-8 py-3 text-lg"
        >
          Create Trip Plan
        </button>
      </div>
    </form>
  );
};

export default TripPlannerForm;