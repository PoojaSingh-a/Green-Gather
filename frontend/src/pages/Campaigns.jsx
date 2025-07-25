import React, { useCallback } from 'react'; // Import useCallback for memoizing functions
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Link is not directly used in the JSX, only navigate
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';

// --- Animation Variants ---
// Defines a fadeIn animation for Framer Motion, with an optional delay.
const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay, ease: "easeOut" } },
});

// --- Campaign Card Data ---
// Array of campaign data for rendering cards.
const CAMPAIGN_CARDS_DATA = [ // Renamed for clarity and to indicate it's constant data
    {
        title: "Create a Campaign",
        description: "Take the lead in organizing a beach cleanup and contribute to preserving marine life and coastal beauty.",
        location: "India",
        image: card1,
    },
    {
        title: "Explore eco-friendly initiatives",
        description: "Support tree plantation efforts in urban areas to enhance greenery and combat environmental pollution.",
        location: "India",
        image: card2,
    },
];

// --- Campaigns Component ---
const Campaigns = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    // Memoized callback for navigation to optimize performance.
    // Uses useCallback to prevent unnecessary re-renders of child components that use this function.
    const handleNavigation = useCallback((item) => {
        switch (item) {
            case 'Home': navigate('/'); break;
            case 'About': navigate('/about'); break;
            case 'Campaigns': navigate('/campaigns'); break;
            case 'Join Us': navigate('/joinacampaign'); break;
            case 'Login': navigate('/'); break; // Typically navigate to a dedicated login page
            case 'Logout': logout(); break;
            default: break;
        }
    }, [navigate, logout]); // Dependencies for useCallback

    // Define navigation menu items based on authentication status.
    const menuItems = ['Home', 'About', 'Campaigns', 'Join Us', isLoggedIn ? 'Logout' : 'Login'];

    return (
        <>
            {/* Navbar Section */}
            <nav className="flex justify-between items-center px-8 md:px-16 py-3 fixed top-0 w-full z-50 bg-green-900/80 text-white backdrop-blur-md shadow-md">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/')}
                    aria-label="Go to GreenSpark home" // Added for accessibility
                >
                    <FaLeaf className="text-3xl text-lime-500 animate-pulse" />
                    <h1 className="text-2xl font-bold">GreenSpark</h1>
                </div>
                <ul className="flex gap-6 text-base font-medium">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item} // Using item as key assuming unique menu item names
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
            <section className="pt-24 pb-20 px-6 md:px-24 text-white bg-[url('https://source.unsplash.com/1600x900/?forest,trees,nature,sunrise')] bg-cover bg-center relative flex items-start min-h-[50vh]"> {/* Changed items-center to items-start */}
                <div className="absolute inset-0 bg-green-900/70 bg-opacity-50 z-0" />
                <div className="relative z-10 max-w-4xl"> {/* Removed text-center and mx-auto from here */}
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg"
                        variants={scaleIn(0.2)}
                        initial="hidden"
                        animate="visible"
                    >
                        Empower Change for a Greener Tomorrow
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl text-white/90 max-w-2xl md:mx-0" 
                        variants={fadeIn(0.6)}
                        initial="hidden"
                        animate="visible"
                    >
                        Join GreenSpark and discover impactful environmental campaigns designed to preserve our planet's natural beauty.
                    </motion.p>
                    <motion.div
                        className="mt-8 flex md:justify-start gap-4" 
                        variants={fadeIn(1.0)}
                        initial="hidden"
                        animate="visible"
                    >
                        <button
                            onClick={() => handleNavigation('Join Us')}
                            className="bg-lime-500 hover:bg-lime-600 text-green-900 font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg"
                        >
                            Get Involved
                        </button>
                        <button
                            onClick={() => handleNavigation('About')}
                            className="bg-transparent border-2 border-white hover:bg-white hover:text-green-900 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
                        >
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Campaign Cards Section */}
            <section className="bg-white/20 py-12 px-6 md:px-24"> {/* Removed redundant bg-opacity-10 */}
                <motion.div
                    className="grid gap-10 md:grid-cols-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Added amount for better trigger
                >
                    {CAMPAIGN_CARDS_DATA.map((campaign, index) => (
                        <motion.div
                            key={campaign.title} // Assuming titles are unique for keys
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300" // Added duration to transition
                            variants={fadeIn(index * 0.2)}
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
        </>
    );
};

export default Campaigns;