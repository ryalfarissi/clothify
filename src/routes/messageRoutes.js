import express from 'express';
import {
    createMessage,
    getAllMessages,
    deleteMessages
} from '../controllers/messageController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ======================================================
// RUTE PUBLIK
// Siapa saja dapat mengirim pesan melalui form kontak.
// ======================================================
router.post('/', createMessage);


// ======================================================
// RUTE TERPROTEKSI (PRIVATE)
// Hanya pengguna yang sudah login (admin) yang bisa mengakses endpoint ini.
// Middleware 'protect' akan memeriksa token JWT sebelum melanjutkan ke controller.
// ======================================================

// Mengambil semua pesan untuk ditampilkan di dashboard admin
router.get('/', protect, getAllMessages);

// Menghapus pesan yang dipilih dari dashboard admin
// Menggunakan POST agar bisa mengirim body (array of IDs)
router.post('/delete', protect, deleteMessages);


export default router;