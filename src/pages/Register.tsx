import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShelter, setIsShelter] = useState(false);
  const [shelterName, setShelterName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(email, password);
      
      if (isShelter) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            is_shelter: true,
            shelter_name: shelterName
          })
          .eq('id', (await supabase.auth.getUser()).data.user?.id);

        if (profileError) throw profileError;
      }

      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to register');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isShelter"
              checked={isShelter}
              onChange={(e) => setIsShelter(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="isShelter" className="ml-2 block text-sm text-gray-700">
              Register as a shelter
            </label>
          </div>
          {isShelter && (
            <div>
              <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700">
                Shelter Name
              </label>
              <input
                type="text"
                id="shelterName"
                value={shelterName}
                onChange={(e) => setShelterName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-500">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}