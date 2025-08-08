import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundVideo from '../assets/video/bckgVideo1.mp4'; 
import Navbar from '../components/Navbar';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const CreateCampaign = () => {
  const { user } = useAuth();
  const [showLoginModal,setShowLoginModal] = useState(true);
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
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
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
        toast.success("Campaign created successfully!");
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          title: '',
          location: '',
          date: '',
          description: '',
          category: '',
          phone: '',
          duration: '',
        });
      } else {
        toast.error(data.message || 'Failed to create campaign');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-800">
      <Navbar setShowLoginModal={setShowLoginModal} />
      
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={backgroundVideo}
        ></video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-30 px-4 py-16 md:px-12 lg:px-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mt-14 text-4xl sm:text-5xl font-extrabold text-white/90 drop-shadow-lg mb-4">
            Create a Campaign
          </div>
          <p className="text-lg text-white/70 font-medium leading-relaxed mt-7">
            Empower your community by organizing an eco-friendly event. Fill in the details below to get started and make a difference.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.4)}
          className="p-8 md:p-12 w-full max-w-6xl bg-lime-700 rounded-3xl shadow-xl mx-auto space-y-8 border border-lime-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="yourName" className="block text-lg font-semibold text-white mb-2">Your Name</label>
              <input
                type="text"
                id="yourName"
                name="name"
                placeholder="Pooja Singh"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-lg font-semibold text-white mb-2">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                name="email"
                placeholder="ps@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="phoneNumber" className="block text-lg font-semibold text-white mb-2">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-lg font-semibold text-white mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-700 transition duration-200 ease-in-out"
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

          <div>
            <label htmlFor="campaignTitle" className="block text-lg font-semibold text-white mb-2">Campaign Title</label>
            <input
              type="text"
              name="title"
              id="campaignTitle"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g. Clean the River Drive"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <label htmlFor="location" className="block text-lg font-semibold text-white mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-lg font-semibold text-white mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-700 transition duration-200 ease-in-out"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-lg font-semibold text-white mb-2">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="E.g. 3 hours, 2 days"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-white mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe the purpose and details of the campaign..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div className="text-right pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Submit Campaign
            </button>
          </div>
        </motion.form>
      </div>

      <footer className="relative z-30 bg-green-900 text-white text-center py-4">
        <p className="text-sm">&copy; 2025 GreenSpark. All rights reserved.</p>
        <div className="mt-2 text-xs space-x-4 opacity-80">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateCampaign;
