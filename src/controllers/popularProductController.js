// File: src/controllers/popularProductController.js

import db from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import sharp from 'sharp'; // <--- Impor Sharp

/*
 * =========================================
 *      MIDDLEWARE UNTUK VALIDASI
 * =========================================
 */
export const validateProduct = [
    body('product_name').trim().notEmpty().withMessage('Nama produk tidak boleh kosong.'),
    body('price').notEmpty().withMessage('Harga tidak boleh kosong.').isNumeric().withMessage('Harga harus berupa angka.'),
    body('rating').notEmpty().withMessage('Rating tidak boleh kosong.').isFloat({ min: 0, max: 5 }).withMessage('Rating harus berupa angka antara 0 dan 5.'),
];

/*
 * =========================================
 *      FUNGSI PEMROSESAN GAMBAR (BARU)
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
        const imageOutputName = `product-${filename}.webp`;
        const thumbOutputName = `thumb-product-${filename}.webp`;

        // Proses gambar utama dari buffer (kualitas baik, ukuran lebih besar)
        await sharp(file.buffer)
            .resize({ width: 800, withoutEnlargement: true })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(path.join(baseOutputPath, imageOutputName));

        // Proses thumbnail dari buffer (kualitas cukup, ukuran sangat kecil)
        await sharp(file.buffer)
            .resize({ width: 300 })
            .toFormat('webp')
            .webp({ quality: 70 })
            .toFile(path.join(baseOutputPath, thumbOutputName));

        return {
            image_path: `/images/${imageOutputName}`,
            thumbnail_path: `/images/${thumbOutputName}`
        };
    } catch (error) {
        console.error("Error saat memproses gambar dengan Sharp:", error);
        throw new Error('Gagal memproses gambar.');
    }
};

/*
 * =========================================
 *      FUNGSI-FUNGSI CONTROLLER (DIPERBARUI)
 * =========================================
 */

// Mendapatkan semua produk populer
export const getAllProducts = (req, res) => {
    // Memilih kolom baru 'thumbnail_path'
    const sql = 'SELECT id, product_name, price, rating, image_path, thumbnail_path, created_at FROM popular_products ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server.', error: err });
        res.json(results);
    });
};

// Mendapatkan satu produk berdasarkan ID
export const getProductById = (req, res) => {
    const { id } = req.params;
    // Memilih kolom baru 'thumbnail_path'
    const sql = 'SELECT id, product_name, price, rating, image_path, thumbnail_path, created_at FROM popular_products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        res.json(results[0]);
    });
};

// Membuat produk baru
export const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'Gambar produk wajib diunggah.' });
    }

    try {
        const { product_name, price, rating } = req.body;
        const { image_path, thumbnail_path } = await processImage(req.file);

        if (!image_path || !thumbnail_path) {
            return res.status(500).json({ message: 'Gagal memproses path gambar.' });
        }

        const sql = 'INSERT INTO popular_products (product_name, price, rating, image_path, thumbnail_path) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [product_name, price, rating, image_path, thumbnail_path], (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal menyimpan produk ke database.', error: err });
            res.status(201).json({ message: 'Produk berhasil dibuat.', productId: result.insertId });
        });

    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat membuat produk.' });
    }
};

// Memperbarui produk
export const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { product_name, price, rating } = req.body;

    db.query('SELECT image_path, thumbnail_path FROM popular_products WHERE id = ?', [id], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server saat mencari produk lama.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Produk yang akan diperbarui tidak ditemukan.' });

        const oldPaths = results[0];
        let newPaths = { image_path: oldPaths.image_path, thumbnail_path: oldPaths.thumbnail_path };

        try {
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

            const sql = 'UPDATE popular_products SET product_name = ?, price = ?, rating = ?, image_path = ?, thumbnail_path = ? WHERE id = ?';
            db.query(sql, [product_name, price, rating, newPaths.image_path, newPaths.thumbnail_path, id], (dbErr) => {
                if (dbErr) return res.status(500).json({ message: 'Gagal memperbarui produk di database.', error: dbErr });
                res.json({ message: 'Produk berhasil diperbarui.' });
            });

        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui produk.' });
        }
    });
};

// Menghapus produk
export const deleteProduct = (req, res) => {
    const { id } = req.params;

    db.query('SELECT image_path, thumbnail_path FROM popular_products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Kesalahan server saat mencari produk.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Produk yang akan dihapus tidak ditemukan.' });

        const pathsToDelete = results[0];

        const sql = 'DELETE FROM popular_products WHERE id = ?';
        db.query(sql, [id], (dbErr) => {
            if (dbErr) return res.status(500).json({ message: 'Gagal menghapus produk dari database.', error: dbErr });

            // Hapus kedua file gambar (utama dan thumbnail)
            [pathsToDelete.image_path, pathsToDelete.thumbnail_path].forEach(filePath => {
                if (filePath) {
                    const fullPath = path.resolve('public', filePath.substring(1));
                    fs.unlink(fullPath, (unlinkErr) => {
                        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                            console.error("Gagal menghapus file gambar:", unlinkErr);
                        }
                    });
                }
            });

            res.json({ message: 'Produk berhasil dihapus.' });
        });
    });
};