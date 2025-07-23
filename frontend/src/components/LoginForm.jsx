import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(
          <div>
            <strong>Welcome back!</strong>
            <div>You've successfully logged in.</div>
          </div>,
          {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          }
        );

        // Trigger parent update
        onLoginSuccess();

        // Close modal after short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      toast.error(`${err.response?.data?.msg || 'Login failed'}`, {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 px-2">
      <h2 className="text-2xl font-bold text-start text-green-800 mb-2">Welcome Back</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
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

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
