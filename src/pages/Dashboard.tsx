import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, PawPrint } from 'lucide-react';
import toast from 'react-hot-toast';

interface Application {
  id: string;
  pet: {
    name: string;
    photos: string[];
  };
  status: string;
  created_at: string;
}

interface Profile {
  is_shelter: boolean;
  shelter_name: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchApplications();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_shelter, shelter_name')
        .eq('id', user!.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function fetchApplications() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          pet:pets (
            name,
            photos
          )
        `)
        .eq('applicant_id', user!.id);

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {profile?.is_shelter ? 'Shelter Dashboard' : 'My Applications'}
        </h1>
        {profile?.is_shelter && (
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            <Plus className="h-5 w-5" />
            <span>List New Pet</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : applications.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {applications.map((application) => (
              <div key={application.id} className="p-6 flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    src={application.pet.photos?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500'}
                    alt={application.pet.name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{application.pet.name}</h3>
                  <p className="text-sm text-gray-500">
                    Applied on {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <PawPrint className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
          <p className="mt-2 text-gray-600">
            Start your journey to find your perfect companion today.
          </p>
        </div>
      )}
    </div>
  );
}