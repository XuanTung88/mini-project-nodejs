# Mini Project — Node.js Buffer/Stream với Express

Mini project mô phỏng API quản lý ảnh sản phẩm mỹ phẩm: **upload / download / merge (ghép luồng)**
ảnh, tập trung vào việc hiểu rõ Buffer và Stream trong Node.js thông qua ví dụ thực tế.

Có **2 cách tương tác**:
1. **Giao diện web (khuyến nghị)** — mở trình duyệt, kéo thả ảnh, chọn nhiều ảnh để ghép zip.
2. **Client Node.js script** — chạy lệnh trong terminal, phù hợp để soi kỹ luồng buffer/stream qua console.log.

## Cấu trúc dự án

```
mini_project/
├── Images/
│   └── products/        # ảnh mẫu có sẵn (banner, logo, partner...)
├── server/
│   ├── server.js          # entry point Express app (serve luôn frontend ở /public)
│   ├── public/             # 🌐 FRONTEND - giao diện web cho người dùng
│   │   ├── index.html       # trang chính: upload, xem danh sách, chọn & merge ảnh
│   │   ├── style.css        # theme mỹ phẩm (hồng pastel)
│   │   └── app.js           # xử lý fetch/XHR upload, load danh sách, merge -> tải zip
│   ├── routes/
│   │   ├── upload.route.js    # POST   /api/upload         - nhận ảnh (multer + stream)
│   │   ├── download.route.js  # GET    /api/download/:name - trả ảnh (readStream)
│   │   ├── merge.route.js     # POST   /api/merge           - ghép nhiều ảnh -> 1 file zip (archiver)
│   │   └── files.route.js     # GET    /api/files           - danh sách ảnh (cho frontend)
│   │                           # DELETE /api/files/:name    - xoá ảnh (cho frontend)
│   ├── uploads/            # nơi lưu ảnh sau khi upload
│   └── package.json
├── client/                 # client Node.js thuần (dùng nếu muốn học sâu về stream qua terminal)
│   ├── uploadClient.js
│   ├── downloadClient.js
│   └── mergeClient.js
└── package.json
```

## Cài đặt

```bash
cd server
npm install
```

## Chạy server

```bash
cd server
npm run dev        # dùng nodemon, tự restart khi sửa code
# hoặc
npm start
```

Server chạy tại: `http://localhost:3000`

## Cách 1 — Dùng giao diện web (khuyến nghị)

Mở trình duyệt tới **http://localhost:3000**

- **Upload**: kéo thả hoặc bấm chọn ảnh → bấm "Upload" → có progress bar (dùng `XMLHttpRequest` `upload.onprogress` để thấy trực quan luồng gửi theo chunk).
- **Xem danh sách**: tất cả ảnh trong `server/uploads/` hiện ra dạng lưới, kèm ảnh preview + dung lượng.
- **Chọn & Ghép luồng (Merge)**: tick chọn nhiều ảnh → bấm "Ghép & Tải ZIP" → trình duyệt sẽ tự tải về file `products-merged.zip` (server dùng `archiver` ghép nhiều readable stream vào 1 luồng zip rồi trả thẳng qua response, không tạo file tạm).
- **Xoá ảnh**: bấm nút ✕ trên góc mỗi ảnh.

## Cách 2 — Test bằng client Node.js có sẵn

**1. Upload một ảnh mẫu lên server:**
```bash
cd client
node uploadClient.js ../Images/products/logo.png
```
Server sẽ trả về JSON có `filename` mới (dạng `product_<timestamp>.png`), ghi lại tên này để dùng bước sau.

**2. Tải ảnh vừa upload về:**
```bash
node downloadClient.js product_1234567890.png
```

**3. Ghép nhiều ảnh đã upload thành 1 file zip:**
```bash
node mergeClient.js product_1234567890.png product_1234567891.png
```

## Test bằng curl (thay thế client script)

```bash
# upload
curl -F "productImage=@../Images/products/logo.png" http://localhost:3000/api/upload

# download
curl -o test.png http://localhost:3000/api/download/product_xxxx.png

# merge (ghép luồng)
curl -X POST -H "Content-Type: application/json" \
  -d '{"filenames":["product_xxxx.png","product_yyyy.png"]}' \
  -o merged.zip http://localhost:3000/api/merge
```

## Trọng tâm kiến thức Buffer/Stream trong project này

- **Buffer**: dữ liệu file (ảnh) khi đọc/ghi luôn ở dạng nhị phân (`Buffer`), không phải string.
- **Readable Stream**: `fs.createReadStream()` đọc file theo từng chunk (mặc định 64KB), không load hết vào RAM.
- **Writable Stream**: `fs.createWriteStream()`, `res` (HTTP response), `req` (HTTP request khi gửi đi) đều là writable stream.
- **`.pipe()`**: nối một readable stream vào một writable stream, tự động xử lý backpressure.
- **Ghép luồng (fan-in)**: route `/api/merge` dùng `archiver` để nạp (`append`) nhiều readable stream (nhiều ảnh) vào **một** luồng nén zip duy nhất, rồi pipe thẳng luồng đó ra response — không cần tạo file zip tạm trên đĩa.

## Gợi ý mở rộng

- Thêm `zlib.createGzip()` làm Transform stream chèn giữa để nén ảnh khi download.
- Giới hạn tốc độ luồng (throttle) bằng cách custom Transform stream.
- Viết giao diện HTML đơn giản để test upload/download qua trình duyệt thay vì curl/script.
