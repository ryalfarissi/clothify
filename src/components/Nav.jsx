import { navLinks } from "../constants";
import { hamburger } from "../assets/icons";
import { useState, useRef, useEffect } from "react";

const Nav = () => {
    // State for menu visibility
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false); // State for fixed navbar
    const menuRef = useRef(null); // Create a ref for the menu

    // Toggle function to change menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle scroll to add/remove fixed class
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('header');
            const fixedNav = header.offsetTop;

            if (window.pageYOffset > fixedNav) {
                setIsFixed(true); // Add fixed class
            } else {
                setIsFixed(false); // Remove fixed class
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`padding-x py-8 absolute z-10 w-full ${isFixed ? 'navbar-fixed' : ''}`}>
            <nav className="flex justify-between items-center max-container">
                <a href="/">
                    <span className="font-extrabold text-2xl text-primary-kalia">CV.KUN</span>
                </a>
                {/* max-lg:hidden */}
                <ul ref={menuRef} className={`lg:flex-1 flex max-lg:flex-col right-10 top-16 justify-center items-center lg:gap-16 gap-5 max-lg:bg-white absolute lg:py-0 py-5 lg:px-0 px-5 lg:shadow-none shadow-lg max-lg:rounded-lg max-lg:border lg:static lg:flex ${isOpen ? '' : 'hidden'}`}>
                   {navLinks.map((item) => (
                    <li key={item.label} className="">
                        <a href={item.href} className=" font-montserrat leading-normal text-lg text-slate-gray hover:text-primary-kalia">
                            {item.label}
                        </a>
                    </li>
                   ))} 
                </ul>
                <div id="hamburger-menu" className="hidden max-lg:block">
                   <img src={hamburger} width={25} height={25}  alt="" className="cursor-pointer" onClick={toggleMenu}/>
                </div>
            </nav>
        </header>
    )
}

export default Nav