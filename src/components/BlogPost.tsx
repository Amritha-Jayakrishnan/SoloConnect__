import React from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      {post.images.length > 0 && (
        <img
          src={post.images[0]}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
          <span className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {post.city}, {post.country}
          </span>
        </div>
        
        <p className="text-gray-700 mb-6">{post.content}</p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <Heart size={20} />
            <span>{post.likes}</span>
          </button>
          
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};