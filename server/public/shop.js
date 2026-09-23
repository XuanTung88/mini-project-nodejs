/* shop.js — Mini Cosmetics Store Logic */
'use strict';

// ===== Product Data =====
const PRODUCTS = [
  {
    id: 1,
    name: 'Áo Be Like 87 — Phong cách thể thao',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/ao-belike1_master.jpg',
    price: 185000,
    oldPrice: 250000,
    badges: ['hot', 'sale'],
    rating: 4.8,
    ratingCount: 124,
    desc: 'Áo thun cotton 100%, chất liệu thoáng mát, in hình chữ số phong cách thể thao. Phù hợp mặc đi học, đi chơi, thể dục.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isSale: true,
  },
  {
    id: 2,
    name: 'Áo Sơ Mi Nhẹ Nhàng Dịu Dàng',
    category: 'ao-somi',
    categoryLabel: 'Áo Sơ Mi',
    image: '/static-images/products/ao-somi-2_master.jpg',
    price: 220000,
    oldPrice: null,
    badges: ['new'],
    rating: 4.6,
    ratingCount: 87,
    desc: 'Áo sơ mi vải lụa nhẹ mềm mại, thiết kế thanh lịch. Phù hợp đi làm, đi chơi, dự tiệc.',
    sizes: ['S', 'M', 'L', 'XL'],
    isSale: false,
  },
  {
    id: 3,
    name: 'Áo Yếm Vintage Đáng Yêu',
    category: 'ao-yem',
    categoryLabel: 'Áo Yếm',
    image: '/static-images/products/ao-yem-1_master.jpg',
    price: 145000,
    oldPrice: 195000,
    badges: ['sale'],
    rating: 4.9,
    ratingCount: 210,
    desc: 'Áo yếm phong cách vintage, chất cotton dày dặn, màu sắc tươi tắn. Hot trend 2024.',
    sizes: ['S', 'M', 'L'],
    isSale: true,
  },
  {
    id: 4,
    name: 'Áo Thun Oversize Unisex',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/1200_17_67_master.jpg',
    price: 159000,
    oldPrice: 199000,
    badges: ['sale'],
    rating: 4.7,
    ratingCount: 156,
    desc: 'Áo thun form rộng phong cách unisex, chất cotton 100% dày, co giãn 4 chiều.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    isSale: true,
  },
  {
    id: 5,
    name: 'Áo Thun Premium Trơn Cổ Tàu',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/1200_6_451_master.jpg',
    price: 139000,
    oldPrice: null,
    badges: ['new'],
    rating: 4.5,
    ratingCount: 68,
    desc: 'Áo thun cổ tàu trơn cao cấp, chất liệu cotton combed mềm mịn, không bai giãn.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isSale: false,
  },
  {
    id: 6,
    name: 'Áo Thun Nữ Basic Form Ôm',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/2_44_90_master.jpg',
    price: 99000,
    oldPrice: 135000,
    badges: ['sale', 'hot'],
    rating: 4.4,
    ratingCount: 342,
    desc: 'Áo thun nữ basic form ôm nhẹ, tôn dáng. Chất liệu cotton mềm, màu sắc tươi tắn nhiều lựa chọn.',
    sizes: ['XS', 'S', 'M'],
    isSale: true,
  },
  {
    id: 7,
    name: 'Áo Sơ Mi Kẻ Sọc Thanh Lịch',
    category: 'ao-somi',
    categoryLabel: 'Áo Sơ Mi',
    image: '/static-images/products/pr10_18fd8cae-14f6-4d70-40b5-5fde4db1df12_master.jpg',
    price: 245000,
    oldPrice: null,
    badges: ['new'],
    rating: 4.7,
    ratingCount: 53,
    desc: 'Áo sơ mi kẻ sọc thiết kế tối giản, thanh lịch. Chất liệu vải sợi tre thoáng mát.',
    sizes: ['S', 'M', 'L', 'XL'],
    isSale: false,
  },
  {
    id: 8,
    name: 'Áo Sơ Mi Linen Tự Nhiên',
    category: 'ao-somi',
    categoryLabel: 'Áo Sơ Mi',
    image: '/static-images/products/pr11_40e951b1-7be3-4f65-4bb8-fc9c1902e6d1_master.jpg',
    price: 289000,
    oldPrice: 350000,
    badges: ['sale'],
    rating: 4.8,
    ratingCount: 92,
    desc: 'Áo sơ mi linen tự nhiên 100%, không nhăn, thoáng mát mùa hè. Phong cách tối giản sang trọng.',
    sizes: ['S', 'M', 'L', 'XL'],
    isSale: true,
  },
  {
    id: 9,
    name: 'Áo Croptop Năng Động',
    category: 'ao-yem',
    categoryLabel: 'Áo Yếm',
    image: '/static-images/products/pr12_6e6ab775-622b-43ae-43c9-08796dd0c9e2_master.jpg',
    price: 125000,
    oldPrice: 165000,
    badges: ['sale', 'hot'],
    rating: 4.9,
    ratingCount: 287,
    desc: 'Áo croptop kiểu yếm năng động, phù hợp đi chơi, dự tiệc. Nhiều màu sắc trẻ trung.',
    sizes: ['XS', 'S', 'M', 'L'],
    isSale: true,
  },
  {
    id: 10,
    name: 'Áo Phông Graphic Nghệ Thuật',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/pr23_d88c715b-a920-42e1-613e-7d7ba1317762_master.jpg',
    price: 175000,
    oldPrice: null,
    badges: ['new'],
    rating: 4.6,
    ratingCount: 44,
    desc: 'Áo thun in hình nghệ thuật độc đáo, dành cho bạn trẻ cá tính. Cotton 100% cao cấp.',
    sizes: ['S', 'M', 'L', 'XL'],
    isSale: false,
  },
  {
    id: 11,
    name: 'Áo Sơ Mi Công Sở Nữ',
    category: 'ao-somi',
    categoryLabel: 'Áo Sơ Mi',
    image: '/static-images/products/pr8_master.jpg',
    price: 265000,
    oldPrice: 320000,
    badges: ['sale'],
    rating: 4.7,
    ratingCount: 115,
    desc: 'Áo sơ mi công sở thanh lịch, vải không nhăn, dễ ủi. Phù hợp môi trường văn phòng lịch sự.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    isSale: true,
  },
  {
    id: 12,
    name: 'Áo Thun Tay Dài Basic',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/pr9_80450716-2b66-4b4b-76ed-5c1534a804fa_master.jpg',
    price: 155000,
    oldPrice: 195000,
    badges: ['sale'],
    rating: 4.5,
    ratingCount: 76,
    desc: 'Áo thun tay dài màu trơn basic, giữ ấm nhẹ, phù hợp thời tiết se lạnh.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isSale: true,
  },
  {
    id: 13,
    name: 'Áo Thun Mùa Hè Năng Động',
    category: 'ao-thun',
    categoryLabel: 'Áo Thun',
    image: '/static-images/products/tabs_1_slider_img_1.jpg',
    price: 119000,
    oldPrice: null,
    badges: ['new', 'hot'],
    rating: 4.8,
    ratingCount: 198,
    desc: 'Áo thun mùa hè vải cotton thấm hút tốt, thiết kế trẻ trung, phù hợp hoạt động ngoài trời.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    isSale: false,
  },
];

