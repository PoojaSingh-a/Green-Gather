import React, { useState } from 'react';
import { FaGlobeAsia, FaTimes, FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext'; 
import {ToastContainer, toast } from 'react-toastify';

const Navbar = ({ setShowLoginModal }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (item) => {
    switch (item) {
      case 'Home': navigate('/'); break;
      case 'About': navigate('/about'); break;
      case 'Campaigns': navigate('/campaigns'); break;
      case 'Login': setShowLoginModal(true); break;
      case 'Logout': logout(); toast.success("Logged out!"); break;
      default: break;
    }
    setMenuOpen(false); // Close menu on selection
  };

  const baseMenuItems = ['Home', 'About', 'Campaigns'];
  const menuItems = isLoggedIn ? [...baseMenuItems, 'Logout'] : [...baseMenuItems, 'Login'];

  return (
  <>
    <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-black/20 backdrop-blur-lg border-b border-white/10 fixed top-0 w-full z-50">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <FaGlobeAsia className="text-3xl text-lime-500 transition-all duration-300 group-hover:scale-110" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100">
          <span className="text-lime-500">Green</span>Gather
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-base md:text-md font-medium">
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => handleNavigation(item)}
            className="text-white hover:text-lime-500 transition-colors duration-200 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-50 text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute top-16 right-0 w-full bg-black/70 backdrop-blur-md p-8 flex flex-col gap-6 text-white text-lg font-semibold md:hidden"
        >
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleNavigation(item)}
              className="hover:text-lime-400 transition duration-200"
            >
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  </>
);

};

export default Navbar
