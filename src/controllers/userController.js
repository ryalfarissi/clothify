import db from '../config/database.js'; 
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: 'Server error', error: err });
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
};
