/**
 * CHAPATI INFINITY - JAVASCRIPT APP
 * High-performance, reactive menu & WhatsApp ordering system
 */

// MENU DATABASE - CROPPED PRODUCTS FROM OFFICIAL FLYER
const MENU_ITEMS = [
  {
    id: 'chapatis-10pcs',
    name: 'Soft & Puffy Chapatis (10 Pcs)',
    category: 'chapatis',
    categoryName: 'Ready to Cook',
    badge: '₹60 Special',
    badgeType: 'highlight',
    qtyDesc: 'Pack of 10 pcs',
    price: 60,
    tags: ['10 Pcs', '100% Whole Wheat', '2 Min Quick Cook', 'Zero Maida'],
    image: 'images/product-chapatis-60.jpg',
    description: 'Freshly prepared soft & puffy homestyle chapatis. 10 Pcs pack for only ₹60. Ready to puff up on your tawa in just 2 minutes.'
  },
  {
    id: 'homemade-gravies',
    name: 'Homemade Gravies (From ₹40)',
    category: 'gravies',
    categoryName: 'Homestyle Curries (250 ml)',
    badge: 'From ₹40',
    badgeType: 'highlight',
    qtyDesc: '250 ml • Fresh Evening Batch',
    price: 40,
    tags: ['From ₹40', 'Homestyle Taste', 'No Preservatives', 'Fresh Daily'],
    image: 'images/product-gravies-40.jpg',
    description: 'Freshly cooked authentic gravies made fresh every evening. Tomato Kuruma (₹40), Veg Kuruma / Channa Masala (₹50), Shahi Paneer (₹70).'
  },
  {
    id: 'combos-save-more',
    name: 'Combos (Save More)',
    category: 'combos',
    categoryName: 'Super Saver Dinner Combo',
    badge: 'Save Big ₹99',
    badgeType: 'highlight',
    qtyDesc: '10 Chapatis + Homestyle Gravy',
    price: 99,
    tags: ['Best Value', 'Dinner for 2', 'Complete Dinner Solution'],
    image: 'images/product-combos-99.jpg',
    description: '10 Soft puffy whole wheat chapatis paired with delicious homestyle gravy. Complete dinner for two at great value.'
  },
  {
    id: 'family-packs-value',
    name: 'Family Packs (Great Value)',
    category: 'combos',
    categoryName: 'Mega Family Feast',
    badge: 'Great Value ₹199',
    badgeType: 'highlight',
    qtyDesc: '20 Chapatis + 2 Homestyle Gravies',
    price: 199,
    tags: ['Feeds 4-5', 'Mega Value ₹199', 'Zero Cooking Hassle'],
    image: 'images/product-family-199.jpg',
    description: 'Full family feast pack: 20 soft homestyle chapatis + 2 hearty 250ml gravies. Complete dinner ready in minutes!'
  }
];

// STATE MANAGEMENT
let cart = {};

// LOAD CART FROM LOCAL STORAGE
function loadCart() {
  try {
    const saved = localStorage.getItem('chapati_infinity_cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      const validCart = {};
      for (const [id, item] of Object.entries(parsed)) {
        if (MENU_ITEMS.some(m => m.id === id)) {
          validCart[id] = item;
        }
      }
      cart = validCart;
    }
  } catch (e) {
    cart = {};
  }
}

// SAVE CART TO LOCAL STORAGE
function saveCart() {
  try {
    localStorage.setItem('chapati_infinity_cart', JSON.stringify(cart));
  } catch (e) {}
}

// DOM READY
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderMenuItems('all');
  initFilterButtons();
  initCartDrawer();
  updateCartUI();
  updateLiveShopStatus();
  initDeliveryChecker();
  initMobileNav();
  init3DTextInteraction();

  // Refresh shop status every 60 seconds
  setInterval(updateLiveShopStatus, 60000);
});

