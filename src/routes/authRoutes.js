import express from 'express';
import { login, register } from '../controllers/authController.js';
// Impor validator jika Anda ingin menambahkan validasi input
import { check } from 'express-validator';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Mendaftarkan user baru
 * @access  Public
 */
router.post(
    '/register',
    [
        // Validasi input untuk memastikan data yang diterima sesuai standar
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user dan mendapatkan token JWT
 * @access  Public
 */
router.post(
    '/login',
    [
        // Validasi input untuk login
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

export default router;