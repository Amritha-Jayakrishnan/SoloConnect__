import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Lock, Mail } from 'lucide-react';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });
        if (signUpError) throw signUpError;

        // Create profile after successful signup
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: (await supabase.auth.getUser()).data.user?.id,
              name,
              created_at: new Date().toISOString(),
            },
          ]);
        if (profileError) throw profileError;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required={!isLogin}
              minLength={2}
            />
          </div>
        )}
        
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-2 rounded-lg transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      
      <p className="text-center mt-4 text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};