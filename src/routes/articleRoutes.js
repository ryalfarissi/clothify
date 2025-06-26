// File: src/routes/articleRoutes.js

import express from 'express';
import {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    validateArticle // Pastikan middleware validasi diimpor
} from '../controllers/articleController.js';
import protect from '../middleware/authMiddleware.js'; // Middleware untuk otentikasi
import upload from '../middleware/multerMiddleware.js'; // Middleware untuk upload file

const router = express.Router();

/*
 * =========================================
 *          RUTE PUBLIK (Public Routes)
 * =========================================
 * Siapa saja bisa mengakses rute ini tanpa perlu login.
 */

// GET /api/articles -> Mendapatkan semua artikel
router.get('/', getAllArticles);

// GET /api/articles/:id -> Mendapatkan detail satu artikel
router.get('/:id', getArticleById);


/*
 * =========================================
 *         RUTE TERPROTEKSI (Protected Routes)
 * =========================================
 * Hanya pengguna yang sudah login (admin) yang bisa mengakses rute ini.
 * Middleware 'protect' akan memeriksa token JWT.
 * Middleware 'upload' akan menangani file.
 * Middleware 'validateArticle' akan memvalidasi input.
 */

// POST /api/articles -> Membuat artikel baru
// Urutan middleware: otentikasi -> upload file -> validasi data -> controller
router.post('/', protect, upload.single('image'), validateArticle, createArticle);

// PUT /api/articles/:id -> Memperbarui artikel
// Urutan middleware sama seperti saat membuat artikel
router.put('/:id', protect, upload.single('image'), validateArticle, updateArticle);

// DELETE /api/articles/:id -> Menghapus artikel
// Tidak perlu upload atau validasi data untuk menghapus
router.delete('/:id', protect, deleteArticle);


export default router;