// ===== State =====
let cart = [];
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';
let currentModalProduct = null;
let selectedSize = '';
let heroSlideIndex = 0;

// ===== DOM Refs =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchBarWrap = document.getElementById('searchBarWrap');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const noResults = document.getElementById('noResults');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const sortSelect = document.getElementById('sortSelect');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const toastContainer = document.getElementById('toastContainer');
const backTop = document.getElementById('backTop');
const heroDots = document.getElementById('heroDots');
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

// ===== Helpers =====
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + '₫';
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function badgeHtml(badges) {
  const map = {
    new: ['badge-new', 'NEW'],
    sale: ['badge-sale', 'SALE'],
    hot: ['badge-hot', '🔥 HOT'],
  };
  return badges.map(b => {
    const [cls, label] = map[b] || ['', b];
    return `<span class="badge ${cls}">${label}</span>`;
  }).join('');
}

// ===== Toast =====
function showToast(msg, icon = '✅') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.classList.add('hide');
    t.addEventListener('animationend', () => t.remove());
  }, 3000);
}

// ===== Navbar scroll =====
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ===== Back to top =====
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Hamburger =====
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ===== Search =====
searchToggleBtn.addEventListener('click', () => {
  searchBarWrap.classList.toggle('open');
  if (searchBarWrap.classList.contains('open')) searchInput.focus();
});
searchClose.addEventListener('click', () => {
  searchBarWrap.classList.remove('open');
  searchInput.value = '';
  currentSearch = '';
  renderProducts();
});
searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.toLowerCase().trim();
  renderProducts();
});

// ===== Hero Slideshow =====
function goToSlide(index) {
  heroSlides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  heroSlideIndex = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slide)));
});

setInterval(() => {
  goToSlide((heroSlideIndex + 1) % heroSlides.length);
}, 5000);

