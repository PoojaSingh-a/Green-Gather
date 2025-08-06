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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } },
});

const About = ({ setShowLoginModal }) => {
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

    const baseMenuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Campaigns', path: '/campaigns' },
    ];

    const actionItem = isLoggedIn
        ? { label: 'Logout', action: logout }
        : { label: 'Login', action: () => setShowLoginModal(true) };

    const menuItems = [...baseMenuItems, actionItem];

    return (
        <div className="relative min-h-screen bg-green-950 text-gray-100 overflow-hidden">
            {/* Background Section */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            </div>

            {/* Navigation Bar */}
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
                            key={item.label}
                            className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
                            variants={fadeIn(index * 0.1)}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation(item.label)}
                        >
                            <Link to={item.path || '#'} onClick={e => {
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

            {/* Main Content */}
            <section className="relative z-10 pt-32 pb-20 px-6 md:px-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-center max-w-4xl mx-auto mb-16"
                        variants={fadeIn(0.2)}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight mb-4">
                            Our Story of Change
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-light mt-4">
                            We are committed to building a sustainable future, one action at a time.
                        </p>
                    </motion.div>

                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                        {/* Mission */}
                        <motion.div
                            className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10 transition-transform duration-300 hover:scale-105"
                            variants={fadeIn(0.3)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <Target className="text-lime-500 min-w-[28px]" size={28} />
                                <h3 className="text-3xl font-semibold text-lime-400">Our Mission</h3>
                            </div>
                            <p className="text-lg text-white pl-11">
                                To connect people with verified environmental campaigns and reward
                                eco-conscious action — making sustainability a daily habit.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10 transition-transform duration-300 hover:scale-105"
                            variants={fadeIn(0.4)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <Eye className="text-lime-500 min-w-[28px]" size={28} />
                                <h3 className="text-3xl font-semibold text-lime-400">Our Vision</h3>
                            </div>
                            <p className="text-lg text-white pl-11">
                                A united planet where communities protect nature together —
                                through local impact and digital innovation.
                            </p>
                        </motion.div>

                        {/* Impact */}
                        <motion.div
                            className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10 transition-transform duration-300 hover:scale-105"
                            variants={fadeIn(0.5)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <TrendingUp className="text-lime-500 min-w-[28px]" size={28} />
                                <h3 className="text-3xl font-semibold text-lime-400">Our Impact</h3>
                            </div>
                            <ul className="list-none text-white space-y-3 pl-11">
                                <li><Users size={20} className="inline mr-2 text-lime-500" /> 1,000+ active members</li>
                                <li><TreeDeciduous size={20} className="inline mr-2 text-lime-500" /> 2,500+ trees planted</li>
                                <li><Globe size={20} className="inline mr-2 text-lime-500" /> 40+ city-wide eco-campaigns</li>
                            </ul>
                        </motion.div>

                        {/* Future Plans */}
                        <motion.div
                            className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10 transition-transform duration-300 hover:scale-105"
                            variants={fadeIn(0.6)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <Leaf className="text-lime-500 min-w-[28px]" size={28} />
                                <h3 className="text-3xl font-semibold text-lime-400">What’s Next</h3>
                            </div>
                            <p className="text-lg text-white pl-11">
                                Earn eco-points for participating in green activities. Redeem them
                                for rewards — and plant a tree with every new signup.
                            </p>
                        </motion.div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        className="text-center mt-24"
                        variants={fadeIn(0.8)}
                        initial="hidden"
                        animate="visible"
                    >
                        <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow">
                            Join the movement for a better planet 🌍
                        </h4>
                        <Link
                            to="/campaigns"
                            className="inline-block bg-lime-500 hover:bg-lime-600 text-green-900 text-xl font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Explore Campaigns
                        </Link>
                    </motion.div>
                </div>
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

export default About;