// LIVE SHOP STATUS (5:00 PM to 10:00 PM IST)
function updateLiveShopStatus() {
  const statusBadge = document.getElementById('shop-status-display');
  if (!statusBadge) return;

  const now = new Date();
  // Get IST hours
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  const currentHour = istDate.getHours();
  const currentMinutes = istDate.getMinutes();

  // Open between 17:00 (5 PM) and 22:00 (10 PM)
  const isOpen = (currentHour >= 17 && currentHour < 22);

  if (isOpen) {
    statusBadge.innerHTML = `
      <span class="status-dot"></span>
      <span>OPEN NOW • Evening 5:00 PM – 10:00 PM</span>
    `;
  } else {
    statusBadge.innerHTML = `
      <span class="status-dot closed"></span>
      <span>OPENS AT 5:00 PM TODAY • Pre-Orders Accepted!</span>
    `;
  }
}

// RENDER MENU CARDS
function renderMenuItems(category) {
  const grid = document.getElementById('menu-grid-container');
  if (!grid) return;

  const filteredItems = (category === 'all') 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === category);

  grid.innerHTML = filteredItems.map(item => {
    const qtyInCart = cart[item.id]?.qty || 0;
    const hasItem = qtyInCart > 0;

    return `
      <article class="menu-card" data-category="${item.category}" data-id="${item.id}">
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="veg-icon" title="100% Pure Vegetarian">
            <div class="veg-dot"></div>
          </div>
          ${item.badge ? `<span class="badge-tag ${item.badgeType}">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <span class="menu-category-label">${item.categoryName}</span>
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-qty-desc"><i class="fa-solid fa-box-open"></i> ${item.qtyDesc}</p>
          <div class="menu-tags-pill">
            ${item.tags.map(tag => `<span class="pill-item">${tag}</span>`).join('')}
          </div>
          <div class="menu-card-footer">
            <div class="menu-price">
              <span class="price-curr">₹</span>
              <span class="price-val">${item.price}</span>
            </div>
            <div class="item-action-wrap">
              <button 
                class="btn-add-item ${hasItem ? 'style-hidden' : ''}" 
                id="btn-add-${item.id}"
                style="${hasItem ? 'display: none;' : 'display: inline-flex;'}"
                onclick="addToCart('${item.id}')">
                <i class="fa-solid fa-plus"></i> Add
              </button>
              <div 
                class="qty-stepper ${hasItem ? 'active' : ''}" 
                id="stepper-${item.id}"
                style="${hasItem ? 'display: inline-flex;' : 'display: none;'}">
                <button class="btn-step" onclick="changeQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-val" id="qty-disp-${item.id}">${qtyInCart}</span>
                <button class="btn-step" onclick="changeQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// FILTER BUTTONS
function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderMenuItems(cat);
    });
  });
}

// CART MANAGEMENT
function addToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (!cart[itemId]) {
    cart[itemId] = {
      id: item.id,
      name: item.name,
      price: item.price,
      qtyDesc: item.qtyDesc,
      qty: 1
    };
  } else {
    cart[itemId].qty += 1;
  }

  saveCart();
  updateCardStepper(itemId);
  updateCartUI();
}

function changeQty(itemId, delta) {
  if (!cart[itemId]) return;

  cart[itemId].qty += delta;

  if (cart[itemId].qty <= 0) {
    delete cart[itemId];
  }

  saveCart();
  updateCardStepper(itemId);
  updateCartUI();
}

