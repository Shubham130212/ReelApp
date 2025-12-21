const multer = require('multer')

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop().toLowerCase()
    if (['jpeg','jpg','png', 'mp4'].includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Only images or videos with jpeg, jpg, png, or mp4 are allowed'), false);
    }
};

const uploadFile = multer({ 
    storage: storage, 
    limits: { fileSize: 15 * 1024 * 1024 }, // 105 MB
    fileFilter: fileFilter 
}).single('image');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size should be less than 15 mb' });
        }
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};

module.exports = { uploadFile, handleMulterError };