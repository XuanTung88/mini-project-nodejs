const express = require('express');
const morgan = require('morgan');
const path = require('path');

const uploadRoute = require('./routes/upload.route');
const downloadRoute = require('./routes/download.route');
const mergeRoute = require('./routes/merge.route');
const filesRoute = require('./routes/files.route');

const app = express();

app.use(morgan('dev'));

// frontend tĩnh (HTML/CSS/JS) - đây là giao diện cho người dùng tương tác
app.use(express.static(path.join(__dirname, 'public')));

// serve ảnh đã upload để frontend preview trực tiếp bằng thẻ <img>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// static serve thư mục Images gốc (ảnh mẫu có sẵn: banner, logo, partner...)
app.use('/static-images', express.static(path.join(__dirname, '..', 'Images')));

app.use('/api/upload', uploadRoute);
app.use('/api/download', downloadRoute);
app.use('/api/merge', mergeRoute);
app.use('/api/files', filesRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
