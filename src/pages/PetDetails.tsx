import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age_years: number;
  age_months: number;
  size: string;
  color: string;
  gender: string;
  medical_history: string;
  description: string;
  photos: string[];
  created_by: string;
}

export default function PetDetails() {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchPetDetails();
    }
  }, [id]);

  async function fetchPetDetails() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pets')
        .select(`
          *,
          profiles:created_by (
            shelter_name,
            shelter_address
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setPet(data);
    } catch (error) {
      console.error('Error fetching pet details:', error);
      toast.error('Failed to load pet details');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdoptionRequest() {
    if (!user) {
      toast.error('Please sign in to submit an adoption request');
      return;
    }

    try {
      const { error } = await supabase.from('applications').insert({
        pet_id: id,
        applicant_id: user.id,
        status: 'pending',
        application_data: {}
      });

      if (error) throw error;
      toast.success('Adoption request submitted successfully!');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      toast.error('Failed to submit adoption request');
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Pet not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <img
              src={pet.photos?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500'}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="grid grid-cols-3 gap-2">
              {pet.photos?.slice(1, 4).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${pet.name} ${index + 2}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
              <p className="text-lg text-gray-600">{pet.breed}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Age</p>
                <p className="text-lg font-semibold">
                  {pet.age_years > 0 ? `${pet.age_years}y ` : ''}{pet.age_months}m
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-lg font-semibold">{pet.gender}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Size</p>
                <p className="text-lg font-semibold">{pet.size}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Color</p>
                <p className="text-lg font-semibold">{pet.color}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">About {pet.name}</h3>
              <p className="text-gray-600">{pet.description}</p>
            </div>

            <button
              onClick={handleAdoptionRequest}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Request to Adopt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}