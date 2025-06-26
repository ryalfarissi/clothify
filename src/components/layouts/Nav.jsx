import { navLinks } from "../../constants";
import { hamburger } from "../../assets/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { abatasaIMG } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Intersection Observer Effect (Tidak ada perubahan)
    useEffect(() => {
        const sections = navLinks.map(link => document.getElementById(link.href.split('#')[1])).filter(Boolean);
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -60% 0px",
            threshold: 0,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);
        sections.forEach(section => observer.observe(section));
        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    // Varian animasi (Tidak ada perubahan)
    const menuVariants = {
        hidden: {
            x: '100%',
            transition: { type: 'tween', ease: 'easeOut', duration: 0.3 }
        },
        visible: {
            x: 0,
            transition: { type: 'tween', ease: 'easeIn', duration: 0.3, staggerChildren: 0.1 }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Komponen harus mengembalikan satu elemen root, jadi kita gunakan React Fragment <>
    return (
        <>
            {/* Header utama. Z-index disesuaikan menjadi 30. */}
            <header className="padding-x py-3 fixed z-30 bg-slate-950/80 backdrop-blur-sm w-full">
                <nav className="flex items-center max-container justify-between">
                    <Link to="/" className="shrink-0">
                        <img src={abatasaIMG.src} alt="abatasa-logo" width={80} className="rounded-full" />
                    </Link>

                    {/* --- DESKTOP MENU (TIDAK BERUBAH) --- */}
                    <ul className="hidden lg:flex lg:flex-row lg:items-center lg:gap-2 bg-slate-800/50 p-2 rounded-full">
                        {navLinks.map((item) => {
                            const isActive = activeSection === item.href.split('#')[1];
                            return (
                                <li key={item.label} className="relative">
                                    <HashLink
                                        smooth
                                        to={item.href}
                                        className={`relative z-10 block font-montserrat tracking-wide px-5 py-2 rounded-full transition-colors duration-300 ${
                                            isActive ? "text-slate-900" : "text-white hover:text-primary-kalia"
                                        }`}
                                    >
                                        {item.label}
                                    </HashLink>
                                    {isActive && (
                                        <motion.span
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-white rounded-full z-0"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* --- Tombol Login/Dashboard Desktop (Tidak Berubah) --- */}
                    <div className="hidden lg:block">
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="font-montserrat text-white bg-primary-kalia px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="font-montserrat text-white hover:text-primary-kalia transition-colors">
                                Admin Login
                            </Link>
                        )}
                    </div>
                    
                    {/* Hamburger Menu Icon TETAP DI SINI. Z-index diatur ke 50 agar selalu di atas */}
                    <div id="hamburger-menu" className="hidden max-lg:block z-50">
                        <img src={hamburger} width={25} height={25} alt="menu icon" className="cursor-pointer" onClick={toggleMenu} />
                    </div>
                </nav>
            </header>

            {/* --- KODE MENU MOBILE (OVERLAY) DIPINDAHKAN KELUAR DARI HEADER --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {/* Tombol Close (X) */}
                        <button onClick={toggleMenu} className="absolute top-6 right-6 z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <ul className="flex flex-col items-center gap-8">
                            {navLinks.map((item) => (
                                <motion.li key={item.label} variants={linkVariants}>
                                    <HashLink
                                        smooth
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-montserrat tracking-wider text-3xl text-white hover:text-primary-kalia transition-colors"
                                    >
                                        {item.label}
                                    </HashLink>
                                </motion.li>
                            ))}
                        </ul>

                         {/* Tombol Login/Dashboard untuk Mobile */}
                        <motion.div variants={linkVariants} className="mt-12">
                             {isLoggedIn ? (
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="font-montserrat text-white bg-primary-kalia px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-lg">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="font-montserrat text-white hover:text-primary-kalia transition-colors text-lg">
                                    Admin Login
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;