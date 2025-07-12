import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, Heart, Share2 } from 'lucide-react';
import { Destination } from '../../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  isFavorite?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onFavorite,
  onShare,
  isFavorite = false
}) => {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavorite?.(destination.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    onShare?.(destination.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
            {destination.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            <Link to={`/destinations/${destination.id}`}>
              {destination.name}
            </Link>
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">
              {destination.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            {destination.city}, {destination.state && `${destination.state}, `}{destination.country}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {destination.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{destination.bestTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{destination.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="font-semibold text-gray-900">
              ₹{destination.budget.accommodation.budget.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/night</span>
            </div>
          </div>
          <Link
            to={`/destinations/${destination.id}`}
            className="btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;