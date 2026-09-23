const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

router.get('/:filename', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);

  fs.stat(filePath, (err, stat) => {
    if (err) return res.status(404).json({ error: 'File không tồn tại' });

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${req.params.filename}"`,
    });

    const readStream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 });

    let sent = 0;
    readStream.on('data', (chunk) => {
      sent += chunk.length;
      // log tiến trình gửi — thấy rõ luồng chảy theo chunk
      process.stdout.write(`\rĐang gửi: ${((sent / stat.size) * 100).toFixed(1)}%`);
    });

    readStream.on('end', () => console.log('\nGửi xong.'));
    readStream.on('error', () => res.status(500).end());

    readStream.pipe(res);
  });
});

module.exports = router;
