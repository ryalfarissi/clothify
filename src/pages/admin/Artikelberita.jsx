import apiClient from '../../api/axiosConfig.js';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const Artikelberita = () => {
    // State untuk data dan UI
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState({ headline: '', content: '', image: null });
    const [editingId, setEditingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // State untuk error handling
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // --- State Baru untuk Paginasi ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // --- Fungsi Fetch Data dengan Paginasi ---
    const fetchArticles = async (page) => {
        try {
            // Meminta data untuk halaman tertentu dengan batas 12 item per halaman
            const response = await apiClient.get(`/articles?page=${page}&limit=12`);
            setArticles(response.data.articles || []);
            setTotalPages(response.data.totalPages || 1);
            setCurrentPage(response.data.currentPage || 1);
        } catch (error) {
            console.error('Error fetching articles:', error);
            // Anda bisa menambahkan state untuk error fetching di sini jika perlu
        }
    };
    
    // --- useEffect untuk Fetch Data Saat Halaman Berubah ---
    // Hook ini akan berjalan saat komponen pertama kali dimuat dan setiap kali `currentPage` berubah.
    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file));
            if (errors.image) {
                setErrors(prevErrors => ({...prevErrors, image: null}));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.headline.trim()) newErrors.headline = "Headline tidak boleh kosong.";
        if (!form.content.trim()) newErrors.content = "Konten tidak boleh kosong.";
        if (!editingId && !form.image) newErrors.image = "Gambar artikel wajib diunggah.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!validateForm()) return;
        
        const formData = new FormData();
        formData.append('headline', form.headline);
        formData.append('content', form.content);
        if (form.image) {
            formData.append('image', form.image);
        }

        try {
            const url = editingId ? `/articles/${editingId}` : '/articles';
            const method = editingId ? 'put' : 'post';
            await apiClient[method](url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            closeModal();

            // --- Logika Fetch Ulang Setelah Submit ---
            if (editingId) {
                // Jika mengedit, fetch ulang halaman saat ini untuk melihat perubahan.
                fetchArticles(currentPage);
            } else {
                // Jika membuat artikel baru, kembali ke halaman 1 untuk melihat artikel terbaru.
                if (currentPage !== 1) {
                    setCurrentPage(1); 
                } else {
                    fetchArticles(1);
                }
            }
        } catch (error) {
            console.error('Error submitting article:', error.response ? error.response.data : error.message);
            const serverErrors = error.response?.data?.errors;
            if (serverErrors) {
                const formattedErrors = serverErrors.reduce((acc, curr) => {
                    acc[curr.path] = curr.msg;
                    return acc;
                }, {});
                setErrors(formattedErrors);
            } else {
                setSubmitError(error.response?.data?.message || "Gagal menyimpan artikel. Silakan coba lagi.");
            }
        }
    };
    
    const openModal = () => setIsOpen(true);

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setForm({ headline: '', content: '', image: null });
            setEditingId(null);
            setImagePreview(null);
            setErrors({});
            setSubmitError('');
        }, 300);
    };

    const handleEdit = (article) => {
        setEditingId(article.id);
        setForm({ headline: article.headline, content: article.content, image: null });
        // Saat edit, tetap gunakan gambar resolusi penuh untuk preview jika ada
        if (article.image_path) {
            setImagePreview(`http://localhost:7000${article.image_path}`);
        }
        openModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await apiClient.delete(`/articles/${id}`);
                // Fetch ulang data untuk halaman saat ini setelah menghapus
                fetchArticles(currentPage);
            } catch (error) {
                console.error('Error deleting article:', error.response ? error.response.data : error.message);
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-8 font-sans">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
                    <p className="text-gray-500 mt-1">Manage your articles and news content.</p>
                </div>
                <motion.button 
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                >
                    <FaPlus />
                    Add Article
                </motion.button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <motion.div 
                        key={article.id} 
                        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col group"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.05 }}
                    >
                        {/* --- PERUBAHAN PADA GAMBAR UNTUK PERFORMA --- */}
                        <img 
                            // 1. Gunakan thumbnail. Fallback ke gambar utama jika thumbnail tidak ada.
                            src={`http://localhost:7000${article.thumbnail_path || article.image_path}`} 
                            alt={article.headline} 
                            className="w-full h-40 object-cover" 
                            // 2. Minta browser untuk memuat gambar hanya saat akan terlihat (lazy loading).
                            loading="lazy"
                            // 3. Minta browser untuk mendekode gambar secara asinkron.
                            decoding="async"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h4 className="text-lg font-semibold text-gray-900">{article.headline}</h4>
                            <p className="text-gray-600 mt-2 text-sm flex-grow">{article.content.substring(0, 100)}...</p>
                            <div className="mt-4 flex gap-2 justify-end items-center">
                                <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-yellow-500 transition-colors" onClick={() => handleEdit(article)}>
                                    <FaEdit size={18} />
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors" onClick={() => handleDelete(article.id)}>
                                    <FaTrashAlt size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- KOMPONEN BARU UNTUK KONTROL PAGINASI --- */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 gap-3">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}


            {/* --- MODAL (TIDAK BERUBAH) --- */}
            <AnimatePresence>
                {isOpen && (
                    <Dialog static as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isOpen} onClose={closeModal} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel as={motion.div} 
                                initial={{ scale: 0.95, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl"
                            >
                                <Dialog.Title className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Article' : 'Create New Article'}</Dialog.Title>
                                
                                {submitError && <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{submitError}</div>}

                                <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                                        <input type="text" id="headline" placeholder="Enter article headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.headline ? 'border-red-500' : ''}`} />
                                        {errors.headline && <p className="text-red-500 text-xs mt-1">{errors.headline}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                        <textarea id="content" placeholder="Write your content here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.content ? 'border-red-500' : ''}`} rows="6"></textarea>
                                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                        <div className="mt-1 flex items-center gap-4">
                                            {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />}
                                            <input type="file" id="image" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                        </div>
                                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700">{editingId ? 'Update Article' : 'Create Article'}</button>
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

export default Artikelberita;