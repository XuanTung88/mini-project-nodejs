const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Chỉ chấp nhận file ảnh'));
    }
    cb(null, true);
  },
});

router.post('/', upload.single('productImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file' });

  console.log(`Đã nhận ${req.file.size} bytes -> ${req.file.filename}`);
  res.json({
    ok: true,
    filename: req.file.filename,
    size: req.file.size,
    url: `/api/download/${req.file.filename}`,
  });
});

// Bắt lỗi riêng cho multer (vd: quá dung lượng, sai định dạng)
router.use((err, req, res, next) => {
  console.error('Upload error:', err.message);
  res.status(400).json({ error: err.message });
});

module.exports = router;
