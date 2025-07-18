import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { FaHandsHelping, FaStar, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import mainBckg1 from '../assets/images/mainBckg.jpg';
import mainBckg2 from '../assets/images/mainBckg1.jpg';
import mainBckg3 from '../assets/images/mainBckg2.jpg';
import mainBckg4 from '../assets/images/mainBckg3.jpg';

import Modal from "../components/Modal";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm'; 

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

const Navbar = ({ setShowLoginModal }) => {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    switch (item) {
      case 'Home':
        navigate('/');
        break;
      case 'About':
        navigate('/about');
        break;
      case 'Campaigns':
        navigate('/campaigns');
        break;
      case 'Join Us':
        navigate('/joinus');
        break;
      case 'Login':
        setShowLoginModal(true); // ⬅️ Show login modal instead of navigating
        break;
      default:
        break;
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-2 bg-transparent text-white fixed top-0 w-full z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <FaLeaf className="text-3xl text-lime-500 animate-pulse drop-shadow" />
        <h1 className="text-3xl font-bold tracking-wide">GreenSpark</h1>
      </div>
      <ul className="flex gap-6 text-base md:text-md font-medium">
        {['Home', 'About', 'Campaigns', 'Join Us', 'Login'].map((item, index) => (
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

const HeroSection = ({ setShowRegisterModal }) => {
  const images = [mainBckg1, mainBckg2, mainBckg3, mainBckg4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center text-center px-6 transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-50 z-0 transition-opacity duration-1000" />
      <div className="relative z-10 max-w-4xl">
        <motion.h2
          className="text-5xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6"
          variants={fadeIn(0)}
          initial="hidden"
          animate="visible"
        >
          Join the <span className='text-lime-500'>Green</span> Movement
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-10"
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="visible"
        >
          Be part of a vibrant community restoring nature and earning green rewards.
        </motion.p>
        <motion.div
          className="flex justify-center gap-5 flex-wrap"
          variants={fadeIn(0.4)}
          initial="hidden"
          animate="visible"
        >
          <Button onClick={() => navigate('/joinacampaign')} text="Join a Campaign" gradient />
          <Button onClick={() => setShowRegisterModal(true)} text="Get Started" />
        </motion.div>
      </div>
    </section>
  );
};

const Button = ({ text, gradient, onClick }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group rounded-full text-white px-8 py-3 shadow-xl text-base font-semibold transition-all duration-300 ease-in-out ${
      gradient
        ? 'bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700'
        : 'border-2 border-white hover:bg-white hover:text-green-800'
    }`}
  >
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition" />
    {text}
  </button>
);

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

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

 /* useEffect(() => {
    if (showRegisterModal || showLoginModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Clean up just in case
    return () => document.body.classList.remove('overflow-hidden');
  }, [showRegisterModal, showLoginModal]);*/

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-lime-50 via-green-100 to-sky-100 min-h-screen overflow-x-hidden">
      <Navbar setShowLoginModal={setShowLoginModal} />
      <HeroSection setShowRegisterModal={setShowRegisterModal} />
      <HowItWorks />
      <Footer />
      {(showLoginModal || showRegisterModal) && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
    )}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal onClose={() => setShowRegisterModal(false)}>
          <RegisterForm onClose={() => setShowRegisterModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Index;
