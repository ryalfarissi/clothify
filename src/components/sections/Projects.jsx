import { abatasaIMG, guardIMG, beautyIMG, financialIMG } from "../../constants";
import { motion } from "framer-motion";

const Projects = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const staggerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section id="projects" className="w-full max-container lg:px-4 pt-16 lg:pt-4 scroll-mt-28">
            <motion.div
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className=" mx-auto text-center mb-16">
                    <h4 className="font-bold uppercase text-lg text-primary-kalia mb-3 font-montserrat">
                        Partners
                    </h4>
                    <h2 className="font-bold uppercase text-[2rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">
                        Kerja Sama Kami
                    </h2>
                    <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">
                        Kemitraan strategis dengan vendor terpercaya memungkinkan kami menyediakan solusi yang disesuaikan
                        dengan kebutuhan pelanggan, menghasilkan kepuasan maksimal bagi setiap klien.
                    </p>
                </div>
            </motion.div>
            <motion.div
                className="w-full lg:gap-x-12 flex flex-wrap justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerVariants}
            >
                <div className="flex flex-wrap items-center justify-center">
                    {[abatasaIMG, guardIMG, beautyIMG, financialIMG].map((image, index) => (
                        <motion.div
                            key={index}
                            className="lg:max-w-[300px] max-w-[150px] mx-4 py-4 md:grayscale md:opacity-60 transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
                            variants={imageVariants}
                        >
                            <img src={image.src} alt={image.alt} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;