// ===== Cart =====
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  cartBadge.textContent = total;
  cartBadge.classList.toggle('visible', total > 0);
}

function renderCart() {
  const hasItems = cart.length > 0;
  cartEmpty.style.display = hasItems ? 'none' : 'flex';
  cartFooter.style.display = hasItems ? 'block' : 'none';

  // Remove old items (keep cartEmpty)
  [...cartItems.children].forEach(c => { if (c !== cartEmpty) c.remove(); });

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">Size: ${item.size}</div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${item.id}" data-action="dec">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="inc">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Xoá">✕</button>
    `;
    cartItems.appendChild(el);
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = formatPrice(total);
  updateCartBadge();
}

cartItems.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  if (e.target.classList.contains('cart-item-remove')) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
    showToast('Đã xoá khỏi giỏ hàng', '🗑️');
  } else if (e.target.classList.contains('qty-btn')) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (e.target.dataset.action === 'inc') item.qty += 1;
    else if (e.target.dataset.action === 'dec') {
      item.qty -= 1;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
  }
});

checkoutBtn.addEventListener('click', () => {
  showToast('Tính năng thanh toán sắp ra mắt! 🚀', '💳');
});

function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1, size: size || 'M' });
  }
  renderCart();
  openCart();
  showToast(`Đã thêm "${product.name.split('—')[0].trim()}" vào giỏ!`, '🛒');
}

// ===== Category Filter =====
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    currentFilter = card.dataset.filter;
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Pre-activate "all"
document.getElementById('cat-all').classList.add('active');

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderProducts();
});

if (resetFilterBtn) {
  resetFilterBtn.addEventListener('click', () => {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'default';
    searchInput.value = '';
    sortSelect.value = 'default';
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    document.getElementById('cat-all').classList.add('active');
    renderProducts();
  });
}

// ===== Render Products =====
function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (currentFilter !== 'all') {
    if (currentFilter === 'sale') list = list.filter(p => p.isSale);
    else list = list.filter(p => p.category === currentFilter);
  }

  if (currentSearch) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.categoryLabel.toLowerCase().includes(currentSearch)
    );
  }

  switch (currentSort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name, 'vi')); break;
  }

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  productsGrid.innerHTML = '';

  if (list.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }
  noResults.classList.add('hidden');

  list.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${idx * 0.05}s`;
    card.style.animation = 'fadeUp 0.5s ease both';
    card.innerHTML = `
      <div class="product-img-wrap">
        <img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-badges">${badgeHtml(p.badges)}</div>
        <div class="product-actions">
          <button class="btn-cart" data-id="${p.id}">🛒 Thêm vào giỏ</button>
          <button class="btn-quickview" data-id="${p.id}" title="Xem nhanh">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating-wrap">
          <span class="product-stars">${stars(p.rating)}</span>
          <span class="product-rating-count">(${p.ratingCount})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    `;

    card.querySelector('.btn-cart').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(p, 'M');
    });

    card.querySelector('.btn-quickview').addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(p);
    });

    card.addEventListener('click', () => openModal(p));
    productsGrid.appendChild(card);
  });
}

// ===== Modal =====
function openModal(product) {
  currentModalProduct = product;
  selectedSize = product.sizes[0] || 'M';

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrap">
        <img class="modal-img" src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="modal-info">
        <div class="modal-category">${product.categoryLabel}</div>
        <h2 class="modal-name">${product.name}</h2>
        <div class="modal-price">${formatPrice(product.price)}</div>
        ${product.oldPrice ? `<div class="modal-old-price">${formatPrice(product.oldPrice)}</div>` : ''}
        <div class="product-rating-wrap" style="margin-bottom:16px">
          <span class="product-stars">${stars(product.rating)}</span>
          <span class="product-rating-count">${product.rating} (${product.ratingCount} đánh giá)</span>
        </div>
        <p class="modal-desc">${product.desc}</p>
        <div class="modal-sizes">
          <h4>Chọn size:</h4>
          <div class="size-options">
            ${product.sizes.map(s =>
              `<button class="size-btn${s === selectedSize ? ' active' : ''}" data-size="${s}">${s}</button>`
            ).join('')}
          </div>
        </div>
        <button class="modal-add-btn" id="modalAddBtn">🛒 Thêm vào giỏ hàng</button>
      </div>
    </div>
  `;

  modalBody.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalBody.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  document.getElementById('modalAddBtn').addEventListener('click', () => {
    addToCart(currentModalProduct, selectedSize);
    closeModal();
  });

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closeCart(); }
});

// ===== Init =====
renderProducts();
renderCart();
