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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const Navbar = ({ setShowLoginModal }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleNavigation = (item) => {
    switch (item) {
      case 'Home': navigate('/'); break;
      case 'About': navigate('/about'); break;
      case 'Campaigns': navigate('/campaigns'); break;
      case 'Login': setShowLoginModal(true); break;
      case 'Logout': logout(); break;
      default: break;
    }
  };

  const baseMenuItems = ['Home', 'About', 'Campaigns'];
  const menuItems = isLoggedIn ? [...baseMenuItems, 'Logout'] : [...baseMenuItems, 'Login'];

  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-4 bg-black/20 backdrop-blur-lg border-b border-white/10 fixed top-0 w-full z-50">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <FaLeaf className="text-3xl text-lime-500 animate-pulse-slow" />
        <h1 className="text-3xl font-bold tracking-wide text-white">GreenSpark</h1>
      </div>
      <ul className="flex gap-6 text-base md:text-md font-medium">
        {menuItems.map((item, index) => (
          <motion.li
            key={item}
            className="text-white hover:text-lime-500 transition-colors duration-200 cursor-pointer"
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

const HeroSection = ({ setShowRegisterModal }) => {
  const images = [mainBckg1, mainBckg2, mainBckg3, mainBckg4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="relative h-screen flex items-center justify-center px-6 transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>
      <div className="relative z-20 max-w-4xl w-full text-center p-8">
        {userName && (
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-lime-400 mb-4 drop-shadow-md"
            variants={fadeIn(0)}
            initial="hidden"
            animate="visible"
          >
            Welcome back, <span className="text-white">{userName}</span>
          </motion.h3>
        )}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-5 leading-tight"
          variants={fadeIn(0.1)}
          initial="hidden"
          animate="visible"
        >
          Join the <span className="text-lime-500">Green</span> Movement
        </motion.h2>
        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed drop-shadow"
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="visible"
        >
          Be part of a vibrant community restoring nature and earning green rewards.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          variants={fadeIn(0.4)}
          initial="hidden"
          animate="visible"
        >
          <Button onClick={() => navigate('/campaigns')} text="Explore Campaigns" gradient />
          {!isLoggedIn && (
            <Button onClick={() => setShowRegisterModal(true)} text="Get Started" />
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Button = ({ text, gradient, onClick }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group rounded-full text-white px-8 py-3 shadow-xl text-base font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${gradient
      ? 'bg-gradient-to-r from-lime-600 to-green-700 hover:from-green-700 hover:to-lime-600'
      : 'border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white'
      }`}
  >
    {text}
  </button>
);

const HowItWorks = () => (
  <section className="py-24 px-6 md:px-20 bg-gray-50 text-gray-900">
    <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-green-900 drop-shadow-md">
      How It Works
    </h3>
    <motion.div
      className="grid gap-10 md:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {[
        {
          icon: <FiMapPin className="text-5xl text-lime-500 mb-5 mx-auto" />,
          title: 'Discover Campaigns',
          description: 'Find eco-events and drives near you with ease.',
        },
        {
          icon: <FaHandsHelping className="text-5xl text-lime-500 mb-5 mx-auto" />,
          title: 'Join & Participate',
          description: 'Contribute to tree-planting, clean-ups, and more.',
        },
        {
          icon: <FaStar className="text-5xl text-lime-500 mb-5 mx-auto" />,
          title: 'Earn Points & Impact',
          description: 'Track your contributions and unlock green rewards.',
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-3xl border border-gray-100 p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lime-200/50"
          variants={fadeIn(index * 0.2)}
        >
          {item.icon}
          <h4 className="text-2xl font-semibold text-green-800">{item.title}</h4>
          <p className="text-gray-600 mt-4 leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-green-900 text-white text-center py-6 border-t border-white/10">
    <p className="text-sm opacity-80">&copy; 2025 GreenSpark. All rights reserved.</p>
    <div className="mt-2 text-xs space-x-4 opacity-60">
      <a href="#" className="hover:underline">About</a>
      <a href="#" className="hover:underline">Contact</a>
      <a href="#" className="hover:underline">Privacy Policy</a>
    </div>
  </footer>
);

const Index = () => {
  const { login, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleRegisterSuccess = () => {
    toast.success('You may login now!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      theme: 'colored',
    });
    setShowRegisterModal(false);
  };

  const handleLoginSuccess = (loggedInUserName) => {
    login(loggedInUserName);
    setShowLoginModal(false);
    toast.success('Logged in successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      theme: 'colored',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-950 text-white">
        <FaLeaf className="text-6xl text-lime-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-300">Loading user session...</p>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-lime-50 via-green-100 to-sky-100 min-h-screen overflow-x-hidden">
      <Navbar setShowLoginModal={setShowLoginModal} />
      <HeroSection setShowRegisterModal={setShowRegisterModal} />
      <HowItWorks />
      <Footer />
      <ToastContainer />
      {(showLoginModal || showRegisterModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
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