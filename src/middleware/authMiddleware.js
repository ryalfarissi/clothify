// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // Ambil token dari header ('Bearer <token>')
            token = authHeader.split(' ')[1];

            // Verifikasi token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Simpan data user dari token ke request agar bisa dipakai di controller
            req.user = decoded;

            next(); 
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;