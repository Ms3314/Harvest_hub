import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-8">Harvest Hub</h2>
          <nav className="space-y-4">
            <Link
              to="/marketplace"
              className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
            >
              Marketplace
            </Link>
            <Link
              to="/inventory"
              className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
            >
              Inventory
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 