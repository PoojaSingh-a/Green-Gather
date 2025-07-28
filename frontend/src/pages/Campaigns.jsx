import React, { useEffect, useState, useCallback, useRef } from 'react'; 
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import { IoIosArrowDown } from 'react-icons/io';

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
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
        route:"/campaigns/create",
    },
    {
        title: "Explore eco-friendly initiatives",
        description: "Support tree plantation efforts in urban areas to enhance greenery and combat environmental pollution.",
        location: "India",
        image: card2,
        route:"/campaigns/ongoing",
    },
];

const Campaigns = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout  } = useAuth();
    const [showScrollHint, setShowScrollHint] = useState(true);
    const campaignsRef = useRef(null);

    const handleNavigation = useCallback((item) => {
        switch (item) {
            case 'Home': navigate('/'); break;
            case 'About': navigate('/about'); break;
            case 'Campaigns': navigate('/campaigns'); break;
            case 'Login': navigate('/'); break; // Typically navigate to a dedicated login page
            case 'Logout': logout(); break;
            default: break;
        }
    }, [navigate, logout]); // Dependencies for useCallback

    const menuItems = ['Home', 'About', 'Campaigns', isLoggedIn ? 'Logout' : 'Login'];
    const handleScrollDown = () => {
        if (campaignsRef.current) {
            const topOffset = campaignsRef.current.offsetTop;
            window.scrollTo({
                top: topOffset - 10, // Adjust offset as needed for Navbar
                behavior: 'smooth',
            });
        }
    };
    return (
        <>
            {/* Navbar Section */}
            <nav className="flex justify-between items-center px-8 md:px-16 py-3 fixed top-0 w-full z-50  text-white">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/')}
                    aria-label="Go to GreenSpark home" 
                >
                    <FaLeaf className="text-3xl text-lime-500 animate-pulse" />
                    <h1 className="text-2xl font-bold">GreenSpark</h1>
                </div>
                <ul className="flex gap-6 text-base font-medium">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item}  
                            className="hover:text-lime-300 transition-colors duration-200 cursor-pointer"
                            variants={fadeIn(index * 0.1)}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation(item)}
                            aria-label={`Maps to ${item}`} // Added for accessibility
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </nav>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center px-6 md:px-16 bg-[url('../src/assets/images/CampaginBanner.jpg')] bg-cover bg-center bg-no-repeat">
                {/* Dark blur overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>
                {/* Content */}
                <motion.div                    
                    className="relative z-20 text-white text-center max-w-4xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn(0.3)}
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
                        Empower Change for a Greener Tomorrow
                    </h2>
                    <p className="text-lg mt-16 md:text-xl text-white/90 font-light mb-6 drop-shadow-md">
                        Join <span className="text-lime-400 font-semibold">GreenSpark</span> and discover impactful environmental campaigns designed to preserve our planet’s natural beauty.
                    </p>
                    <p className="text-base md:text-lg text-lime-100 font-light mb-8 max-w-2xl mx-auto drop-shadow-sm">
                        Take action for a greener planet. Join a local initiative, make an impact, and inspire change.
                    </p>
                </motion.div>

                {/* Scroll Down Indicator */}
                {showScrollHint && (
                    <motion.div
                        className="absolute bottom-10 z-30 text-white text-3xl cursor-pointer"
                        initial={{ y: 0 }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        onClick={handleScrollDown}
                        title="Scroll down"
                    >
                        <IoIosArrowDown className="mx-auto drop-shadow-xl" />
                    </motion.div>
                )}
            </section>
            {/* Campaign Cards Section */}
            <section ref={campaignsRef} className="bg-white/20 py-12 px-6 md:px-24"> {/* Removed redundant bg-opacity-10 */}
                <motion.div
                    className="grid gap-10 md:grid-cols-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Added amount for better trigger
                >
                    {CAMPAIGN_CARDS_DATA.map((campaign, index) => (
                        <motion.div
                            key={campaign.title} // Assuming titles are unique for keys
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:cursor-pointer" // Added duration to transition
                            variants={fadeIn(index * 0.2)}
                            
                            onClick={()=>window.open(campaign.route,'_blank')}
                        >
                            <img
                                src={campaign.image}
                                alt={campaign.title} // Good practice for accessibility
                                className="w-full h-56 object-fill" // Added object-cover for consistent image sizing
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-green-800 mb-2">{campaign.title}</h3> {/* Added margin-bottom */}
                                <p className="text-sm text-gray-600">{campaign.description}</p>
                                <p className="mt-4 text-xs text-gray-500 font-medium">Location: {campaign.location}</p> {/* Clarified location display */}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            <footer className="bg-green-900 backdrop-blur-md text-white text-center py-4 mt-16">
                <p className="text-sm">&copy; 2025 GreenSpark. All rights reserved.</p>
                <div className="mt-2 text-xs space-x-4 opacity-80">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </div>
            </footer>
        </>
    );
};

export default Campaigns;