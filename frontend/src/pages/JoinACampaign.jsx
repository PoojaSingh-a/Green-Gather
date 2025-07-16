import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import mainBckg1 from '../assets/images/mainBckg.jpg';
import { Link, useNavigate } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

const JoinACampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const campaignsRef = useRef(null);
  const navigate = useNavigate();

  const API_KEY = 'mGHOrkGUh2xl3y0JAxWiHFrrjDN93i3k'; // Replace with your key

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll < lastScrollY || currentScroll < 100);
      setLastScrollY(currentScroll);
      setShowScrollHint(currentScroll <= window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=environment&sort=date,asc&apikey=${API_KEY}`;

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(apiUrl);
        const events = response.data._embedded?.events || [];

        const filtered = events.filter((event) =>
          event.name?.toLowerCase().includes("environment") ||
          event.name?.toLowerCase().includes("nature")
        );

        setCampaigns(filtered);
      } catch (error) {
        console.error("Error fetching Ticketmaster events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [API_KEY]);


  const handleScrollDown = () => {
    if (campaignsRef.current) {
      const topOffset = campaignsRef.current.offsetTop;
      window.scrollTo({
        top: topOffset - 40,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`flex justify-between items-center px-8 md:px-16 py-2 bg-transparent fixed text-white top-0 w-full z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <FaLeaf className="text-3xl text-lime-500 animate-pulse drop-shadow" />
          <h1 className="text-3xl font-bold tracking-wide">GreenSpark</h1>
        </div>
        <ul className="hidden md:flex gap-6 text-base font-medium">
          {[
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Campaigns', path: '/campaigns' },
            { label: 'Join Us', path: '/join-campaign' },
            { label: 'Login', path: '/login' },
          ].map((item, index) => (
            <motion.li
              key={item.label}
              className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
              variants={fadeIn(index * 0.1)}
              initial="hidden"
              animate="visible"
            >
              <Link to={item.path}>{item.label}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 bg-gradient-to-r from-lime-600 to-green-600">
        <img
          src={mainBckg1}
          alt="Nature background"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.3)}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Join a Campaign</h2>
          <p className="text-xl max-w-2xl mx-auto text-lime-100 font-light">
            Take action for a greener planet. Join a local initiative, make an impact, and inspire change.
          </p>
          <button className=" mt-7 py-3 px-5 text-white font-semibold border-white border-2 rounded-full hover:bg-white hover:text-black hover:font-semibold ">
            Create a Campaign
          </button>cd
        </motion.div>
        {showScrollHint && (
          <motion.div
            className="absolute bottom-10 z-20 text-white text-3xl cursor-pointer"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            onClick={handleScrollDown}
            title="Scroll down"
          >
            <IoIosArrowDown className="mx-auto drop-shadow-xl" />
          </motion.div>
        )}
      </section >

      {/* Campaigns Section */}
      <section section ref={campaignsRef} className="p-6 md:p-16 bg-white min-h-screen" >
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
        >
          Environmental Campaigns in India
        </motion.h3>

        {
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-green-100 animate-pulse rounded-xl p-6 h-52 shadow-sm"
                >
                  <div className="h-6 bg-green-300 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-green-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-green-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <p className="text-center text-red-600 font-medium">No campaigns found.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
              initial="hidden"
              animate="visible"
              variants={fadeIn(0.3)}
            >
              {campaigns.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-green-50 border border-green-100 hover:shadow-xl rounded-2xl p-6 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold text-green-900 mb-2">
                    {event.name.text}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Start:</strong>{' '}
                    {new Date(event.start.local).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {event.description?.text
                      ? event.description.text.slice(0, 120) + '...'
                      : 'No description available.'}
                  </p>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-green-800 hover:text-lime-700 font-semibold underline"
                  >
                    View Event →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </section >
    </>
  );
};

export default JoinACampaign;
