import { motion } from "framer-motion";

const Services = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 }, // Start faded and below
        visible: {
            opacity: 1,
            y: 0, // Move up to the original position
            transition: { duration: 0.8, ease: "easeOut" }, // Smooth animation
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 }, // Initially small and transparent
        visible: {
            opacity: 1,
            scale: 1, // Scale to full size
            transition: { duration: 0.6, ease: "easeOut" }, // Smooth scaling
        },
    };

    return (
        <section id="services" className="w-full max-container lg:px-4 mb-20 scroll-mt-28">
            <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <h2 className="text-4xl font-palanquin font-semibold mb-10 lg:text-center lg:mb-24 lg:text-[4rem]">
                    Why <span className="text-primary-kalia">Choose us?</span>
                </h2>
                <div className="flex flex-wrap lg:gap-[7rem] gap-12 lg:justify-center lg:items-start">
                    {[
                        {
                            title: "Kualitas Terbaik",
                            description: "Kami menyediakan pakaian berkualitas tinggi dengan bahan pilihan untuk kenyamanan dan gaya Anda.",
                            icon: (
                                <svg className="w-28 h-28 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd" />
                                </svg>
                            ),
                        },
                        {
                            title: "Pilihan Fashion Terlengkap",
                            description:
                                "Temukan koleksi pakaian terbaru kami yang mencakup berbagai gaya untuk semua kebutuhan Anda.",
                            icon: (
                                <svg
                                    widths={20}
                                    className="fill-current"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100"
                                    height="100"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ),
                        },
                        {
                            title: "Harga Terjangkau",
                            description:
                                "Dapatkan produk fashion dengan harga yang sesuai tanpa mengurangi kualitas dan gaya.",
                            icon: (
                                <svg className="w-28 h-28 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clipRule="evenodd" />
                                </svg>

                            ),
                        },
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            className="lg:flex lg:flex-col lg:justify-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={itemVariants}
                        >
                            <div className="lg:self-center w-40 h-40 bg-primary-kalia flex justify-center items-center border border-slate-300 text-white rounded-xl mb-5">
                                {service.icon}
                            </div>
                            <h4 className="font-bold text-2xl font-montserrat mb-2 lg:text-center    lg:self-center">
                                {service.title}
                            </h4>
                            <p className="text-slate-gray font-montserrat text-base max-w-sm lg:text-center">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
