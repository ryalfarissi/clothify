// File: src/controllers/articleController.js

import db from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import sharp from 'sharp';

/*
 * =========================================
 *      MIDDLEWARE UNTUK VALIDASI
 * =========================================
 */
export const validateArticle = [
    body('headline')
        .trim()
        .notEmpty()
        .withMessage('Headline tidak boleh kosong.'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Konten tidak boleh kosong.'),
];

/*
 * =========================================
 *      FUNGSI PEMROSESAN GAMBAR
 * =========================================
 */
const processImage = async (file) => {
    if (!file) return { image_path: null, thumbnail_path: null };

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const baseOutputPath = path.resolve(__dirname, '..', '..', 'public', 'images');

    const originalName = path.parse(file.originalname).name.replace(/\s+/g, '-');
    const filename = `${Date.now()}-${originalName}`;

    if (!fs.existsSync(baseOutputPath)) {
        fs.mkdirSync(baseOutputPath, { recursive: true });
    }

    try {
        const imageOutputName = `article-${filename}.webp`;
        const thumbOutputName = `thumb-${filename}.webp`;

        // Proses gambar utama dari buffer
        await sharp(file.buffer)
            .resize({ width: 1024, withoutEnlargement: true })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(path.join(baseOutputPath, imageOutputName));

        // Proses thumbnail dari buffer
        await sharp(file.buffer)
            .resize({ width: 400 })
            .toFormat('webp')
            .webp({ quality: 70 })
            .toFile(path.join(baseOutputPath, thumbOutputName));

        return {
            image_path: `/images/${imageOutputName}`,
            thumbnail_path: `/images/${thumbOutputName}`
        };
    } catch (error) {
        console.error("Sharp processing error:", error);
        throw new Error('Gagal memproses gambar dengan Sharp');
    }
};

/*
 * =========================================
 *      FUNGSI-FUNGSI CONTROLLER
 * =========================================
 */

/**
 * Mendapatkan semua artikel dengan paginasi.
 */
export const getAllArticles = (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '12', 10);
    const offset = (page - 1) * limit;

    const countSql = 'SELECT COUNT(*) as total FROM articles';
    const dataSql = 'SELECT id, headline, content, image_path, thumbnail_path, created_at FROM articles ORDER BY created_at DESC LIMIT ? OFFSET ?';

    db.query(countSql, (err, countResult) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server saat menghitung artikel.', error: err });
        
        const totalArticles = countResult[0].total;
        const totalPages = Math.ceil(totalArticles / limit);

        db.query(dataSql, [limit, offset], (err, articles) => {
            if (err) return res.status(500).json({ message: 'Kesalahan server saat mengambil artikel.', error: err });
            
            res.json({
                articles,
                totalPages,
                currentPage: page
            });
        });
    });
};

/**
 * Mendapatkan satu artikel berdasarkan ID.
 */
export const getArticleById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT id, headline, content, image_path, thumbnail_path, created_at FROM articles WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Artikel tidak ditemukan.' });
        res.json(results[0]);
    });
};

/**
 * Membuat artikel baru.
 */
export const createArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'Gambar artikel wajib diunggah.' });
    }

    try {
        const { headline, content } = req.body;
        const { image_path, thumbnail_path } = await processImage(req.file);

        if (!image_path || !thumbnail_path) {
            return res.status(500).json({ message: 'Gagal memproses dan mendapatkan path gambar.' });
        }

        const sql = 'INSERT INTO articles (headline, content, image_path, thumbnail_path) VALUES (?, ?, ?, ?)';
        db.query(sql, [headline, content, image_path, thumbnail_path], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: 'Gagal menyimpan artikel ke database.', error: err });
            }
            res.status(201).json({ message: 'Artikel berhasil dibuat.', articleId: result.insertId });
        });
    } catch (error) {
        console.error("Create Article Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat membuat artikel.' });
    }
};

/**
 * Memperbarui artikel yang ada.
 */
export const updateArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { headline, content } = req.body;

    db.query('SELECT image_path, thumbnail_path FROM articles WHERE id = ?', [id], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server saat mencari artikel lama.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Artikel yang akan diperbarui tidak ditemukan.' });

        const oldPaths = results[0];
        let newPaths = { image_path: oldPaths.image_path, thumbnail_path: oldPaths.thumbnail_path };

        try {
            // Jika ada file baru yang diunggah, proses dan hapus yang lama
            if (req.file) {
                newPaths = await processImage(req.file);

                // Hapus file lama setelah yang baru berhasil dibuat
                [oldPaths.image_path, oldPaths.thumbnail_path].forEach(filePath => {
                    if (filePath) {
                        const fullPath = path.resolve('public', filePath.substring(1));
                        fs.unlink(fullPath, (unlinkErr) => {
                            if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                                console.error("Gagal menghapus file lama:", unlinkErr);
                            }
                        });
                    }
                });
            }

            const sql = 'UPDATE articles SET headline = ?, content = ?, image_path = ?, thumbnail_path = ? WHERE id = ?';
            db.query(sql, [headline, content, newPaths.image_path, newPaths.thumbnail_path, id], (dbErr) => {
                if (dbErr) {
                    console.error("Database Update Error:", dbErr);
                    return res.status(500).json({ message: 'Gagal memperbarui artikel di database.', error: dbErr });
                }
                res.json({ message: 'Artikel berhasil diperbarui.' });
            });

        } catch (error) {
            console.error("Update Article Error:", error.message);
            res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui artikel.' });
        }
    });
};

/**
 * Menghapus artikel.
 */
export const deleteArticle = (req, res) => {
    const { id } = req.params;

    db.query('SELECT image_path, thumbnail_path FROM articles WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server saat mencari artikel.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Artikel yang akan dihapus tidak ditemukan.' });

        const pathsToDelete = results[0];

        const sql = 'DELETE FROM articles WHERE id = ?';
        db.query(sql, [id], (dbErr) => {
            if (dbErr) return res.status(500).json({ message: 'Gagal menghapus artikel dari database.', error: dbErr });

            // Hapus file gambar setelah data di DB berhasil dihapus
            [pathsToDelete.image_path, pathsToDelete.thumbnail_path].forEach(filePath => {
                if (filePath) {
                    const fullPath = path.resolve('public', filePath.substring(1));
                    fs.unlink(fullPath, (unlinkErr) => {
                        if (unlinkErr && unlinkErr.code !== 'ENOENT') { // Jangan log error jika file memang tidak ada
                            console.error("Gagal menghapus file gambar:", unlinkErr);
                        }
                    });
                }
            });

            res.json({ message: 'Artikel berhasil dihapus.' });
        });
    });
};