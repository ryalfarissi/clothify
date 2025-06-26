import db from '../config/database.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Fungsi untuk registrasi user baru
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi dasar
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Cek apakah email sudah ada
        const checkUserSql = 'SELECT email FROM users WHERE email = ?';
        db.query(checkUserSql, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (results.length > 0) {
                return res.status(409).json({ message: 'Email already exists.' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Simpan user ke database
            const insertUserSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertUserSql, [name, email, hashedPassword], (err) => {
                if (err) return res.status(500).json({ message: 'Failed to register user.' });
                res.status(201).json({ message: 'User registered successfully.' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi login 
export const login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const payload = { id: user.id, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successful',
            name: user.name,
            token: token
        });
    });
};