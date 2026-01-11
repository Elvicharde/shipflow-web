import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ShipFlow</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/bulk')}
              className="text-gray-600 hover:text-indigo-600 font-medium transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-indigo-600 font-medium transition"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Shipments
          </h2>
          <p className="text-xl text-gray-700 mt-4 mb-8 max-w-2xl mx-auto">
            Manage bulk shipments effortlessly. Upload CSV files, validate
            addresses, select shipping services, and print labels—all in one
            place.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
            >
              Upload CSV & Start Shipping
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white hover:bg-gray-50 text-indigo-600 font-bold py-3 px-8 rounded-lg border-2 border-indigo-600 transition"
            >
              View Shipments
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Bulk Upload
            </h3>
            <p className="text-gray-600">
              Upload CSV files with multiple shipments and process them all at
              once.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Smart Validation
            </h3>
            <p className="text-gray-600">
              Automatic address verification and package validation to ensure
              accuracy.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏷️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Label Printing
            </h3>
            <p className="text-gray-600">
              Preview and print shipping labels for all validated shipments
              instantly.
            </p>
          </div>
        </div>

        {/* Secondary CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first CSV file and experience efficient shipment
            management.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
          >
            Start Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 ShipFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
