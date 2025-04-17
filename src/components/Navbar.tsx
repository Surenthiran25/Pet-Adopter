import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Search, Heart, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">PetPals</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/pets" className="nav-link">
              <Search className="h-5 w-5" />
              <span>Find Pets</span>
            </Link>
            <Link to="/favorites" className="nav-link">
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link to="/profile" className="nav-link">
              <UserCircle className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;