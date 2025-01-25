import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To show error messages
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      console.log('Server Response:', response.data); // Logs the server's response
      setErrorMessage(null); // Clear any previous error messages
      navigate('/marketplace'); // Navigate on success
    } catch (err: any) {
      // Handle errors
      console.error('Error Details:', err);

      // Provide more meaningful messages based on error type
      if (err.response) {
        // Server responded with a status code other than 2xx
        console.error('Response Data:', err.response.data);
        console.error('Response Status:', err.response.status);
        console.error('Response Headers:', err.response.headers);

        // Display error message from the backend, or a fallback message
        setErrorMessage(
          err.response.data?.error || 'An error occurred. Please try again.'
        );
      } else if (err.request) {
        // Request was made, but no response was received
        console.error('Request Details:', err.request);
        setErrorMessage('No response from the server. Please check your network.');
      } else {
        // Something went wrong in setting up the request
        console.error('Error Message:', err.message);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 bg-white p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-gray-900">Login Harvest Hub</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-red-500 text-sm text-center mb-4">
                {errorMessage}
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <Link to="/signup" className="hover:text-blue-500">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 relative">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://w0.peakpx.com/wallpaper/543/315/HD-wallpaper-farmer-field-nature-farmer.jpg"
          alt="Farmer in field"
        />
      </div>
    </div>
  );
};

export default SignIn;
