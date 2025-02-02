import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Users, Map, BookOpen, Image, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#234024] text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center ${
              isActive('/') ? 'text-green-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <Users size={24} />
            <span className="text-xs mt-1">Discover</span>
          </Link>
          
          <Link
            to="/map"
            className={`flex flex-col items-center ${
              isActive('/map') ? 'text-green-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <Map size={24} />
            <span className="text-xs mt-1">Nearby</span>
          </Link>
          
          <Link
            to="/blog"
            className={`flex flex-col items-center ${
              isActive('/blog') ? 'text-green-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Blog</span>
          </Link>
          
          <Link
            to="/timeline"
            className={`flex flex-col items-center ${
              isActive('/timeline') ? 'text-green-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <Image size={24} />
            <span className="text-xs mt-1">Timeline</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-col items-center ${
              isActive('/profile') ? 'text-green-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};