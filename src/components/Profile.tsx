import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, MapPin, Globe2, Languages, Heart } from 'lucide-react';

interface Profile {
  name: string;
  age: number | null;
  gender: string | null;
  photo: string | null;
  city: string | null;
  country: string | null;
  interests: string[];
  languages: string[];
  bio: string | null;
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-white mb-4">No profile found</div>
        <button
          onClick={() => navigate('/profile/edit')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <User size={64} className="text-gray-400" />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {profile.name}
                {profile.age && `, ${profile.age}`}
              </h1>
              {profile.gender && (
                <p className="text-gray-600">{profile.gender}</p>
              )}
            </div>
            <button
              onClick={() => navigate('/profile/edit')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Edit Profile
            </button>
          </div>

          {(profile.city || profile.country) && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin size={20} />
              <span>{[profile.city, profile.country].filter(Boolean).join(', ')}</span>
            </div>
          )}

          {profile.bio && (
            <p className="text-gray-700 mb-6">{profile.bio}</p>
          )}

          {profile.interests.length > 0 && (
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                <Heart size={20} />
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                <Globe2 size={20} />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map(language => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};