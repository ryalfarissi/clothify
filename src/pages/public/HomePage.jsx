// src/pages/public/HomePage.jsx

import { Hero, About, Services, Projects, News, Contacts, PopularProducts } from '../../components/sections';

const HomePage = () => {
    return (
        <>
            {/* The Hero component itself likely contains the "home" id, but if not, wrap it */}
            <section id="home" className='xl:padding-l padding-b'>
                <Hero />
            </section>
            <section id="about" className='padding'>
                <About />
            </section>
            <section id="services" className='padding'>
                <Services />
            </section>
            <section id="products" className='padding'> 
                <PopularProducts />
            </section>
            <section id="projects" className='padding bg-gray-300'>
                <Projects />
            </section>
            <section id="news" className='padding'>
                <News />
            </section>
            <section id="contacts" className='padding'>
                <Contacts />
            </section>
        </>
    );
};

export default HomePage;