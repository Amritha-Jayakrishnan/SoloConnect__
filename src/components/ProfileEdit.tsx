import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, MapPin, Globe2, Languages, Heart } from 'lucide-react';

interface Profile {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  photo: string | null;
  city: string | null;
  country: string | null;
  interests: string[];
  languages: string[];
  bio: string | null;
}

export const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    name: '',
    age: null,
    gender: null,
    photo: null,
    city: null,
    country: null,
    interests: [],
    languages: [],
    bio: null,
  });

  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

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
      if (data) setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      navigate('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addInterest = () => {
    if (newInterest && !profile.interests.includes(newInterest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest),
    }));
  };

  const addLanguage = () => {
    if (newLanguage && !profile.languages.includes(newLanguage)) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language),
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo URL
            </label>
            <input
              type="url"
              value={profile.photo || ''}
              onChange={e => setProfile(prev => ({ ...prev, photo: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={profile.age || ''}
              onChange={e => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || null }))}
              className="w-full p-2 border rounded-lg"
              min="18"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={profile.gender || ''}
              onChange={e => setProfile(prev => ({ ...prev, gender: e.target.value as Profile['gender'] }))}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={profile.city || ''}
                onChange={e => setProfile(prev => ({ ...prev, city: e.target.value }))}
                className="p-2 border rounded-lg"
                placeholder="City"
              />
              <input
                type="text"
                value={profile.country || ''}
                onChange={e => setProfile(prev => ({ ...prev, country: e.target.value }))}
                className="p-2 border rounded-lg"
                placeholder="Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Add an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Languages
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLanguage}
                onChange={e => setNewLanguage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Add a language"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map(language => (
                <span
                  key={language}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio || ''}
              onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 py-3 bg-green-600 text-white rounded-lg ${
              saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};