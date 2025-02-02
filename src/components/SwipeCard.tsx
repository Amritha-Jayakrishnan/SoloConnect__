import React from 'react';
import { User } from '../types';
import { MapPin, Heart, X, Globe2 } from 'lucide-react';

interface SwipeCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipeLeft, onSwipeRight }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
      <img
        src={user.photo}
        alt={user.name}
        className="w-full h-[70%] object-cover"
      />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
        <h3 className="text-2xl font-bold text-white">{user.name}, {user.age}</h3>
        <div className="flex items-center gap-2 text-white/80 mt-2">
          <MapPin size={18} />
          <span>{user.location.city}, {user.location.country}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {user.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
        <button
          onClick={onSwipeLeft}
          className="p-4 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
        >
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button
          onClick={onSwipeRight}
          className="p-4 bg-white rounded-full shadow-lg hover:bg-green-50 transition-colors"
        >
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  );
};