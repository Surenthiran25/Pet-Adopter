import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const PetListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for demonstration
  const pets = [
    {
      id: '1',
      name: 'Max',
      species: 'dog',
      breed: 'Golden Retriever',
      age: 2,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      location: 'New York, NY'
    },
    {
      id: '2',
      name: 'Luna',
      species: 'cat',
      breed: 'Persian',
      age: 1,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      location: 'Los Angeles, CA'
    },
    // Add more mock pets here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
              <p className="text-gray-600 mb-2">
                {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
              </p>
              <p className="text-gray-500 text-sm">{pet.location}</p>
              <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListings;