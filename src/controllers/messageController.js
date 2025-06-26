// src/controllers/messageController.js

import db from '../config/database.js';

/**
 * @desc    Membuat pesan baru (dari form kontak publik)
 * @route   POST /api/messages
 * @access  Public
 */
export const createMessage = (req, res) => {
    const { name, email, message } = req.body;

    // Validasi sederhana
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).json({ message: 'Server error while saving message' });
        }
        res.status(201).json({ message: 'Message sent successfully' });
    });
};

/**
 * @desc    Mengambil semua pesan (untuk dashboard admin)
 * @route   GET /api/messages
 * @access  Private (Admin Only)
 */
export const getAllMessages = (req, res) => {
    const sql = 'SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ message: 'Server error while fetching messages' });
        }
        res.status(200).json(results);
    });
};

/**
 * @desc    Menghapus satu atau lebih pesan berdasarkan ID
 * @route   POST /api/messages/delete
 * @access  Private (Admin Only)
 */
export const deleteMessages = (req, res) => {
    const { ids } = req.body; // Menerima array of IDs, contoh: { "ids": [1, 3, 5] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No message IDs provided or invalid format' });
    }

    const sql = 'DELETE FROM messages WHERE id IN (?)';
    db.query(sql, [ids], (err, result) => {
        if (err) {
            console.error('Error deleting messages:', err);
            return res.status(500).json({ message: 'Server error while deleting messages' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No messages found with the provided IDs' });
        }
        res.status(200).json({ message: 'Messages deleted successfully' });
    });
};