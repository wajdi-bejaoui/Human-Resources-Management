const multer = require('multer');
const path = require('path');

// Configure multer to specify the storage location and filename format
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images');  // Path to store images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);  // Use the current timestamp and original filename
    }
  });
  
  // Only allow image file types
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  };
  
  // Initialize multer with storage and file filtering
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }  // Limit file size to 5MB
  });

  module.exports = upload;
