import { motion } from "framer-motion";
import { abatasaHeroIMG } from "../../constants";

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 }, 
        visible: {
            opacity: 1,
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" }, 
        },
    };

    return (
        <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen lg:p-2 gap-20 max-container scroll-mt-28">
            <motion.div
                className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.p
                    className="ml-1 text-2xl font-montserrat text-primary-kalia font-bold"
                    variants={containerVariants}
                >
                    Description
                </motion.p>
                <motion.h1
                    className="font-palanquin text-8xl max-sm:text-4xl font-bold max-sm:leading-[82px]"
                    variants={containerVariants}
                >
                    ABATASA STORE
                </motion.h1>
                <motion.p
                    className="font-montserrat text-slate-gray text-lg leading-7 mt-6 mb-14 sm:max-w-sm"
                    variants={containerVariants}
                >
                    Abatasa Store adalah toko pakaian terkemuka di Indonesia yang menyediakan berbagai pilihan busana berkualitas tinggi untuk semua kebutuhan Anda. Kami berkomitmen untuk menghadirkan produk fashion yang stylish, nyaman, dan terjangkau, dengan fokus pada kepuasan pelanggan dan layanan terbaik.
                </motion.p>
                <a href="https://abatasastore.com/" target="_blank" rel="noopener noreferrer" className="relative group inline-block">
                    <motion.div variants={containerVariants} className="relative">
                        <button className="relative flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none text-white border bg-primary-kalia rounded-full overflow-hidden">
                            <span className="absolute inset-0 bg-black transition-transform duration-500 transform translate-y-full group-hover:translate-y-0"></span>
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-primary-kalia font-semibold transition-colors duration-300">
                                <p>Shop Now</p>
                                <svg
                                    className="w-6 h-6 text-white group-hover:text-primary-kalia transition-colors duration-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </button>
                    </motion.div>
                </a>
            </motion.div>
            <motion.div
                className="relative flex flex-1 justify-center items-center xl:min-h-screen bg-cover bg-center max-sm:px-4 max-lg:rounded-full max-lg:overflow-hidden "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <img
                    src={abatasaHeroIMG.src}
                    alt={abatasaHeroIMG.alt}
                    width={300}
                    height={200}
                    className="object-contain xl:ml-40 w-[800px]"
                />
            </motion.div>
        </section>
    );
};

export default Hero;