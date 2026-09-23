const express = require('express');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// POST body: { "filenames": ["a.jpg", "b.jpg", "c.jpg"] }
router.post('/', express.json(), (req, res) => {
  const { filenames } = req.body;
  if (!Array.isArray(filenames) || filenames.length === 0) {
    return res.status(400).json({ error: 'Cần truyền mảng filenames' });
  }

  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-Disposition': 'attachment; filename="products-merged.zip"',
  });

  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', (err) => {
    console.error('Lỗi khi ghép:', err.message);
    res.status(500).end();
  });

  // archive LÀ MỘT WRITABLE STREAM, res cũng là writable
  // -> pipe archive thẳng ra response, mỗi ảnh là 1 readable stream được "nạp" vào
  archive.pipe(res);

  let addedCount = 0;
  for (const name of filenames) {
    const filePath = path.join(UPLOAD_DIR, name);
    if (fs.existsSync(filePath)) {
      archive.append(fs.createReadStream(filePath), { name }); // ghép từng luồng con
      addedCount++;
    } else {
      console.warn(`Bỏ qua (không tồn tại): ${name}`);
    }
  }

  if (addedCount === 0) {
    res.status(404).end();
    return;
  }

  archive.finalize(); // báo hiệu đã ghép xong, đóng luồng zip
});

module.exports = router;
