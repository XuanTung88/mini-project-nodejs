/**
 * Client gửi ảnh lên server bằng HTTP POST multipart/form-data,
 * tự tay build multipart để thấy rõ bản chất: nó chỉ là buffer text
 * ghép với buffer nhị phân của file, gửi theo stream.
 *
 * Chạy: node uploadClient.js <đường-dẫn-ảnh>
 * Ví dụ: node uploadClient.js ../Images/products/logo.png
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('❌ File không tồn tại:', filePath);
    process.exit(1);
  }

  const boundary = '----MyBoundary' + Date.now();
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  const req = http.request(
    {
      hostname: 'localhost',
      port: 3000,
      path: '/api/upload',
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    },
    (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => console.log('✅ Server phản hồi:', data));
    }
  );

  req.on('error', (err) => console.error('❌ Lỗi kết nối:', err.message));

  // Phần header multipart (mở đầu)
  req.write(
    `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="productImage"; filename="${fileName}"\r\n` +
      `Content-Type: image/jpeg\r\n\r\n`
  );

  fileStream.on('end', () => {
    // Phần kết thúc multipart, đóng request thủ công sau khi file đã pipe xong
    req.end(`\r\n--${boundary}--`);
  });

  // pipe file trực tiếp vào request, không load hết vào RAM
  fileStream.pipe(req, { end: false });
}

const target = process.argv[2] || path.join(__dirname, '..', 'Images', 'products', 'logo.png');
uploadImage(target);
