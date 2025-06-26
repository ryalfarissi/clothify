// File: PopularProducts.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PopularProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // --- PERUBAHAN DI SINI ---
                // Menggunakan URL lengkap untuk konsistensi dengan komponen lain
                const response = await axios.get("http://localhost:7000/api/popular-products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // ... (varian animasi tidak berubah)
    const containerVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const cardVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };
    const staggerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

    return (
        <section id="popularProducts" className="max-container w-full scroll-mt-28">
            <motion.div
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                {/* ... header section tidak berubah ... */}
                <h2 className="text-4xl font-montserrat font-semibold mb-5">
                    Our <span className="text-primary-kalia">Popular</span> Products
                </h2>
                <p className="font-montserrat max-w-2xl font-light mb-12">
                    Produk dengan kualitas dan gaya terbaik dengan pilihan terpopuler. Temukan kenyamanan sempurna dengan desain indah dan harga terjangkau.
                </p>
            </motion.div>
            <motion.div
                className="flex flex-wrap justify-center items-start w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerVariants}
            >
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className="flex flex-col justify-start w-[20rem] max-w-full h-[30rem] max-lg:w-full max-lg:h-auto px-4 py-6"
                        variants={cardVariants}
                    >
                        {/* --- PERUBAHAN DI SINI --- */}
                        <img
                            // 1. Gunakan thumbnail, fallback ke gambar utama
                            src={`http://localhost:7000${product.thumbnail_path || product.image_path}`}
                            alt={product.product_name}
                            className="w-full aspect-square object-cover rounded-2xl mb-8"
                            // 2. Tambahkan lazy loading
                            loading="lazy"
                        />
                        <div className="flex flex-row justify-start items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-primary-kalia -mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                            <p className="font-montserrat text-lg text-slate-gray">({product.rating})</p>
                        </div>
                        <p className="font-montserrat text-xl font-semibold mb-3">
                            {product.product_name}
                        </p>
                        <p className="font-montserrat text-xl font-semibold text-primary-kalia">
                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                                product.price
                            )}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default PopularProducts;