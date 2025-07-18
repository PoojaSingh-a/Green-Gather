import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try{
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password })
      });
      const data = await response.json();
      if(!response.ok){
        setErrorMsg(data.msg || 'Login failed');
        seetLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      alert(`Welcome back, ${data.user.name}`);
      onClose();
    }
    catch(error){
      console.error('Login error: ',error);
      setErrorMsg('something went wrong.');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-2"
    >
      <h2 className="text-2xl font-bold text-start text-green-800 mb-2">Welcome Back</h2>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-lime-500">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full outline-none bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-lime-500">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full outline-none bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
