import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Asumsikan ArticlePopup.jsx berada di folder yang sama atau sesuaikan path-nya.
import ArticlePopup from "../ui/ArticlePopup.jsx"; 

const News = () => {
    // State untuk menyimpan daftar artikel dari API
    const [articles, setArticles] = useState([]);
    
    // State untuk melacak artikel mana yang sedang dipilih untuk ditampilkan di pop-up
    // Menggunakan null berarti tidak ada pop-up yang aktif
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    
    // State untuk melacak status loading data
    const [isLoading, setIsLoading] = useState(true);
    
    // State untuk menyimpan pesan error jika pengambilan data gagal
    const [error, setError] = useState(null);

    // Mengambil data artikel dari backend saat komponen dimuat
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true); // Mulai loading
                setError(null); // Reset error
                
                const response = await axios.get("http://localhost:7000/api/articles");

                if (response.data && Array.isArray(response.data.articles)) {
                    setArticles(response.data.articles);
                } else {
                    // Jika format data tidak sesuai, anggap sebagai error
                    throw new Error("Format data artikel tidak valid.");
                }

            } catch (error) {
                console.error("Gagal mengambil data artikel:", error);
                setError("Gagal memuat artikel. Silakan coba lagi nanti.");
            } finally {
                setIsLoading(false); // Selesai loading, baik berhasil maupun gagal
            }
        };
        
        fetchArticles();
    }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali

    // Fungsi untuk membuka pop-up dengan menyimpan ID artikel yang dipilih
    const openPopup = (articleId) => {
        setSelectedArticleId(articleId);
    };

    // Fungsi untuk menutup pop-up dengan mereset ID artikel
    const closePopup = () => {
        setSelectedArticleId(null);
    };

    // Cari objek artikel lengkap berdasarkan ID yang sedang aktif
    const selectedArticle = articles.find(article => article.id === selectedArticleId);

    // Varian animasi untuk Framer Motion (tidak berubah)
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const cardVariants = {
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
        <section id="news" className="w-full max-container lg:px-4 pt-16 lg:pt-4 scroll-mt-28 relative">
            {/* 
              Komponen pop-up sekarang dipanggil di sini.
              Ia hanya akan tampil jika `selectedArticle` tidak null.
              Logika untuk tampil/sembunyi ada di dalam ArticlePopup.
            */}
            <ArticlePopup article={selectedArticle} onClose={closePopup} />

            {/* Judul Section */}
            <motion.div
                className="w-full mx-auto text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <h2 className="font-bold uppercase text-[2rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">
                    Artikel Berita
                </h2>
                <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">
                    Berita dan informasi terbaru dari kami
                </p>
            </motion.div>
            
            {/* Menampilkan pesan Loading atau Error */}
            {isLoading && (
                <p className="text-center font-montserrat text-slate-500">
                    Memuat artikel...
                </p>
            )}
            {error && (
                <p className="text-center font-montserrat text-red-500 bg-red-100 p-3 rounded-lg max-w-md mx-auto">
                    {error}
                </p>
            )}

            {/* Grid Artikel */}
            <motion.div
                className="flex flex-wrap font-montserrat -mx-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerVariants}
            >
                {/* Tampilkan daftar artikel hanya jika tidak loading dan tidak ada error */}
                {!isLoading && !error && articles.map((article) => (
                    <motion.div
                        key={article.id}
                        className="w-full px-4 py-3 lg:w-1/2 xl:w-1/3"
                        variants={cardVariants}
                    >
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-transform duration-300 hover:scale-105">
                            <div>
                                <img
                                    src={`http://localhost:7000${article.thumbnail_path || article.image_path}`}
                                    alt={article.headline}
                                    className="w-full h-48 object-cover"
                                    loading="lazy" // Native lazy loading
                                />
                            </div>
                            <div className="py-6 px-6 flex flex-col flex-grow">
                                <h3 className="mb-3 font-semibold text-xl text-slate-800 truncate" title={article.headline}>
                                    {article.headline}
                                </h3>
                                <p className="font-medium text-slate-gray text-base mb-6 flex-grow">
                                    {/* Pastikan konten ada sebelum dipotong */}
                                    {article.content ? `${article.content.substring(0, 100)}...` : 'Konten tidak tersedia.'}
                                </p>
                                <button
                                    onClick={() => openPopup(article.id)} // Mengirim ID unik artikel saat diklik
                                    className="font-medium text-sm text-white bg-primary-kalia py-2 px-4 rounded-lg hover:opacity-80 transition-opacity self-start"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default News;