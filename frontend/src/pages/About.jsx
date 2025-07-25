import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import bgImage from '../assets/images/mainBckg1.jpg';
import {
    Leaf,
    Target,
    Eye,
    TrendingUp,
    Users,
    TreeDeciduous,
    Globe,
} from 'lucide-react';
import { useAuth } from '../context/authContext.jsx';

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

const About = ({ setShowLoginModal }) => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

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
                setShowLoginModal(true); // Open login modal
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Campaigns', path: '/campaigns' },
        { label: 'Join Us', path: '/joinacampaign' }, // Correct path for this page
    ];

    if (!isLoggedIn) {
        menuItems.push({ label: 'Login', path: '#' }); // Path # or handle in handleNavigation
    } else {
        menuItems.push({ label: 'Logout', path: '#' }); // Path # or handle in handleNavigation
    }

    return (
        <>
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center px-8 md:px-16 py-2 bg-transparent text-white fixed top-0 w-full z-50">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/')}
                >
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

            {/* Hero Section & Main Content */}
            <section
                className="relative min-h-screen pt-28 pb-20 px-6 md:px-24 text-gray-800 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-green-700 bg-opacity-50 z-0" />

                {/* Content Wrapper */}
                <div className="relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        variants={fadeIn(0.2)}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-5xl font-bold text-white mb-4 drop-shadow">
                            About GreenSpark
                        </h2>
                        <p className="text-lg md:text-xl mt-4 text-lime-200 font-medium">
                            A nature-first initiative empowering individuals to create greener cities
                            through tree planting, sustainability campaigns, and eco-action.
                        </p>
                    </motion.div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        {/* Mission */}
                        <motion.div
                            className="bg-white rounded-xl p-8 shadow-xl backdrop-blur-sm border border-green-300"
                            variants={fadeIn(0.3)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="text-lime-600" size={28} />
                                <h3 className="text-2xl font-semibold text-green-900">Our Mission</h3>
                            </div>
                            <p className="text-green-800">
                                To connect people with verified environmental campaigns and reward
                                eco-conscious action — making sustainability a daily habit.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            className="bg-white rounded-xl p-8 shadow-xl backdrop-blur-sm border border-green-300"
                            variants={fadeIn(0.4)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="text-lime-600" size={28} />
                                <h3 className="text-2xl font-semibold text-green-900">Our Vision</h3>
                            </div>
                            <p className="text-green-800">
                                A united planet where communities protect nature together —
                                through local impact and digital innovation.
                            </p>
                        </motion.div>

                        {/* Impact */}
                        <motion.div
                            className="bg-white rounded-xl p-8 shadow-xl backdrop-blur-sm border border-green-300"
                            variants={fadeIn(0.5)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="text-lime-600" size={28} />
                                <h3 className="text-2xl font-semibold text-green-900">Our Impact</h3>
                            </div>
                            <ul className="list-disc list-inside text-green-800 space-y-2">
                                <li><Users size={18} className="inline mr-1 text-green-700" /> 1,000+ active members</li>
                                <li><TreeDeciduous size={18} className="inline mr-1 text-green-700" /> 2,500+ trees planted</li>
                                <li><Globe size={18} className="inline mr-1 text-green-700" /> 40+ city-wide eco-campaigns</li>
                            </ul>
                        </motion.div>

                        {/* Future Plans */}
                        <motion.div
                            className="bg-white rounded-xl p-8 shadow-xl backdrop-blur-sm border border-green-300"
                            variants={fadeIn(0.6)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Leaf className="text-lime-600" size={28} />
                                <h3 className="text-2xl font-semibold text-green-900">What’s Next</h3>
                            </div>
                            <p className="text-green-800">
                                Earn eco-points for participating in green activities. Redeem them
                                for rewards — and plant a tree with every new signup.
                            </p>
                        </motion.div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        className="text-center mt-20"
                        variants={fadeIn(0.8)}
                        initial="hidden"
                        animate="visible"
                    >
                        <h4 className="text-2xl font-bold text-white mb-4">
                            Join the movement for a better planet 🌍
                        </h4>
                        <Link
                            to="/join-campaign"
                            className="inline-block bg-green-800 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-full transition-colors shadow-md"
                        >
                            Explore Campaigns
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default About;
