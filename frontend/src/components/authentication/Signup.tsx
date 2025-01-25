import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
        email,
        password,
        location,
        username ,
        farmname: username,
    }
    // TODO: Implement sign up logic
    axios.post("http://localhost:3000/register", data).then((response)=>{
        console.log(response.data , " this is the response")
    }).catch((err)=>{
        console.log(err.message ,"this is the error" )
    })
    console.log('Sign up:', { username, email, phoneNumber, password });
    navigate('/marketplace');
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 bg-white p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-gray-900">JOIN Harvest Hub</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Organization name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
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
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
            >
              Join
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <Link to="/signin" className="hover:text-blue-500">
                Already have an account? Sign in
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

export default SignUp;
