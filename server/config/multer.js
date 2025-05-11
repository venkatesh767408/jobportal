// server/config/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // Store uploaded files in memory (RAM)

const upload = multer({ storage });

export default upload;
