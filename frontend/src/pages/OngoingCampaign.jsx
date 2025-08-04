import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaLeaf, FaSeedling } from 'react-icons/fa';
import backgroundVideo from '../assets/video/bckgVideo1.mp4';
import axios from 'axios';
import awarenessImg from '../assets/images/awareness.png';
import cleanupImg from '../assets/images/cleanup.png';
import recyclingImg from '../assets/images/recycle.png';
import plantationImg from '../assets/images/plantation.png';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const categoryImage = {
  awareness: awarenessImg,
  cleanup: cleanupImg,
  plantation: plantationImg,
  recycling: recyclingImg,
};

const OngoingCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns: ', error);
        setError('Failed to load campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-800">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={backgroundVideo}
        ></video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-30 px-4 py-16 md:px-12 lg:px-24">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-lg flex flex-col sm:flex-row justify-center items-center gap-3">
            <FaSeedling className="text-lime-600 animate-pulse-slow text-5xl" />
            Ongoing Campaigns
          </h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto drop-shadow-sm">
            Join our missions to protect and preserve nature. Every action counts, so find a campaign that inspires you!
          </p>
        </motion.div>

        {/* Campaign Grid */}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading campaigns...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-500">{error}</div>
        ) : campaigns.length === 0 ? (
          <div className="p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
            <p className="text-gray-500 text-center text-lg">No active campaigns at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn(index * 0.1)}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-lime-300/50 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {categoryImage[campaign.category] && (
                  <img 
                    src={categoryImage[campaign.category]} 
                    alt={campaign.category} 
                    className="w-full h-56 object-cover rounded-t-3xl border-b border-gray-200" 
                  />
                )}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {campaign.title}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-lime-500 text-white shadow-sm self-start whitespace-nowrap">
                      {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-base">{campaign.description}</p>
                  
                  <div className="pt-4 border-t border-gray-100 space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-green-500 text-lg" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500 text-lg" />
                      <span>{campaign.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-yellow-500 text-lg" />
                      <span>{campaign.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingCampaign;