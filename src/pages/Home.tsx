import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Find Your Perfect Companion</h1>
            <p className="text-xl mb-8">
              Give a loving home to pets in need. Browse through thousands of adorable pets 
              waiting for their forever families.
            </p>
            <Link 
              to="/pets" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-purple-700 transition duration-300"
            >
              Find a Pet
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Search className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Pets</h3>
            <p className="text-gray-600">
              Browse through our database of pets looking for their forever homes.
            </p>
          </div>
          <div className="text-center">
            <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Meet & Connect</h3>
            <p className="text-gray-600">
              Schedule meet-and-greets with pets that catch your eye.
            </p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Adopt & Love</h3>
            <p className="text-gray-600">
              Complete the adoption process and welcome your new family member.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1601758228041-f3b2795255f1' : 
                    i === 2 ? '1548199973-03cce0bbc87b' : '1558947530-cbcf6e9aeeae'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                  alt={`Success story ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">A Forever Home Found</h3>
                  <p className="text-gray-600">
                    "We couldn't be happier with our new family member. The adoption process was 
                    smooth and the support was amazing!"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;