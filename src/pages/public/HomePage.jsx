import { Hero, About, Services, Projects, News, Contacts, PopularProducts } from '../../components/sections';

const HomePage = () => {
    return (
        <>
            <section className='xl:padding-l padding-b'>
                <Hero />
            </section>
            <section className='padding'>
                <About />
            </section>
            <section className='padding'>
                <Services />
            </section>
            <section className='padding'>
                <PopularProducts />
            </section>
            <section className='padding bg-gray-300'>
                <Projects />
            </section>
            <section className='padding'>
                <News />
            </section>
            <section className='padding'>
                <Contacts />
            </section>
        </>
    );
};

export default HomePage;