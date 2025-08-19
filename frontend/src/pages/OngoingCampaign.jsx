import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import { TbArrowsDiagonal } from "react-icons/tb";
import backgroundVideo from "../assets/video/bckgVideo1.mp4";
import axios from "axios";
import Navbar from "../components/Navbar";
import awarenessImg from "../assets/images/awareness.png";
import cleanupImg from "../assets/images/cleanup.png";
import recyclingImg from "../assets/images/recycle.png";
import plantationImg from "../assets/images/plantation.png";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});

const categoryImage = {
  awareness: awarenessImg,
  cleanup: cleanupImg,
  plantation: plantationImg,
  recycling: recyclingImg,
};

const OngoingCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const categoryColors = {
    awareness: "bg-blue-500",
    cleanup: "bg-red-500",
    plantation: "bg-green-500",
    recycling: "bg-yellow-500"
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/campaigns");
        setCampaigns(response.data);
        setFilteredCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns: ", error);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    let filtered = campaigns;

    if (locationFilter.trim()) {
      filtered = filtered.filter((c) =>
        c.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  }, [locationFilter, searchTerm, campaigns]);


  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-800">
        <Navbar setShowLoginModal={setShowLoginModal} />
        {/* Background Video */}
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
          {/* Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn(0.2)}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mt-10 font-extrabold text-white drop-shadow-lg">
              Ongoing Campaigns
            </h2>
            <p className="text-lg text-white/70 font-medium leading-relaxed mt-6">
              Join our missions to protect and preserve nature. Every action
              counts — find a campaign that inspires you!
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn(0.3)}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            {/* Search by title */}
            <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 w-full md:w-1/3 shadow-lg border border-white/30">
              <FaSearch className="text-white/70 mr-3" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/60 w-full"
              />
            </div>

            {/* Filter by location */}
            <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 w-full md:w-1/3 shadow-lg border border-white/30">
              <FaMapMarkerAlt className="text-white/70 mr-3" />
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/60 w-full"
              />
            </div>
          </motion.div>

          {/* Campaign Cards */}
          {loading ? (
            <div className="text-center text-lg text-gray-300">
              Loading campaigns...
            </div>
          ) : error ? (
            <div className="text-center text-lg text-red-400">{error}</div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="p-8 bg-white/20 rounded-xl shadow-lg max-w-lg mx-auto">
              <p className="text-gray-300 text-center text-lg">
                No campaigns found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn(index * 0.1)}
                  className="bg-white/90 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-lime-300/70 transform hover:-translate-y-2 transition-all duration-300 border border-3xl border-lime-500 overflow-hidden"
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
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white shadow-sm self-start whitespace-nowrap 
                        ${categoryColors[campaign.category] || "bg-gray-500"}`}>
                        {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-base">
                      {campaign.description}
                    </p>
                    <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-green-500 text-lg" />
                        <span>{campaign.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-500 text-lg" />
                        <span>
                          {new Date(campaign.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short", // or "long"
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <FaClock className="text-yellow-500 text-lg" />
                        <span>{campaign.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                       {/* <TbArrowsDiagonal size={20} className="hover:cursor-pointer"/> */}
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="bg-lime-700 text-white text-center py-6 border-t border-white/10">
        <p className="text-sm opacity-80">&copy; 2025 Planet Patrol. All rights reserved.</p>
        <div className="mt-2 text-xs space-x-4 opacity-60">
          <a href="#" onClick={() => navigate('/about')} className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </>
  );
};

export default OngoingCampaign;
