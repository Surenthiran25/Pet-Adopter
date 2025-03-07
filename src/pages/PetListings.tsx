import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Search, Filter } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age_years: number;
  age_months: number;
  photos: string[];
}

export default function PetListings() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    ageRange: 'all'
  });

  useEffect(() => {
    fetchPets();
  }, [filters]);

  async function fetchPets() {
    try {
      setLoading(true);
      let query = supabase.from('pets').select('*').eq('status', 'available');

      if (filters.species) {
        query = query.eq('species', filters.species);
      }
      if (filters.breed) {
        query = query.eq('breed', filters.breed);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Available Pets</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search pets..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pets...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Link
              key={pet.id}
              to={`/pets/${pet.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={pet.photos?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500'}
                  alt={pet.name}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                <p className="text-gray-600">
                  {pet.breed} • {pet.age_years > 0 ? `${pet.age_years}y ` : ''}{pet.age_months}m
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}