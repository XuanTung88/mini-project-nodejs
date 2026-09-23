// ===== State =====
let selectedFile = null;
let selectedForMerge = new Set();

// ===== DOM refs =====
const dropzone = document.getElementById('dropzone');
const dropzoneText = document.getElementById('dropzoneText');
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const uploadResult = document.getElementById('uploadResult');

const fileGrid = document.getElementById('fileGrid');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');
const selectedCount = document.getElementById('selectedCount');
const mergeBtn = document.getElementById('mergeBtn');
const mergeResult = document.getElementById('mergeResult');

// ===== Helpers =====
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showResult(el, message, type) {
  el.textContent = message;
  el.className = 'result-msg ' + (type || '');
}

// ===== Dropzone =====
dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    handleFileSelected(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFileSelected(fileInput.files[0]);
});

function handleFileSelected(file) {
  selectedFile = file;
  dropzone.classList.add('has-file');
  dropzoneText.textContent = `📎 ${file.name} (${formatBytes(file.size)})`;
  uploadBtn.disabled = false;
}

// ===== Upload (dùng XMLHttpRequest để lấy progress event - phản ánh luồng gửi theo chunk) =====
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('productImage', selectedFile);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/upload');

  progressWrap.hidden = false;
  progressFill.style.width = '0%';
  progressText.textContent = '0%';
  uploadBtn.disabled = true;
  showResult(uploadResult, '', '');

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const percent = ((e.loaded / e.total) * 100).toFixed(0);
      progressFill.style.width = percent + '%';
      progressText.textContent = percent + '%';
    }
  });

  xhr.onload = () => {
    uploadBtn.disabled = false;
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      showResult(uploadResult, `✅ Đã upload: ${data.filename} (${formatBytes(data.size)})`, 'success');
      resetDropzone();
      loadFiles();
    } else {
      const data = safeParse(xhr.responseText);
      showResult(uploadResult, `❌ Lỗi: ${(data && data.error) || 'Upload thất bại'}`, 'error');
    }
    setTimeout(() => (progressWrap.hidden = true), 1200);
  };

  xhr.onerror = () => {
    uploadBtn.disabled = false;
    showResult(uploadResult, '❌ Không kết nối được tới server', 'error');
  };

  xhr.send(formData);
});

function safeParse(text) {
  try { return JSON.parse(text); } catch { return null; }
}

function resetDropzone() {
  selectedFile = null;
  fileInput.value = '';
  dropzone.classList.remove('has-file');
  dropzoneText.textContent = 'Kéo thả ảnh vào đây, hoặc bấm để chọn file';
  uploadBtn.disabled = true;
}

// ===== Load & render danh sách ảnh =====
async function loadFiles() {
  try {
    const res = await fetch('/api/files');
    const data = await res.json();
    renderFileGrid(data.files || []);
  } catch (err) {
    fileGrid.innerHTML = '<p class="empty-state">Không tải được danh sách ảnh.</p>';
  }
}

function renderFileGrid(files) {
  selectedForMerge = new Set([...selectedForMerge].filter((f) => files.some((x) => x.filename === f)));

  if (files.length === 0) {
    fileGrid.innerHTML = '';
    fileGrid.appendChild(emptyState);
    updateMergeBar();
    return;
  }

  fileGrid.innerHTML = '';
  files.forEach((file) => {
    const card = document.createElement('div');
    card.className = 'file-card' + (selectedForMerge.has(file.filename) ? ' selected' : '');
    card.innerHTML = `
      <button class="delete-btn" title="Xoá ảnh">✕</button>
      <span class="checkmark">✓</span>
      <img src="${file.preview}" alt="${file.filename}" loading="lazy" />
      <div class="meta">
        <span class="filename">${file.filename}</span>
        ${formatBytes(file.size)}
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) return;
      toggleSelect(file.filename, card);
    });

    card.querySelector('.delete-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!confirm(`Xoá ${file.filename}?`)) return;
      await fetch(`/api/files/${file.filename}`, { method: 'DELETE' });
      selectedForMerge.delete(file.filename);
      loadFiles();
    });

    fileGrid.appendChild(card);
  });

  updateMergeBar();
}

function toggleSelect(filename, card) {
  if (selectedForMerge.has(filename)) {
    selectedForMerge.delete(filename);
    card.classList.remove('selected');
  } else {
    selectedForMerge.add(filename);
    card.classList.add('selected');
  }
  updateMergeBar();
}

function updateMergeBar() {
  selectedCount.textContent = `Đã chọn: ${selectedForMerge.size}`;
  mergeBtn.disabled = selectedForMerge.size === 0;
}

refreshBtn.addEventListener('click', loadFiles);

// ===== Merge (ghép luồng) & tải zip về =====
mergeBtn.addEventListener('click', async () => {
  if (selectedForMerge.size === 0) return;

  mergeBtn.disabled = true;
  showResult(mergeResult, '⏳ Đang ghép luồng...', '');

  try {
    const res = await fetch('/api/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filenames: [...selectedForMerge] }),
    });

    if (!res.ok) {
      const data = safeParse(await res.text());
      throw new Error((data && data.error) || 'Ghép luồng thất bại');
    }

    // nhận response dạng blob (đây là stream zip server trả về) rồi trigger tải xuống
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-merged.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showResult(mergeResult, `✅ Đã ghép ${selectedForMerge.size} ảnh và tải file zip về.`, 'success');
  } catch (err) {
    showResult(mergeResult, `❌ ${err.message}`, 'error');
  } finally {
    mergeBtn.disabled = selectedForMerge.size === 0;
  }
});

// ===== Init =====
loadFiles();
