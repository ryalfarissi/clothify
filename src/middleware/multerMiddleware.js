// File: src/middleware/multerMiddleware.js

import multer from 'multer';

// Gunakan memoryStorage untuk menyimpan file sebagai buffer di RAM
const storage = multer.memoryStorage();

// Anda bisa menambahkan filter file di sini jika perlu (opsional tapi direkomendasikan)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Terima file jika itu adalah gambar
    } else {
        cb(new Error('File yang diunggah bukan gambar!'), false); // Tolak file
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;