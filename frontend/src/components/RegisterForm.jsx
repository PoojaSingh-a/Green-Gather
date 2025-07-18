import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import Select from 'react-select';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError] = useState(''); 

  const indianStates = [
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          state: selectedState?.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Registration failed');
      
      alert('Registration successful!');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-2">
      <h2 className="text-2xl font-bold text-start text-green-800 mb-2">Create Your Account</h2>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-lime-500">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="John Doe"
            className="w-full outline-none bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

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

      {/* State Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <Select
          options={indianStates}
          value={selectedState}
          onChange={(selectedOption) => setSelectedState(selectedOption)}
          placeholder="Select your state"
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
