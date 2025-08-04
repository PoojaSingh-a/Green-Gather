import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaLeaf, FaSeedling } from 'react-icons/fa';
import backgroundVideo from '../assets/video/bckgVideo1.mp4';
import axios from 'axios';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const OngoingCampaign = () => {
  const [campaign, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(response.data);
      }
      catch (error) {
        console.error('Error fetching campaigns: ', error);
      }
    };
    fetchCampaigns();
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        src={backgroundVideo}// Replace with a better green/nature video URL
      ></video>
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 via-green-300/20 to-white/60 backdrop-blur-sm z-10"></div>
      <div className="absolute animate-pulse-slow left-0 top-0 w-full h-full bg-[url('https://in.pinterest.com/pin/71635450322126830/')] bg-repeat opacity-10 z-20 pointer-events-none"></div>
      <div className="relative z-30 px-6 py-16 md:px-20">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold text-white drop-shadow-md flex justify-center items-center gap-3">
            <FaSeedling className="text-lime-400 animate-bounce" />
            Ongoing Campaigns
          </h2>
          <p className="text-lg text-gray-100 mt-4 max-w-2xl mx-auto drop-shadow-sm">
            Browse through nature-saving missions happening near you 🌱.
          </p>
        </motion.div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campaign.length === 0 ? (
            <div className='p-4 bg-white w-full rounded-lg'>
            <p className="text-green-700 text-center col-span-full">No Campaigns.</p>
            </div>
          ) : (
            campaign.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn(index * 0.2)}
                className="bg-white bg-opacity-90 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-lime-100 overflow-hidden"
              >
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-lime-600 flex items-center gap-2">
                    <FaLeaf className="text-lime-400" /> {campaign.title}
                  </h3>
                  <p className="text-gray-600">{campaign.description}</p>

                  <div className="text-sm text-gray-500 space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>{campaign.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-yellow-500" />
                      <span>{campaign.duration}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-lime-500 text-white shadow-sm">
                      {campaign.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingCampaign;
