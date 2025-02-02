import React from 'react';
import { format } from 'date-fns';
import { MapPin, Heart, MessageCircle } from 'lucide-react';
import type { TimelinePost as TimelinePostType } from '../types';

interface TimelineProps {
  posts: TimelinePostType[];
}

export const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={post.photo}
            alt={post.caption}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-green-600" size={20} />
              <span className="text-gray-700">{post.location}</span>
            </div>
            
            <p className="text-gray-800 mb-4">{post.caption}</p>
            
            <div className="flex items-center justify-between text-gray-600">
              <span className="text-sm">
                {format(new Date(post.date), 'MMM d, yyyy')}
              </span>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-green-600">
                  <Heart size={20} />
                  <span>Like</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-green-600">
                  <MessageCircle size={20} />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};