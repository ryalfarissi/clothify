import { navLinks } from "../../constants";
import { hamburger } from "../../assets/icons";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { abatasaIMG } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const menuRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            if (window.pageYOffset > header.offsetTop) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation variants for mobile menu
    const menuVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 10,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
            },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.2 + i * 0.1, 
            },
        }),
    };

    return (
        <header className={`padding-x py-4 max-lg:py-4 fixed z-10 bg-slate-950 lg:backdrop-blur-sm w-full ${isFixed ? "navbar-fixed" : ""}`}>
            <nav className="flex  items-center max-container justify-between">
                <Link to="/" className="">
                    <img src={abatasaIMG.src} alt="abatasa-logo" width={100} className="rounded-full px-2 py-1 " />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex lg:flex-row lg:items-center  lg:gap-16 px-32 justify-center">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <HashLink
                                smooth
                                to={item.href}
                                className="font-montserrat tracking-wider leading-normal text-lg text-white font-normal hover:text-primary-kalia transition duration-300"
                            >
                                {item.label}
                            </HashLink>
                        </li>
                    ))}
                    <div>
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="text-primary-kalia hover:text-white font-palanquin transition duration-300">
                                Admin Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="text-primary-kalia hover:text-white font-palanquin transition duration-300">
                                Admin Login
                            </Link>
                        )}
                    </div>
                </ul>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            ref={menuRef}
                            className="lg:hidden flex max-lg:flex-col max-lg:min-w-full right-0 top-16 max-lg:justify-start justify-center max-lg:items-start items-center gap-5 bg-black absolute py-8 px-8 shadow-lg"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={menuVariants}
                        >
                            {navLinks.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    custom={index}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <HashLink
                                        smooth
                                        to={item.href}
                                        className="font-montserrat tracking-wider leading-normal text-lg text-white font-normal hover:text-primary-kalia transition duration-300"
                                    >
                                        {item.label}
                                    </HashLink>
                                </motion.li>
                            ))}
                            <motion.div
                                custom={navLinks.length}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {isLoggedIn ? (
                                    <Link to="/dashboard" className="text-primary-kalia hover:text-white font-palanquin transition duration-300">
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link to="/login" className="text-primary-kalia hover:text-white font-palanquin transition duration-300">
                                        Admin Login
                                    </Link>
                                )}
                            </motion.div>
                        </motion.ul>
                    )}
                </AnimatePresence>

                {/* Hamburger Menu Icon */}
                <div id="hamburger-menu" className="hidden max-lg:block">
                    <img src={hamburger} width={25} height={25} alt="" className="cursor-pointer" onClick={toggleMenu} />
                </div>
            </nav>
        </header>
    );
};

export default Nav;
