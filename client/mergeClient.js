/**
 * Client gọi API /api/merge để ghép nhiều ảnh trên server thành 1 file zip,
 * nhận luồng zip trả về và ghi thẳng xuống đĩa (không giữ trong RAM).
 *
 * Chạy: node mergeClient.js file1.jpg file2.jpg file3.jpg
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

function mergeImages(filenames) {
  if (!filenames || filenames.length === 0) {
    console.error('❌ Cần truyền ít nhất 1 tên file. Ví dụ:');
    console.error('   node mergeClient.js product_1.jpg product_2.jpg');
    process.exit(1);
  }

  const payload = JSON.stringify({ filenames });
  const outPath = path.join(__dirname, 'merged-products.zip');

  const req = http.request(
    {
      hostname: 'localhost',
      port: 3000,
      path: '/api/merge',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    (res) => {
      if (res.statusCode !== 200) {
        console.error(`❌ Lỗi: HTTP ${res.statusCode}`);
        res.resume();
        return;
      }
      const writeStream = fs.createWriteStream(outPath);
      res.pipe(writeStream); // nhận luồng zip trả về, ghi thẳng xuống file
      writeStream.on('finish', () => console.log(`✅ Đã tải file ghép: ${outPath}`));
    }
  );

  req.on('error', (err) => console.error('❌ Lỗi kết nối:', err.message));

  req.write(payload);
  req.end();
}

const filenames = process.argv.slice(2);
mergeImages(filenames);
