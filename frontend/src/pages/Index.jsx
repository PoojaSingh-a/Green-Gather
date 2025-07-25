import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { FaHandsHelping, FaStar, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mainBckg1 from '../assets/images/mainBckg.jpg';
import mainBckg2 from '../assets/images/mainBckg1.jpg';
import mainBckg3 from '../assets/images/mainBckg2.jpg';
import mainBckg4 from '../assets/images/mainBckg3.jpg';
import Modal from "../components/Modal";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../context/authContext.jsx';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay } },
});

// --- Navbar Component ---
// Navbar now gets isLoggedIn from context directly
const Navbar = ({ setShowLoginModal }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // <--- Get isLoggedIn and logout from context
  console.log("isLogged is : ", isLoggedIn);
  const handleNavigation = (item) => {
    switch (item) {
      case 'Home': navigate('/'); break;
      case 'About': navigate('/about'); break;
      case 'Campaigns': navigate('/campaigns'); break;
      case 'Join Us': navigate('/joinus'); break;
      case 'Login': setShowLoginModal(true); break;
      case 'Logout': logout(); break; // <--- Use the logout function from context
      default: break;
    }
  };

  const menuItems = ['Home', 'About', 'Campaigns', 'Join Us'];
  if (!isLoggedIn) {
    menuItems.push('Login');
  } else {
    menuItems.push('Logout');
  }

  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-2 bg-transparent text-white fixed top-0 w-full z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <FaLeaf className="text-3xl text-lime-500 animate-pulse drop-shadow" />
        <h1 className="text-3xl font-bold tracking-wide">GreenSpark</h1>
      </div>
      <ul className="flex gap-6 text-base md:text-md font-medium">
        {menuItems.map((item, index) => (
          <motion.li
            key={item}
            className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
            variants={fadeIn(index * 0.1)}
            initial="hidden"
            animate="visible"
            onClick={() => handleNavigation(item)}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

// --- HeroSection Component ---
// HeroSection now gets isLoggedIn and userName from context directly
const HeroSection = ({ setShowRegisterModal }) => {
  const images = [mainBckg1, mainBckg2, mainBckg3, mainBckg4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useAuth(); // <--- Get isLoggedIn and userName from context

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center px-6 transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-60 z-0 transition-opacity duration-1000" />
      <div className="relative z-10 max-w-4xl w-full p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl">
        {userName && (
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-lime-400 mb-7"
            variants={fadeIn(0)}
            initial="hidden"
            animate="visible"
          >
            Welcome back, <span className="text-white">{userName}</span>
          </motion.h3>
        )}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-5"
          variants={fadeIn(0.1)}
          initial="hidden"
          animate="visible"
        >
          Join the <span className="text-lime-500">Green</span> Movement
        </motion.h2>
        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed"
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="visible"
        >
          Be part of a vibrant community restoring nature and earning green rewards.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4"
          variants={fadeIn(0.4)}
          initial="hidden"
          animate="visible"
        >
          <Button onClick={() => navigate('/joinacampaign')} text="Join a Campaign" gradient />
          {!isLoggedIn && (
            <Button onClick={() => setShowRegisterModal(true)} text="Get Started" />
          )}
        </motion.div>
      </div>
    </section>
  );
};

// --- Button Component ---
const Button = ({ text, gradient, onClick }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group rounded-full text-white px-8 py-3 shadow-xl text-base font-semibold transition-all duration-300 ease-in-out ${gradient
      ? 'bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700'
      : 'border-2 border-white hover:bg-white hover:text-green-800'
    }`}
  >
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition" />
    {text}
  </button>
);

// --- HowItWorks Component ---
const HowItWorks = () => (
  <section className="py-24 px-6 md:px-20 bg-gradient-to-br text-center">
    <motion.div
      className="grid gap-12 md:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        {
          icon: <FiMapPin className="text-5xl text-red-500 mb-5 mx-auto" />,
          title: 'Discover Campaigns',
          description: 'Find eco-events and drives near you with ease.',
        },
        {
          icon: <FaHandsHelping className="text-5xl text-green-600 mb-5 mx-auto" />,
          title: 'Join & Participate',
          description: 'Contribute to tree-planting, clean-ups, and more.',
        },
        {
          icon: <FaStar className="text-5xl text-yellow-500 mb-5 mx-auto" />,
          title: 'Earn Points & Impact',
          description: 'Track your contributions and unlock green rewards.',
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-white hover:shadow-2xl hover:scale-105 transition-all p-10 rounded-3xl border border-emerald-200"
          variants={fadeIn(index * 0.2)}
        >
          {item.icon}
          <h4 className="text-2xl font-semibold text-green-900">{item.title}</h4>
          <p className="text-gray-700 mt-4 text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-green-900 backdrop-blur-md text-white text-center py-4 mt-16">
    <p className="text-sm">&copy; 2025 GreenSpark. All rights reserved.</p>
    <div className="mt-2 text-xs space-x-4 opacity-80">
      <a href="#" className="hover:underline">About</a>
      <a href="#" className="hover:underline">Contact</a>
      <a href="#" className="hover:underline">Privacy Policy</a>
    </div>
  </footer>
);

// --- Main Index Component ---
const Index = () => {
  // Use useAuth to get the login function and isLoading status
  const { login, isLoading } = useAuth(); 

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // Removed local isLoggedIn and userName states as they are now managed by AuthContext

  const handleRegisterSuccess = () => {
    toast.success('You may login now!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      theme: 'colored',
    });
    setShowRegisterModal(false);
  };

  const handleLoginSuccess = (loggedInUserName) => { // LoginForm should pass the username on success
    login(loggedInUserName); // <--- Use the login function from AuthContext to update global state
    setShowLoginModal(false);
    toast.success('Logged in successfully!', { // Add a success toast for login
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      theme: 'colored',
    });
  };

  // Render a loading state while authentication check is in progress
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lime-50 via-green-100 to-sky-100">
        <FaLeaf className="text-6xl text-lime-500 animate-spin" />
        <p className="ml-4 text-xl text-green-800">Loading user session...</p>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-lime-50 via-green-100 to-sky-100 min-h-screen overflow-x-hidden">
      {/* Navbar and HeroSection no longer need isLoggedIn/userName props from Index */}
      <Navbar setShowLoginModal={setShowLoginModal} />
      <HeroSection setShowRegisterModal={setShowRegisterModal} />
      <HowItWorks />
      <Footer />
      <ToastContainer />

      {(showLoginModal || showRegisterModal) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal onClose={() => setShowRegisterModal(false)}>
          <RegisterForm onClose={() => setShowRegisterModal(false)} onRegisterSuccess={handleRegisterSuccess} />
        </Modal>
      )}
    </div>
  );
};

export default Index;