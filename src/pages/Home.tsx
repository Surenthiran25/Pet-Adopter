import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Find Your Perfect Companion
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with local shelters and find your new best friend. Thousands of pets are waiting for their forever homes.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/pets"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700"
          >
            Find a Pet
          </Link>
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-purple-600 hover:bg-purple-50"
          >
            Register as Shelter
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Search className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold">Easy Search</h3>
          <p className="text-gray-600">
            Find pets that match your lifestyle with our advanced search filters.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Heart className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold">Save Favorites</h3>
          <p className="text-gray-600">
            Keep track of pets you love and get notified when they're available.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold">Connect with Shelters</h3>
          <p className="text-gray-600">
            Direct communication with shelters to learn more about your future pet.
          </p>
        </div>
      </section>

      <section className="bg-purple-50 -mx-4 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Pets</h2>
          {/* Featured pets grid will be added here */}
        </div>
      </section>
    </div>
  );
}