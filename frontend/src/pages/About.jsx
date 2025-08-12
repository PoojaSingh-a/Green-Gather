import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaHandsHelping, FaGlobeAsia, FaRecycle, FaStar, FaUsers } from 'react-icons/fa';
import bgImage from '../assets/images/CampaginBanner_.jpg';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/authContext.jsx';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Modal from "../components/Modal";


// Animation variants for a staggered fade-in effect
const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } },
});

// Stagger container variant for animating children with a delay
const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // Delay between each child's animation
        },
    },
};

// Card hover and tap animations
const cardVariants = {
    rest: { scale: 1, rotate: 0, transition: { duration: 0.3 } },
    hover: {
        scale: 1.05,
        rotate: 1,
        transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
};

// Icon pulse animation
const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { repeat: Infinity, repeatType: "reverse", duration: 0.8 } }
};


const About = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLoginSuccess = (userName) => {
        login(userName);
        setShowLoginModal(false);
    };

    return (
        <>
            <div className="relative min-h-screen bg-green-950 text-gray-100 overflow-hidden">
                {/* Background Section with a cool parallax scroll effect */}
                <motion.div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgImage})` }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                </motion.div>

                <Navbar setShowLoginModal={setShowLoginModal} />
                {/* Overlay */}
                {showLoginModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
                )}

                {showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)}>
                        <LoginForm onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
                    </Modal>
                )}
                {/* Main Content */}
                <section className="relative z-10 pt-32 pb-20 px-6 md:px-24">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <motion.div
                            className="text-center max-w-4xl mx-auto mb-16"
                            variants={fadeIn(0.2)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-extrabold text-lime-300 drop-shadow-lg leading-tight mb-4">
                                Our Story
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 font-light mt-4">
                                Every great change starts with a single step. For us, that step was the realization that our planet gives us everything, and it's our turn to give back. This platform is built on that simple idea—a way for us all to make a real, lasting difference, together.
                            </p>
                        </motion.div>

                        {/* Info Cards Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Our Purpose */}
                            <motion.div
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <motion.div variants={iconVariants}>
                                        <FaGlobeAsia className="text-lime-500 min-w-[28px] text-3xl" />
                                    </motion.div>
                                    <h3 className="text-3xl font-semibold text-lime-400">Our Purpose</h3>
                                </div>
                                <p className="text-lg text-white pl-11">
                                    To make environmental action easy and accessible for everyone. We believe that by working together, we can multiply small actions into a massive global impact.
                                </p>
                            </motion.div>

                            {/* Our Values */}
                            <motion.div
                                className="bg-lime-500 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <motion.div variants={iconVariants}>
                                        <FaHandsHelping className="text-white min-w-[28px] text-4xl" />
                                    </motion.div>
                                    <h3 className="text-3xl font-semibold text-white">Our Values</h3>
                                </div>
                                <p className="text-lg text-black pl-11">
                                    We are built on the principles of **Community, Action, and Fun**. We believe that by making environmental efforts social and engaging, we can build a strong network of everyday heroes.
                                </p>
                            </motion.div>

                            {/* Our Impact */}
                            <motion.div
                                className="bg-lime-500 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <motion.div variants={iconVariants}>
                                        <FaStar className="text-white min-w-[28px] text-4xl" />
                                    </motion.div>
                                    <h3 className="text-3xl font-semibold text-white">Our Impact</h3>
                                </div>
                                <p className="text-lg text-black pl-11">
                                    We don’t measure our impact with numbers, but with the growth of our community and the enthusiasm of every person who takes part. Every action, big or small, creates a ripple of positive change.
                                </p>
                            </motion.div>

                            {/* What’s Next */}
                            <motion.div
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <motion.div variants={iconVariants}>
                                        <FaRecycle className="text-lime-500 min-w-[28px] text-3xl" />
                                    </motion.div>
                                    <h3 className="text-3xl font-semibold text-lime-400">What’s Next</h3>
                                </div>
                                <p className="text-lg text-white pl-11">
                                    Our journey is just beginning. We're excited to expand our community, launch new campaigns, and introduce features that make protecting our planet a rewarding experience for everyone involved.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Call to Action */}
                        <motion.div
                            className="text-center mt-24"
                            variants={fadeIn(0.8)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow">
                                Ready to join the patrol?
                            </h4>
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 255, 0, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block mt-7"
                            >
                                <Link
                                    to="/campaigns"
                                    className="bg-lime-500 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg"
                                >
                                    Find a Campaign
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>
            <footer className="bg-lime-700 text-white text-center py-6 border-t border-white/10">
                <p className="text-sm opacity-80">&copy; 2025 Planet Patrol. All rights reserved.</p>
                <div className="mt-2 text-xs space-x-4 opacity-60">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </div>
            </footer>

        </>
    );
};

export default About;