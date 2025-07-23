import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import mainBckg1 from '../assets/images/mainBckg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx'; // Import useAuth
import { toast } from 'react-toastify'; // Import toast for messages

// --- Reusable Navbar Component (Consider moving this to components/Navbar.jsx) ---
// This Navbar is designed to use the AuthContext directly, making it independent of parent props for auth state.
const Navbar = ({ setShowLoginModal }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleNavigation = (item) => {
    switch (item) {
      case 'Home': navigate('/'); break;
      case 'About': navigate('/about'); break;
      case 'Campaigns': navigate('/campaigns'); break;
      case 'Join Us': navigate('/joinus'); break; // Adjust path if this page is /joinacampaign
      case 'Login': setShowLoginModal(true); break; // Open the login modal
      case 'Logout': logout(); break; // Use the logout function from AuthContext
      default: break;
    }
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Campaigns', path: '/campaigns' },
    { label: 'Join Us', path: '/joinacampaign' }, // Correct path for this page
  ];

  // Dynamically add Login or Logout based on auth status
  if (!isLoggedIn) {
    menuItems.push({ label: 'Login', path: '#' }); // Path # or handle in handleNavigation
  } else {
    menuItems.push({ label: 'Logout', path: '#' }); // Path # or handle in handleNavigation
  }

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay } },
  });

  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-2 bg-transparent text-white fixed top-0 w-full z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <FaLeaf className="text-3xl text-lime-500 animate-pulse drop-shadow" />
        <h1 className="text-3xl font-bold tracking-wide">GreenSpark</h1>
      </div>
      <ul className="flex gap-6 text-base md:text-md font-medium">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.label}
            className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
            variants={fadeIn(index * 0.1)}
            initial="hidden"
            animate="visible"
            onClick={() => handleNavigation(item.label)} // Pass item.label to handleNavigation
          >
            {/* If it's Login/Logout, handleNavigation will manage the action, otherwise use Link */}
            {item.path === '#' ? item.label : <Link to={item.path}>{item.label}</Link>}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

// --- FadeIn animation (kept as is) ---
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

// --- JoinACampaign Component ---
const JoinACampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const campaignsRef = useRef(null);
  const navigate = useNavigate();

  // Add state for showing login modal (if you want it on this page)
  const [showLoginModal, setShowLoginModal] = useState(false);
  // If you decide to add login/register forms here, you'll need these imports
  // import Modal from "../components/Modal";
  // import LoginForm from '../components/LoginForm';
  // import RegisterForm from '../components/RegisterForm';
  // const { login } = useAuth(); // If you use handleLoginSuccess here

  // const handleLoginSuccess = (loggedInUserName) => {
  //   login(loggedInUserName);
  //   setShowLoginModal(false);
  //   toast.success('Logged in successfully!', { position: 'top-center', autoClose: 3000, theme: 'colored' });
  // };

  // const handleRegisterSuccess = () => {
  //   toast.success('You may login now!', { position: 'top-center', autoClose: 3000, theme: 'colored' });
  //   setShowRegisterModal(false); // assuming you would have a showRegisterModal state
  // };


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Show Navbar if scrolling up, or if at the very top
      setShowNav(currentScroll < lastScrollY || currentScroll < 100);
      setLastScrollY(currentScroll);
      // Show scroll hint if still within the top half of the viewport
      setShowScrollHint(currentScroll <= window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Call your own backend proxy endpoint for Ticketmaster events
    // Ensure your backend's /api/ticketmaster/events endpoint is correct
    const backendApiUrl = `http://localhost:5000/api/ticketmaster/events?keyword=environment&sort=date,asc`;

    const fetchCampaigns = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const response = await axios.get(backendApiUrl);
        const events = response.data._embedded?.events || [];

        // Filter events that contain 'environment' or 'nature' in their name or classifications
        const filtered = events.filter((event) =>
          event.name?.toLowerCase().includes("environment") ||
          event.name?.toLowerCase().includes("nature") ||
          // More robust filtering: check classifications like segment or genre names
          event.classifications?.some(c =>
            c.segment?.name?.toLowerCase().includes("nature") ||
            c.genre?.name?.toLowerCase().includes("environment") ||
            c.subGenre?.name?.toLowerCase().includes("environmental")
          )
        );

        setCampaigns(filtered);
      } catch (error) {
        console.error("Error fetching events from backend proxy:", error.message);
        // Display a user-friendly error message
        toast.error("Failed to load campaigns. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCampaigns();
    // Empty dependency array ensures this runs only once on component mount
  }, []);


  const handleScrollDown = () => {
    if (campaignsRef.current) {
      const topOffset = campaignsRef.current.offsetTop;
      window.scrollTo({
        top: topOffset - 40, // Adjust offset as needed for Navbar
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Navbar - Pass setShowLoginModal if you intend to show the login modal from this page */}
      <Navbar setShowLoginModal={setShowLoginModal} />

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
          </button>
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

      {/* Campaigns Section - FIXED: Removed the incorrect 'section' attribute */}
      <section ref={campaignsRef} className="p-6 md:p-16 bg-white min-h-screen" >
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
            // Loading skeleton
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
            // No campaigns found message
            <p className="text-center text-red-600 font-medium">No campaigns found matching "environment" or "nature".</p>
          ) : (
            // Display campaigns
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
                  {/* Accessing data more robustly as Ticketmaster API structure varies */}
                  <h4 className="text-xl font-semibold text-green-900 mb-2">
                    {event.name || 'Untitled Event'}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Start:</strong>{' '}
                    {event.dates?.start?.localDateTime ? new Date(event.dates.start.localDateTime).toLocaleString() : 'Date N/A'}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {/* Ticketmaster's description can be in 'info' or 'description' */}
                    {event.info ? event.info.slice(0, 120) + '...' : (event.description ? event.description.slice(0, 120) + '...' : 'No description available.')}
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

      {/* Optional: Login Modal (uncomment and import Modal, LoginForm if needed here) */}
      {/*
      {(showLoginModal) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}
      */}
    </>
  );
};

export default JoinACampaign;
