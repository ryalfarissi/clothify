// File: ProdukPopulerContent.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../../api/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { FaEdit, FaTrashAlt, FaPlus, FaStar } from "react-icons/fa";

const ProdukPopulerContent = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ product_name: "", price: "", rating: "", image: null });
    const [editingId, setEditingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({}); // State untuk menyimpan error validasi
    const [submitError, setSubmitError] = useState(''); // State untuk error umum saat submit

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiClient.get("/popular-products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file));
             // Hapus error untuk gambar jika pengguna memilih file
            if (errors.image) {
                setErrors(prevErrors => ({ ...prevErrors, image: null }));
            }
        }
    };

    // Fungsi untuk memvalidasi form sebelum submit
    const validateForm = () => {
        const newErrors = {};
        if (!form.product_name.trim()) newErrors.product_name = "Nama produk tidak boleh kosong.";
        if (!form.price) newErrors.price = "Harga tidak boleh kosong.";
        else if (isNaN(form.price)) newErrors.price = "Harga harus berupa angka.";
        if (!form.rating) newErrors.rating = "Rating tidak boleh kosong.";
        else if (isNaN(form.rating) || form.rating < 0 || form.rating > 5) newErrors.rating = "Rating harus antara 0 dan 5.";
        
        // Gambar hanya wajib untuk produk baru (bukan saat edit)
        if (!editingId && !form.image) newErrors.image = "Gambar produk wajib diunggah.";
        
        setErrors(newErrors);
        // Return true jika tidak ada error
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(''); // Reset pesan error server setiap kali submit
        
        // Hentikan jika validasi sisi klien gagal
        if (!validateForm()) {
            return; 
        }

        const formData = new FormData();
        formData.append("product_name", form.product_name);
        formData.append("price", form.price);
        formData.append("rating", form.rating);
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            const url = editingId ? `/popular-products/${editingId}` : "/popular-products";
            const method = editingId ? 'put' : 'post';
            await apiClient[method](url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchProducts();
            closeModal();
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            
            // Menangani error validasi dari server (dikirim oleh express-validator)
            const serverErrors = error.response?.data?.errors;
            if (serverErrors) {
                const formattedErrors = serverErrors.reduce((acc, curr) => {
                    // express-validator menggunakan `path` sebagai key
                    acc[curr.path] = curr.msg;
                    return acc;
                }, {});
                setErrors(formattedErrors);
            } else {
                // Menangani error umum lainnya dari server
                setSubmitError(error.response?.data?.message || "Terjadi kesalahan pada server. Silakan coba lagi.");
            }
        }
    };

    const openModal = () => setIsOpen(true);
    
    const closeModal = () => {
        setIsOpen(false);
        // Gunakan timeout agar state tidak di-reset sebelum animasi exit selesai
        setTimeout(() => {
            setForm({ product_name: "", price: "", rating: "", image: null });
            setEditingId(null);
            setImagePreview(null);
            setErrors({});      // Bersihkan error saat modal ditutup
            setSubmitError('');  // Bersihkan error submit juga
        }, 300);
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({
            product_name: product.product_name,
            price: product.price,
            rating: product.rating,
            image: null, // Reset file input
        });
        // Saat edit, tetap gunakan gambar resolusi penuh untuk preview jika ada
        if (product.image_path) {
            setImagePreview(`http://localhost:7000${product.image_path}`);
        }
        openModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            try {
                await apiClient.delete(`/popular-products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error.response ? error.response.data : error.message);
                alert("Gagal menghapus produk.");
            }
        }
    };

    // Varian animasi untuk kartu
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-8 font-sans">
            {/* Header Halaman */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Popular Products</h1>
                    <p className="text-gray-500 mt-1">Kelola produk terpopuler Anda.</p>
                </div>
                <motion.button 
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                >
                    <FaPlus />
                    Tambah Produk
                </motion.button>
            </header>
            
            {/* Grid Kartu Produk */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <motion.div 
                        key={product.id} 
                        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col group"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="relative">
                            <img 
                                // 1. Gunakan thumbnail. Fallback ke gambar utama jika thumbnail tidak ada.
                                src={`http://localhost:7000${product.thumbnail_path || product.image_path}`} 
                                alt={product.product_name} 
                                className="w-full h-48 object-cover" 
                                // 2. Minta browser untuk memuat gambar hanya saat akan terlihat (lazy loading).
                                loading="lazy"
                                // 3. Minta browser untuk mendekode gambar secara asinkron.
                                decoding="async"
                            />
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-yellow-500 transition-colors" onClick={() => handleEdit(product)}>
                                    <FaEdit size={16} />
                                </button>
                                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 transition-colors" onClick={() => handleDelete(product.id)}>
                                    <FaTrashAlt size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h4 className="text-md font-semibold text-gray-800">{product.product_name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-lg font-bold text-gray-900">
                                Rp{Number(product.price).toLocaleString("id-ID")}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-yellow-500">
                                    <FaStar />
                                    <span className="font-semibold">{product.rating}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal Form Produk */}
            <AnimatePresence>
                {isOpen && (
                    <Dialog static as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isOpen} onClose={closeModal} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel as={motion.div} 
                                initial={{ scale: 0.95, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl"
                            >
                                <Dialog.Title className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Product' : 'Create New Product'}</Dialog.Title>
                                
                                {submitError && <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{submitError}</div>}
                                
                                <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <input type="text" id="product_name" placeholder="e.g. Kopi Susu Gula Aren" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.product_name ? 'border-red-500' : ''}`} />
                                        {errors.product_name && <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                            <input type="number" id="price" placeholder="e.g. 25000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.price ? 'border-red-500' : ''}`} />
                                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                            <input type="number" step="0.1" max="5" min="0" id="rating" placeholder="e.g. 4.8" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.rating ? 'border-red-500' : ''}`} />
                                            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                        <div className="mt-1 flex items-center gap-4">
                                            {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-gray-200" />}
                                            <input type="file" id="image" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                        </div>
                                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700">{editingId ? 'Perbarui Produk' : 'Buat Produk'}</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProdukPopulerContent;