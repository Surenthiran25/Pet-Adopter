import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About PetPals</h3>
            <p className="text-gray-300">
              Connecting loving homes with pets in need. Our mission is to make pet adoption simple, 
              efficient, and joyful for everyone involved.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>support@petpals.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>1-800-PETPALS</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400">Twitter</a>
              <a href="#" className="hover:text-purple-400">Facebook</a>
              <a href="#" className="hover:text-purple-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by PetPals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;