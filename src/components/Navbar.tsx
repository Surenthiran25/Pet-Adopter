import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint as Paw, UserCircle, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Paw className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">PetPals</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pets" className="text-gray-600 hover:text-purple-600">Find Pets</Link>
            {user?.id && (
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user?.id ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <UserCircle className="h-6 w-6 text-gray-600" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}