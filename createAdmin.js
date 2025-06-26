import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Data admin yang ingin dibuat
const adminData = {
    name: 'Administrator',
    email: 'admin@example.com',
    password: 'password123' 
};

// Buat koneksi database hanya untuk script ini
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const createAdmin = async () => {
    console.log('Connecting to database...');
    db.connect(async (err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('MySQL Connected.');

        try {
            // 1. Hash password
            console.log('Hashing password...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminData.password, salt);
            console.log('Password hashed.');

            // 2. Buat query SQL
            const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const params = [adminData.name, adminData.email, hashedPassword];

            // 3. Jalankan query
            console.log('Inserting admin user into database...');
            db.query(sql, params, (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        console.error('Error: Admin user with this email already exists.');
                    } else {
                        console.error('Error inserting user:', err);
                    }
                } else {
                    console.log('Admin user created successfully!');
                    console.log('User ID:', result.insertId);
                }

                // 4. Tutup koneksi database
                db.end();
                console.log('Database connection closed.');
            });
        } catch (error) {
            console.error('An error occurred:', error);
            db.end();
        }
    });
};

createAdmin();