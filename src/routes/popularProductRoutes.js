// src/routes/popularProductRoutes.js

import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validateProduct // Impor middleware validasi yang sudah dibuat di controller
} from '../controllers/popularProductController.js';
import protect from '../middleware/authMiddleware.js'; // Middleware untuk otentikasi
import upload from '../middleware/multerMiddleware.js'; // Middleware untuk upload file

const router = express.Router();

/*
 * =========================================
 *          RUTE PUBLIK (Public Routes)
 * =========================================
 * Rute-rute ini dapat diakses oleh siapa saja tanpa perlu login.
 */

// GET /api/popular-products -> Mendapatkan semua produk populer
router.get('/', getAllProducts);

// GET /api/popular-products/:id -> Mendapatkan detail satu produk berdasarkan ID
router.get('/:id', getProductById);


/*
 * =========================================
 *         RUTE TERPROTEKSI (Protected Routes)
 * =========================================
 * Hanya pengguna yang sudah terotentikasi (admin) yang bisa mengakses rute ini.
 * Middleware 'protect' akan memverifikasi token JWT.
 */

// POST /api/popular-products -> Membuat produk baru (membutuhkan gambar)
router.post('/', protect, upload.single('image'), validateProduct, createProduct);

// PUT /api/popular-products/:id -> Memperbarui produk (gambar opsional)
router.put('/:id', protect, upload.single('image'), validateProduct, updateProduct);

// DELETE /api/popular-products/:id -> Menghapus produk
router.delete('/:id', protect, deleteProduct);


export default router;