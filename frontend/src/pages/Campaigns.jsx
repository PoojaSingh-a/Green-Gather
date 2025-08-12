import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import card1 from '../assets/images/mainBckg1.png';
import card2 from '../assets/images/card2.png';
import { IoIosArrowDown } from 'react-icons/io';
import Navbar from "../components/Navbar";
import LoginForm from '../components/LoginForm';
import Modal from "../components/Modal";

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
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLoginSuccess = (userName) => {
        login(username);
        setShowLoginModal(false);
    }

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
        <div className="relative min-h-screen bg-lime-700 text-gray-100 overflow-hidden">
            {/* Navbar Section */}
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
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center px-6 md:px-16 bg-[url('../src/assets/images/CampaignBanner.png')] bg-cover bg-center bg-no-repeat">
                {/* Dark blur overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>
                {/* Content */}
                <motion.div
                    className="relative z-20 text-white text-center max-w-5xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn(0.3)}
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
                        Empower Change for a <span className='text-lime-500'>Greener</span> Tomorrow
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 font-light mb-6 drop-shadow-md">
                        Join <span className="text-lime-400 font-semibold">GreenGather</span> and discover impactful environmental campaigns designed to preserve our planet’s natural beauty.
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
            <section ref={campaignsRef} className="py-20 px-6 md:px-24 bg-gradient-to-r from-lime-400 to-white/50">
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
            <footer className="bg-lime-700 text-white text-center py-6 border-t border-white/10">
                <p className="text-sm opacity-80">&copy; 2025 Planet Patrol. All rights reserved.</p>
                <div className="mt-2 text-xs space-x-4 opacity-60">
                    <a href="#" onClick={() => navigate('/about')} className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Campaigns;