/**
 * Client tải ảnh về từ server, nhận response stream và ghi thẳng xuống đĩa.
 *
 * Chạy: node downloadClient.js <tên-file-trên-server>
 * Ví dụ: node downloadClient.js product_1234567890.jpg
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

function downloadImage(filename) {
  if (!filename) {
    console.error('❌ Cần truyền tên file. Ví dụ: node downloadClient.js product_xxx.jpg');
    process.exit(1);
  }

  const outPath = path.join(__dirname, 'downloaded_' + filename);

  http.get(`http://localhost:3000/api/download/${filename}`, (res) => {
    if (res.statusCode !== 200) {
      console.error(`❌ Lỗi tải file: HTTP ${res.statusCode}`);
      res.resume();
      return;
    }

    const total = parseInt(res.headers['content-length'] || '0', 10);
    let received = 0;
    const writeStream = fs.createWriteStream(outPath);

    res.on('data', (chunk) => {
      received += chunk.length;
      if (total) {
        process.stdout.write(`\rĐang tải: ${((received / total) * 100).toFixed(1)}%`);
      }
    });

    res.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`\n✅ Đã lưu vào: ${outPath}`);
    });
  }).on('error', (err) => console.error('❌ Lỗi kết nối:', err.message));
}

const filename = process.argv[2];
downloadImage(filename);
