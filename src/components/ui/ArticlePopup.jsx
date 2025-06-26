import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper untuk memformat tanggal (opsional, tapi disarankan)
const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const ArticlePopup = ({ article, onClose }) => {
    // Efek untuk menutup pop-up dengan tombol 'Escape' dan mengunci scroll
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (article) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [article, onClose]);

    // Varian animasi untuk backdrop dan modal
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.4 } 
        },
        exit: { 
            opacity: 0, 
            y: 50, 
            scale: 0.95,
            transition: { duration: 0.2 }
        },
    };

    return (
        <AnimatePresence>
            {article && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* --- Kolom Gambar (Kiri di Desktop) --- */}
                        <div className="w-full md:w-5/12 h-64 md:h-auto">
                            <img
                                src={`http://localhost:7000${article.image_path}`}
                                alt={article.headline}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* --- Kolom Konten (Kanan di Desktop) --- */}
                        <div className="w-full md:w-7/12 flex flex-col p-8 lg:p-12 relative overflow-y-auto">
                            {/* Tombol Tutup */}
                            <button 
                                onClick={onClose} 
                                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors rounded-full p-2 hover:bg-slate-100"
                                aria-label="Tutup Artikel"
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {/* Judul Artikel */}
                            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-slate-900 mb-2">
                                {article.headline}
                            </h2>

                            {/* Meta Data (Tanggal Publikasi) */}
                            <p className="font-sans text-sm text-slate-500 mb-6">
                                {/* Ganti 'published_at' dengan nama kolom tanggal dari API Anda */}
                                Dipublikasikan pada {formatDate(article.published_at || article.createdAt)}
                            </p>

                            {/* Isi Konten */}
                            <div className="font-sans text-slate-700 text-base lg:text-lg leading-relaxed whitespace-pre-wrap pr-4">
                                {article.content}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ArticlePopup;