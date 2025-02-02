import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { AuthForm } from './components/AuthForm';
import { Navbar } from './components/Navbar';
import { SwipeCard } from './components/SwipeCard';
import { Timeline } from './components/Timeline';
import { BlogPost } from './components/BlogPost';
import { Profile } from './components/Profile';
import { ProfileEdit } from './components/ProfileEdit';
import { useAuth } from './hooks/useAuth';

const mockUser = {
  id: '1',
  name: 'Sarah Parker',
  age: 28,
  gender: 'female' as const,
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  location: {
    city: 'Barcelona',
    country: 'Spain'
  },
  interests: ['Hiking', 'Photography', 'Local Food'],
  languages: ['English', 'Spanish'],
  bio: 'Adventure seeker exploring the world one city at a time!'
};

const mockTimelinePosts = [
  {
    id: '1',
    userId: '1',
    photo: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Sagrada Familia, Barcelona',
    caption: 'Finally visited this architectural masterpiece! 🏛️',
    date: new Date().toISOString(),
  }
];

const mockBlogPost = {
  id: '1',
  userId: '1',
  title: 'Hidden Gems in Barcelona',
  content: 'Discovering the less touristy spots in this beautiful city...',
  city: 'Barcelona',
  country: 'Spain',
  images: ['https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  createdAt: new Date().toISOString(),
  likes: 42
};

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a2f1f] flex items-center justify-center p-4">
        <AuthForm />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#1a2f1f] text-white pb-20">
        {/* Header */}
        <header className="p-4 flex items-center justify-between bg-[#234024] shadow-lg">
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold">SoloConnect</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-md mx-auto">
                  <SwipeCard
                    user={mockUser}
                    onSwipeLeft={() => console.log('Swiped left')}
                    onSwipeRight={() => console.log('Swiped right')}
                  />
                </div>
              }
            />
            <Route
              path="/timeline"
              element={
                <div className="max-w-2xl mx-auto">
                  <Timeline posts={mockTimelinePosts} />
                </div>
              }
            />
            <Route
              path="/blog"
              element={
                <div className="max-w-2xl mx-auto">
                  <BlogPost post={mockBlogPost} />
                </div>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Navbar />
      </div>
    </Router>
  );
}

export default App;