function updateCardStepper(itemId) {
  const addBtn = document.getElementById(`btn-add-${itemId}`);
  const stepper = document.getElementById(`stepper-${itemId}`);
  const qtyDisp = document.getElementById(`qty-disp-${itemId}`);

  const itemQty = cart[itemId]?.qty || 0;

  if (itemQty > 0) {
    if (addBtn) addBtn.style.display = 'none';
    if (stepper) stepper.style.display = 'inline-flex';
    if (qtyDisp) qtyDisp.textContent = itemQty;
  } else {
    if (addBtn) addBtn.style.display = 'inline-flex';
    if (stepper) stepper.style.display = 'none';
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsList = document.getElementById('cart-items-list');
  const subtotalDisp = document.getElementById('cart-subtotal-disp');
  const checkoutBtn = document.getElementById('btn-checkout-wa');

  const itemsArray = Object.values(cart);
  const totalCount = itemsArray.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = itemsArray.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  if (subtotalDisp) {
    subtotalDisp.textContent = `₹${totalAmount}`;
  }

  if (cartItemsList) {
    if (itemsArray.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-message">
          <i class="fa-solid fa-basket-shopping"></i>
          <h4>Your cart is empty</h4>
          <p>Explore our soft ready-to-cook chapatis & homestyle gravies to build your dinner order!</p>
        </div>
      `;
      if (checkoutBtn) {
        checkoutBtn.setAttribute('disabled', 'true');
        checkoutBtn.style.opacity = '0.6';
        checkoutBtn.style.pointerEvents = 'none';
      }
    } else {
      cartItemsList.innerHTML = itemsArray.map(item => `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <small>${item.qtyDesc} • ₹${item.price} each</small>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper active">
              <button class="btn-step" onclick="changeQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-val">${item.qty}</span>
              <button class="btn-step" onclick="changeQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="cart-item-price">₹${item.price * item.qty}</div>
          </div>
        </div>
      `).join('');

      if (checkoutBtn) {
        checkoutBtn.removeAttribute('disabled');
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
      }
    }
  }
}

// CART DRAWER TOGGLE
function initCartDrawer() {
  const openCartBtn = document.getElementById('btn-open-cart');
  const closeCartBtn = document.getElementById('btn-close-cart');
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

  const toggle = (open) => {
    if (open) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openCartBtn) openCartBtn.addEventListener('click', () => toggle(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggle(false));
  if (overlay) overlay.addEventListener('click', () => toggle(false));
}

// ─── TOAST NOTIFICATION ──────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('ci-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ci-toast';
    toast.style.cssText = [
      'position:fixed', 'bottom:90px', 'left:50%', 'transform:translateX(-50%)',
      'background: #1e293b', 'color:#fff', 'padding:0.75rem 1.4rem',
      'border-radius:50px', 'font-size:0.9rem', 'font-weight:600',
      'box-shadow:0 8px 30px rgba(0,0,0,0.35)', 'z-index:99999',
      'transition:opacity 0.4s ease', 'white-space:nowrap',
      'max-width:90vw', 'text-align:center'
    ].join(';');
    document.body.appendChild(toast);
  }
  const colours = { success: '#22c55e', error: '#ef4444', info: '#f59e0b' };
  toast.style.borderLeft = `4px solid ${colours[type] || colours.info}`;
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 3200);
}

// SEND ORDER VIA WHATSAPP (+ save to Firebase Firestore)
async function sendOrderToWhatsApp() {
  const itemsArray = Object.values(cart);
  if (itemsArray.length === 0) {
    showToast('🛒 Please add items to your cart first!', 'error');
    return;
  }

  const customerName    = (document.getElementById('cart-customer-name')?.value    || '').trim();
  const customerPhone   = (document.getElementById('cart-customer-phone')?.value   || '').trim();
  const customerAddress = (document.getElementById('cart-customer-address')?.value || '').trim();

  // ─── Client-side validation ───────────────────────────────────────────────
  if (customerName.length < 2) {
    showToast('✏️ Please enter your name (min 2 characters).', 'error');
    document.getElementById('cart-customer-name')?.focus();
    return;
  }
  if (!/^[6-9]\d{9}$/.test(customerPhone.replace(/\D/g, ''))) {
    showToast('📱 Enter a valid 10-digit Indian mobile number.', 'error');
    document.getElementById('cart-customer-phone')?.focus();
    return;
  }
  if (customerAddress.length < 5) {
    showToast('📍 Please enter your delivery address.', 'error');
    document.getElementById('cart-customer-address')?.focus();
    return;
  }

  const totalAmount = itemsArray.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // ─── Save to Firestore (non-blocking) ────────────────────────────────────
  const checkoutBtn = document.getElementById('btn-checkout-wa');
  if (checkoutBtn) {
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...';
  }

  try {
    if (typeof saveOrderToFirestore === 'function') {
      const docId = await saveOrderToFirestore({
        customerName, customerPhone, customerAddress, items: itemsArray, totalAmount
      });
      if (docId) {
        showToast('✅ Order saved! Connecting to WhatsApp...', 'success');
      }
    }
  } catch (err) {
    // Non-fatal — still proceed to WhatsApp
    console.warn('[CI] Firestore save skipped:', err.message);
  }

  // ─── Build WhatsApp message ───────────────────────────────────────────────
  let message = `*🔔 NEW ORDER - CHAPATI INFINITY*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Customer:* ${customerName}\n`;
  message += `*Phone:* ${customerPhone}\n`;
  message += `*Delivery Address:* ${customerAddress}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `*ORDER ITEMS:*\n`;

  itemsArray.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* (${item.qtyDesc})\n   Qty: ${item.qty} × ₹${item.price} = *₹${item.price * item.qty}*\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL AMOUNT: ₹${totalAmount}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛵 *Shop Hours:* Evening 5:00 PM – 10:00 PM\n`;
  message += `📍 *Madipakkam, Chennai* (5km home delivery)\n`;
  message += `Please confirm my order and share estimated delivery time. Thank you!`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/918807135148?text=${encodedMsg}`;

  // Restore button, clear cart, open WhatsApp
  setTimeout(() => {
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> <span>Order via WhatsApp Now</span>';
    }
    cart = {};
    saveCart();
    renderCart();
    window.open(waUrl, '_blank');
  }, 600);
}

// DIRECT QUICK WHATSAPP INQUIRY
function openQuickWhatsApp(customText = '') {
  const phone = '918807135148';
  const msg = customText || "Hello Chapati Infinity, I would like to order fresh ready-to-cook chapatis and gravies for dinner.";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// 5KM DELIVERY CHECKER
function initDeliveryChecker() {
  const checkBtn = document.getElementById('btn-delivery-check');
  const input = document.getElementById('delivery-area-input');
  const result = document.getElementById('delivery-result-box');

  if (!checkBtn || !input || !result) return;

  const serviceableAreas = [
    'madipakkam', 'keelkattalai', 'kilkattalai', 'kovilambakkam', 
    'ullagaram', 'puzhuthivakkam', 'velachery', 'nanganallur', 
    'adambakkam', 'medavakkam', 'pallikaranai', 'vanuvampet', 
    'moovarasampettai', 'sadasivam nagar', 'kuberan nagar',
    'bavani nagar', 'ram nagar', '600091', '600117', '600042', '600061'
  ];

  const handleCheck = () => {
    const val = input.value.trim().toLowerCase();
    if (!val) {
      result.className = 'checker-result info';
      result.innerHTML = `<i class="fa-solid fa-circle-info"></i> Please enter your locality or pincode (e.g., Madipakkam, 600091).`;
      return;
    }

    const matched = serviceableAreas.some(area => val.includes(area));

    if (matched) {
      result.className = 'checker-result success';
      result.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Awesome!</strong> You are within our 5km delivery zone in ${input.value}. Fast home delivery is available this evening!`;
    } else {
      result.className = 'checker-result info';
      result.innerHTML = `<i class="fa-solid fa-truck"></i> You are near our 5km zone. Please WhatsApp us at <strong>8807135148</strong> to confirm immediate delivery to ${input.value}!`;
    }
  };

  checkBtn.addEventListener('click', handleCheck);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCheck();
  });
}

// MOBILE NAVIGATION TOGGLE
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('cart-overlay');
  const links = document.querySelectorAll('.mobile-nav-links a');

  if (!toggleBtn || !drawer) return;

  const toggle = (open) => {
    if (open) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  toggleBtn.addEventListener('click', () => toggle(true));
  links.forEach(l => l.addEventListener('click', () => toggle(false)));
}

// INTERACTIVE 3D TEXT TILT & ROTATION
function init3DTextInteraction() {
  const container = document.getElementById('stage-3d-interactive');
  const box = document.getElementById('scene-3d-box');
  if (!container || !box) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 20;

    box.style.animation = 'none';
    box.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
  });

  container.addEventListener('mouseleave', () => {
    box.style.transform = '';
    box.style.animation = 'float3DScene 5s ease-in-out infinite alternate';
  });
}

