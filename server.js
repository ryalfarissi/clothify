import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Konfigurasi dan Middleware Utama
import db from './src/config/database.js';
import protect from './src/middleware/authMiddleware.js';

// Impor Rute (Routes)
import authRoutes from './src/routes/authRoutes.js';
import articleRoutes from './src/routes/articleRoutes.js';
import popularProductRoutes from './src/routes/popularProductRoutes.js'; // <- Rute baru ditambahkan

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Koneksi ke Database
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected successfully...');
});

// Middleware Global
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('public/images')); // Menyajikan file statis untuk gambar

// Registrasi Rute Utama
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/popular-products', popularProductRoutes); // <- Rute baru didaftarkan

/*
 * =========================================
 *         Endpoint Lainnya (Legacy)
 * =========================================
 * Endpoint di bawah ini masih berada di server.js.
 * Idealnya, ini juga bisa dipindahkan ke file controllernya sendiri.
 */

// Endpoint untuk mendapatkan semua pengguna (dilindungi)
app.get('/api/users', protect, (req, res) => {
    const sql = 'SELECT id, name, email, created_at FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json(results);
    });
});

// Endpoint untuk menghapus pengguna (dilindungi)
app.delete('/api/users/:id', protect, (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json({ message: 'User deleted successfully' });
    });
});

// Endpoint untuk mendapatkan semua pesan (dilindungi)
app.get('/api/messages', protect, (req, res) => {
    const sql = 'SELECT id, name, email, message, created_at FROM messages';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json(results);
    });
});

// Endpoint untuk admin menghapus beberapa pesan sekaligus (dilindungi)
app.post('/api/messages/delete', protect, (req, res) => {
    const { ids } = req.body;
    if (!ids || !ids.length) {
        return res.status(400).json({ message: 'No message IDs provided' });
    }
    const sql = 'DELETE FROM messages WHERE id IN (?)';
    db.query(sql, [ids], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json({ message: 'Messages deleted successfully' });
    });
});

// Endpoint untuk publik mengirim pesan dari form kontak
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json({ message: 'Message sent successfully' });
    });
});

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});