import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import { IoIosArrowDown } from 'react-icons/io';

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay, ease: "easeOut" } },
});

const CAMPAIGN_CARDS_DATA = [
    {
        title: "Create a Campaign",
        description: "Take the lead in organizing a beach cleanup and contribute to preserving marine life and coastal beauty.",
        location: "India",
        image: card1,
        route: "/campaigns/create",
    },
    {
        title: "Explore eco-friendly initiatives",
        description: "Support tree plantation efforts in urban areas to enhance greenery and combat environmental pollution.",
        location: "India",
        image: card2,
        route: "/campaigns/ongoing",
    },
];

const Campaigns = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [showScrollHint, setShowScrollHint] = useState(true);
    const campaignsRef = useRef(null);

    const handleNavigation = useCallback((item) => {
        switch (item) {
            case 'Home': navigate('/'); break;
            case 'About': navigate('/about'); break;
            case 'Campaigns': navigate('/campaigns'); break;
            case 'Login': navigate('/'); break; // Re-direct to home for login, assuming a modal or dedicated page exists there
            case 'Logout': logout(); break;
            default: break;
        }
    }, [navigate, logout]);

    const baseMenuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Campaigns', path: '/campaigns' },
    ];

    const actionItem = isLoggedIn
        ? { label: 'Logout', action: logout, path: '#' }
        : { label: 'Login', action: () => navigate('/'), path: '#' };

    const menuItems = [...baseMenuItems, actionItem];

    const handleScrollDown = () => {
        if (campaignsRef.current) {
            const topOffset = campaignsRef.current.offsetTop;
            window.scrollTo({
                top: topOffset - 100,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative min-h-screen bg-green-950 text-gray-100 overflow-hidden">
            {/* Navbar Section */}
            <nav className="flex justify-between items-center px-8 md:px-16 py-4 bg-black/40 fixed top-0 w-full z-50">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/')}
                    aria-label="Go to GreenSpark home"
                >
                    <FaLeaf className="text-3xl text-lime-500 animate-pulse-slow" />
                    <h1 className="text-3xl font-bold tracking-wide text-white">GreenSpark</h1>
                </div>
                <ul className="flex gap-6 text-base md:text-md font-medium">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item.label}
                            className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
                            variants={fadeIn(index * 0.1)}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation(item.label)}
                        >
                            <Link to={item.path} onClick={e => {
                                if (item.label === 'Login' || item.label === 'Logout') {
                                    e.preventDefault();
                                    handleNavigation(item.label);
                                }
                            }}>
                                {item.label}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center px-6 md:px-16 bg-[url('../src/assets/images/CampaginBanner.jpg')] bg-cover bg-center bg-no-repeat">
                {/* Dark blur overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                {/* Content */}
                <motion.div
                    className="relative z-20 text-white text-center max-w-5xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn(0.3)}
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
                        Empower Change for a Greener Tomorrow
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 font-light mb-6 drop-shadow-md">
                        Join <span className="text-lime-400 font-semibold">GreenSpark</span> and discover impactful environmental campaigns designed to preserve our planet’s natural beauty.
                    </p>
                    <p className="text-base md:text-lg text-lime-100 font-light max-w-2xl mx-auto drop-shadow-sm">
                        Take action for a greener planet. Join a local initiative, make an impact, and inspire change.
                    </p>
                </motion.div>

                {/* Scroll Down Indicator */}
                {showScrollHint && (
                    <motion.div
                        className="absolute bottom-10 z-30 text-white text-4xl cursor-pointer"
                        initial={{ y: 0 }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        onClick={handleScrollDown}
                        title="Scroll down"
                    >
                        <IoIosArrowDown className="mx-auto drop-shadow-xl" />
                    </motion.div>
                )}
            </section>

            {/* Campaign Cards Section */}
            <section ref={campaignsRef} className="py-20 px-6 md:px-24 bg-gray-50">
                <motion.div
                    className="grid gap-12 md:grid-cols-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {CAMPAIGN_CARDS_DATA.map((campaign, index) => (
                        <motion.div
                            key={campaign.title}
                            className="relative bg-green-100 backdrop-blur-xl rounded-3xl shadow-lg border border-lime-500/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lime-500/30 cursor-pointer"
                            variants={fadeIn(index * 0.2)}
                            onClick={() => navigate(campaign.route)}
                        >
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-8">
                                <h3 className="text-3xl font-bold text-green-900 mb-2">{campaign.title}</h3>
                                <p className="text-base text-black mb-4">{campaign.description}</p>
                                <p className="text-sm text-gray-700 font-medium">Location - <span className='text-blue-600' >{campaign.location}</span></p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            <footer className="bg-green-900 text-white text-center py-6 border-t border-white/10">
                <p className="text-sm opacity-80">&copy; 2025 GreenSpark. All rights reserved.</p>
                <div className="mt-2 text-xs space-x-4 opacity-60">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Campaigns;