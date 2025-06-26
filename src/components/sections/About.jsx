import { motion } from "framer-motion";

// Data untuk tautan sosial media (tetap sama)
const socialMediaLinks = [
    { name: "Instagram", link: "https://www.instagram.com/abatasastore/", icon: <svg width="20" role="img" className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg> },
    // ... tambahkan ikon media sosial lain jika ada
];

// Data untuk teknologi yang digunakan
const techStack = ["React", "React Router", "Tailwind CSS", "Framer Motion", "Axios", "Node.js", "Express", "MySQL"];

const About = () => {
    // Varian animasi (tetap sama)
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
    };

    return (
        <section id="about" className="w-full max-container lg:px-4 scroll-mt-28 py-16 lg:py-24">
            {/* --- Judul Utama Section --- */}
            <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <h2 className="font-bold uppercase text-3xl md:text-4xl text-slate-800 mb-2 font-montserrat">
                    Tentang Kami & Proyek Ini
                </h2>
                <p className="font-medium text-slate-gray md:text-lg max-w-2xl mx-auto font-montserrat">
                    Memahami cerita di balik brand dan keahlian di balik kode.
                </p>
            </motion.div>

            {/* --- Konten Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                
                {/* === KOLOM KIRI: KISAH ABATASA STORE === */}
                <motion.div
                    className="flex flex-col gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <h3 className="font-pala font-bold text-3xl text-primary-kalia">
                        Kisah Abatasa Store
                    </h3>
                    <p className="font-montserrat text-slate-gray text-lg leading-relaxed">
                        Abatasa Store lahir dari hasrat untuk menyediakan fashion berkualitas yang dapat diakses oleh semua orang. Kami percaya bahwa gaya adalah bentuk ekspresi diri, dan kami berkomitmen untuk menyediakan koleksi yang trendi, nyaman, dan tahan lama.
                    </p>
                    <h4 className="font-montserrat font-semibold text-xl text-slate-800 mt-4">Misi Kami</h4>
                    <ul className="list-inside space-y-2 text-slate-gray">
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-primary-kalia flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Kualitas tanpa kompromi.</li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-primary-kalia flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Layanan pelanggan yang prima.</li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-primary-kalia flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Membangun komunitas pecinta fashion.</li>
                    </ul>
                    <div className="flex items-center mt-6">
                        <p className="font-semibold font-montserrat mr-4 text-slate-800">Ikuti Kami:</p>
                        {socialMediaLinks.map((platform) => (
                            <a key={platform.name} href={platform.link} target="_blank" rel="noopener noreferrer" className="w-9 h-9 mr-2 rounded-full flex justify-center items-center border border-slate-300 hover:border-primary-kalia hover:bg-primary-kalia hover:text-white text-slate-500 transition-all">
                                {platform.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* === KOLOM KANAN: CATATAN PENGEMBANG (PORTFOLIO) === */}
                <motion.div
                    className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <h3 className="font-pala font-bold text-3xl text-slate-800">
                        Catatan Pengembang
                    </h3>
                    <p className="font-montserrat text-slate-gray mt-4 leading-relaxed">
                        Website ini saya bangun sebagai studi kasus dan bagian dari portofolio saya untuk menunjukkan kemampuan dalam pengembangan web modern, mulai dari desain antarmuka (UI), pengalaman pengguna (UX), hingga implementasi full-stack.
                    </p>
                    <h4 className="font-montserrat font-semibold text-xl text-slate-800 mt-6 mb-3">
                        Teknologi yang Digunakan
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map(tech => (
                            <span key={tech} className="bg-primary-kalia/10 text-primary-kalia text-sm font-semibold px-3 py-1 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                         <a href="https://github.com/username-anda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 font-montserrat text-lg leading-none text-white border bg-slate-800 rounded-full hover:bg-slate-900 transition-colors">
                            Lihat di GitHub
                        </a>
                        <a href="https://linkedin.com/in/username-anda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 font-montserrat text-lg leading-none text-primary-kalia border border-primary-kalia rounded-full hover:bg-primary-kalia/10 transition-colors">
                            Hubungi Saya
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;