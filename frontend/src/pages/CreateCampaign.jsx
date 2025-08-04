import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const CreateCampaign = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    date: '',
    description: '',
    category: '',
    phone: '',
    duration: '',
  });

  useEffect(() => {
  console.log(user);
  if (user) {
    setFormData(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || ''
    }));
    console.log("Prefilled from user:", user.name, user.email);
  }
}, [user]);


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("hhiiiii")
    try {
      const res = await fetch('http://localhost:5000/api/campaigns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Campaign created successfully");
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          title: '',
          description: '',
          location: '',
          category: '',
          phone: '',
          duration: ''
        })
      }
      else {
        toast.error(data.message || 'Failed to create campaign');
      }
    }
    catch (err) {
      console.error(err);
      alert('Server error');
    }
    formData = '';
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 px-6 py-12 md:px-20 ">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-4 text-5xl font-extrabold text-lime-500 mb-4">
            <FaLeaf className="text-lime-500 animate-pulse" />
            Create a Campaign
          </div>
          <p className="text-lg text-gray-600 font-medium leading-relaxed mt-7">
            Empower your community by organizing an eco-friendly event. Fill in the details below to get started and make a difference.
          </p>
        </motion.div>

        {/* Campaign Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.4)}
          className="p-8 w-full max-w-[1280px] bg-white rounded-3xl shadow-xl mx-auto space-y-7 border border-gray-100"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="yourName" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="yourName"
                name="name"
                placeholder="Pooja singh"
                value={formData.name} readOnly onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                name="email"
                placeholder="ps@example.com"
                value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>
          </div>

          {/* Phone & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-700 transition duration-200 ease-in-out"
                required
              >
                <option value="">Select Category</option>
                <option value="cleanup">Cleanup Drive</option>
                <option value="plantation">Tree Plantation</option>
                <option value="awareness">Awareness Event</option>
                <option value="recycling">Recycling Initiative</option>
              </select>
            </div>
          </div>

          {/* Campaign Title */}
          <div>
            <label htmlFor="campaignTitle" className="block text-sm font-semibold text-gray-700 mb-2">Campaign Title</label>
            <input
              type="text"
              name="title"
              id="campaignTitle"
              value={formData.title} onChange={handleChange}
              placeholder="E.g. Clean the River Drive"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              required
            />
          </div>

          {/* Location, Date, Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.city} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-700 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="E.g. 3 hours, 2 days"
                value={formData.duration} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe the purpose and details of the campaign..."
              value={formData.description} onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Submit Campaign
            </button>
          </div>
        </motion.form>
      </div>
      <footer className="bg-green-900 backdrop-blur-md text-white text-center py-4 ">
        <p className="text-sm">&copy; 2025 GreenSpark. All rights reserved.</p>
        <div className="mt-2 text-xs space-x-4 opacity-80">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CreateCampaign;