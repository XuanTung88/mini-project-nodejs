const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// GET /api/files -> danh sách ảnh đã upload, dùng cho frontend hiển thị/chọn để merge
router.get('/', (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Không đọc được thư mục uploads' });

    const images = files.filter((f) => !f.startsWith('.'));

    const results = images.map((filename) => {
      const stat = fs.statSync(path.join(UPLOAD_DIR, filename));
      return {
        filename,
        size: stat.size,
        url: `/api/download/${filename}`,
        preview: `/uploads/${filename}`, // dùng để hiển thị ảnh trực tiếp (xem bên dưới static route)
      };
    });

    res.json({ ok: true, count: results.length, files: results });
  });
});

// DELETE /api/files/:filename -> xoá 1 ảnh (tuỳ chọn, để frontend dọn dẹp)
router.delete('/:filename', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ error: 'File không tồn tại' });
    res.json({ ok: true });
  });
});

module.exports = router;
