/**
 * CHAPATI INFINITY - JAVASCRIPT APP
 * High-performance, reactive menu & WhatsApp ordering system
 */

// MENU DATABASE - CHAPATI VARIETIES & HOMESTYLE GRAVIES
const MENU_ITEMS = [
  // ─── CHAPATI VARIETIES ───────────────────────────────────────
  {
    id: 'chapati-10pcs',
    name: 'Chapati (10 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: '₹70 Special',
    badgeType: 'highlight',
    qtyDesc: 'Pack of 10 pcs',
    price: 70,
    tags: ['10 Pcs', '100% Whole Wheat', 'Soft & Puffy', 'Zero Maida'],
    image: 'images/chapati-10pcs.jpg',
    description: 'Freshly prepared soft & puffy homestyle whole wheat chapatis. 10 Pcs pack for only ₹70. Ready to puff up on your tawa in just 2 minutes.'
  },
  {
    id: 'poori-10pcs',
    name: 'Poori (10 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: '₹55 • Popular',
    badgeType: 'highlight',
    qtyDesc: 'Pack of 10 pcs',
    price: 55,
    tags: ['10 Pcs', 'Ready to Fry', 'Golden & Crispy', 'Homestyle'],
    image: 'images/poori-10pcs.jpg',
    description: 'Ready-to-fry fresh rolled pooris. Fluffs up golden, crisp, and balloon-puffy in hot oil in seconds.'
  },
  {
    id: 'ragi-chapati-8pcs',
    name: 'Ragi Chapati (8 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: 'High Calcium & Iron',
    badgeType: 'health',
    qtyDesc: 'Pack of 8 pcs',
    price: 80,
    tags: ['8 Pcs', 'Finger Millet', 'Diabetic Friendly', 'High Fiber'],
    image: 'images/ragi-chapati.jpg',
    description: 'Nutrient-dense Ragi (Finger Millet) chapatis. Rich in calcium, fiber, and slow-release energy for a healthy dinner.'
  },
  {
    id: 'multigrain-chapati-8pcs',
    name: 'Multigrain Chapati (8 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: 'High Protein & Fiber',
    badgeType: 'health',
    qtyDesc: 'Pack of 8 pcs',
    price: 80,
    tags: ['8 Pcs', 'Multi-Grain Flour', 'High Protein', 'Rich Fiber'],
    image: 'images/multigrain-chapati.jpg',
    description: 'Wholesome multigrain blend of wheat, oats, ragi, barley, and soya. Excellent fiber & plant protein for clean nutrition.'
  },
  {
    id: 'millet-chapati-5pcs',
    name: 'Millet Chapati (5 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: 'Low GI & Light',
    badgeType: 'health',
    qtyDesc: 'Pack of 5 pcs',
    price: 50,
    tags: ['5 Pcs', 'Ancient Millets', 'Low Glycemic', 'Easy Digest'],
    image: 'images/millet-chapati.jpg',
    description: 'Wholesome indigenous millet chapatis. Keeps blood sugar stable, gluten-light, and offers light, easy digestion.'
  },
  {
    id: 'beetroot-chapati-5pcs',
    name: 'Beetroot Chapati (5 Pcs)',
    category: 'chapatis',
    categoryName: 'Chapati Varieties',
    badge: 'Real Beet Puree',
    badgeType: 'highlight',
    qtyDesc: 'Pack of 5 pcs',
    price: 50,
    tags: ['5 Pcs', 'Real Beet Puree', 'Vibrant Pink', 'Antioxidant Rich'],
    image: 'images/beetroot-chapati.jpg',
    description: 'Naturally vibrant pink chapatis kneaded with 100% fresh beetroot puree. Delicious, healthy, and loved by kids.'
  },

  // ─── GRAVY VARIETIES (250 ML) ────────────────────────────────
  {
    id: 'paneer-gravy-250ml',
    name: 'Paneer Gravy (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Rich & Creamy',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 70,
    tags: ['250 ml', 'Fresh Paneer', 'Rich & Creamy', 'High Protein'],
    image: 'images/paneer-gravy.jpg',
    description: 'Rich, mildly spiced cottage cheese gravy cooked in creamy tomato cashew gravy. Perfect companion for soft chapatis.'
  },
  {
    id: 'channa-masala-250ml',
    name: 'Channa Masala (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Customer Favorite',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 50,
    tags: ['250 ml', 'Tender Chickpeas', 'Aromatic Spices', 'High Fiber'],
    image: 'images/channa-kuruma.jpg',
    description: 'Tender white chickpeas simmered in an authentic onion-tomato spice blend. Classic pairing with chapatis and pooris.'
  },
  {
    id: 'veg-kuruma-250ml',
    name: 'Veg Kuruma (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'South Indian Special',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 50,
    tags: ['250 ml', 'Mixed Vegetables', 'Coconut Gravy', 'Mild & Fragrant'],
    image: 'images/veg-kuruma.jpg',
    description: 'Traditional South Indian style vegetable kurma made with carrots, peas, and potatoes in a fragrant coconut gravy.'
  },
  {
    id: 'mealmaker-gravy-250ml',
    name: 'Mealmaker Gravy (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Protein Packed',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 50,
    tags: ['250 ml', 'Juicy Soya Chunks', 'Spicy Masala', 'Plant Protein'],
    image: 'images/mealmaker-gravy.jpg',
    description: 'Juicy, tender soya mealmaker chunks simmered in a spicy, homestyle Chettinad/Madras masala gravy.'
  },
  {
    id: 'tomato-kuruma-250ml',
    name: 'Tomato Kuruma (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Pocket Friendly ₹40',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 40,
    tags: ['250 ml', 'Tangy & Spicy', 'Thakkali Kuruma', 'Best with Poori'],
    image: 'images/tomato-kuruma.jpg',
    description: 'Tangy, homestyle thakkali kurma made with ripe tomatoes, tempered spices, and roasted coconut paste.'
  },
  {
    id: 'mushroom-gravy-250ml',
    name: 'Mushroom Gravy (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Gourmet Special',
    badgeType: 'highlight',
    qtyDesc: '250 ml Bowl',
    price: 70,
    tags: ['250 ml', 'Fresh Button Mushrooms', 'Rich Masala', 'Savory Taste'],
    image: 'images/mushroom-gravy.jpg',
    description: 'Fresh, succulent button mushrooms simmered in a savory roasted pepper and onion-tomato masala gravy.'
  },
  {
    id: 'pachapayaru-gravy-250ml',
    name: 'Pachapayaru Gravy (250 ml)',
    category: 'gravies',
    categoryName: 'Gravy Varieties (250 ml)',
    badge: 'Homestyle Comfort',
    badgeType: 'health',
    qtyDesc: '250 ml Bowl',
    price: 50,
    tags: ['250 ml', 'Whole Green Gram', 'Nutritious & Light', 'Traditional Taste'],
    image: 'images/pachapayaru-gravy.jpg',
    description: 'Wholesome green gram (pachapayaru) cooked slowly with cumin, garlic, and homestyle spices. Light and comforting.'
  },

  // ─── COMBOS & VALUE PACKS ────────────────────────────────────
  {
    id: 'combos-save-more',
    name: 'Dinner Combo (10 Chapatis + Gravy)',
    category: 'combos',
    categoryName: 'Super Saver Dinner Combo',
    badge: 'Save Big ₹99',
    badgeType: 'highlight',
    qtyDesc: '10 Chapatis + 250ml Gravy',
    price: 99,
    tags: ['Best Value', 'Dinner for 2', 'Complete Dinner Solution'],
    image: 'images/product-combos-99.jpg',
    description: '10 Soft puffy whole wheat chapatis paired with delicious homestyle gravy of your choice. Complete dinner for two.'
  },
  {
    id: 'family-packs-value',
    name: 'Family Feast (20 Chapatis + 2 Gravies)',
    category: 'combos',
    categoryName: 'Mega Family Feast',
    badge: 'Great Value ₹199',
    badgeType: 'highlight',
    qtyDesc: '20 Chapatis + 2 × 250ml Gravies',
    price: 199,
    tags: ['Feeds 4-5', 'Mega Value', 'Zero Cooking Hassle'],
    image: 'images/product-family-199.jpg',
    description: 'Full family feast pack: 20 soft homestyle chapatis + two hearty 250ml homestyle gravies. Complete dinner ready in minutes!'
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
  initHeroSlider();

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

// HERO SHOWCASE SLIDER & ANNOUNCEMENT CAROUSEL (INFINITE LOOP MODE)
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  const track = document.getElementById('hero-slider-track');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const playPauseBtn = document.getElementById('slider-playpause-btn');
  const paginationContainer = document.getElementById('slider-pagination');
  const counterSpan = document.getElementById('current-slide-num');
  const tabButtons = document.querySelectorAll('.hero-tab-btn');
  const bgTrack = document.getElementById('hero-bg-track');
  const heroSection = document.querySelector('.hero-section');
  const interactionTarget = heroSection || slider;

  if (!slider || !track) return;

  const originalSlides = Array.from(track.querySelectorAll('.hero-slide'));
  const totalSlides = originalSlides.length;
  if (totalSlides === 0) return;

  const originalBgSlides = bgTrack ? Array.from(bgTrack.querySelectorAll('.hero-bg-slide')) : [];

  // Setup Clones for Seamless Infinite Looping
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
  firstClone.classList.add('slide-clone');
  lastClone.classList.add('slide-clone');
  firstClone.removeAttribute('id');
  lastClone.removeAttribute('id');
  firstClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  lastClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalSlides[0]);

  // Clone Background Track Slides as well
  if (bgTrack && originalBgSlides.length === totalSlides) {
    const bgFirstClone = originalBgSlides[0].cloneNode(true);
    const bgLastClone = originalBgSlides[totalSlides - 1].cloneNode(true);
    bgFirstClone.classList.add('slide-clone');
    bgLastClone.classList.add('slide-clone');
    bgFirstClone.removeAttribute('id');
    bgLastClone.removeAttribute('id');
    bgFirstClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    bgLastClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

    bgTrack.appendChild(bgFirstClone);
    bgTrack.insertBefore(bgLastClone, originalBgSlides[0]);
  }

  const allSlides = track.querySelectorAll('.hero-slide');
  const allBgSlides = bgTrack ? bgTrack.querySelectorAll('.hero-bg-slide') : [];

  // Pos 1 corresponds to Real Slide 0 (since Pos 0 is the clone of last slide)
  let currentPos = 1;
  let isAnimating = false;
  let isPlaying = true;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds

  const CARD_TRANSITION = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
  const BG_TRANSITION = 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';

  // Initial positioning at Real Slide 0
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentPos * 100}%)`;
  if (bgTrack) {
    bgTrack.style.transition = 'none';
    bgTrack.style.transform = `translateX(-${currentPos * 100}%)`;
  }
  void track.offsetWidth; // Force layout recalculation

  // Build Pagination Dots for Real Slides
  if (paginationContainer) {
    paginationContainer.innerHTML = '';
  }

  function getLogicalIndex(pos) {
    if (pos === 0) return totalSlides - 1;
    if (pos === totalSlides + 1) return 0;
    return pos - 1;
  }

  function updateActiveStates(pos) {
    const logicalIndex = getLogicalIndex(pos);

    // Update Tabs
    tabButtons.forEach((tab, i) => {
      const isActive = i === logicalIndex;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Dots
    if (paginationContainer) {
      const dots = paginationContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === logicalIndex);
      });
    }

    // Update Counter
    if (counterSpan) {
      counterSpan.textContent = String(logicalIndex + 1).padStart(2, '0');
    }

    if (heroSection) {
      const isArtworkSlide = originalBgSlides[logicalIndex]?.classList.contains('promo-artwork-slide') ?? false;
      heroSection.classList.toggle('hero-artwork-active', isArtworkSlide);
    }

    // Update Slide active class on current position
    allSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === pos);
    });

    if (allBgSlides.length > 0) {
      allBgSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === pos);
      });
    }
  }

  // Initial state activation
  updateActiveStates(currentPos);

  function moveToPosition(pos, animated = true) {
    currentPos = pos;
    if (animated) {
      isAnimating = true;
      track.style.transition = CARD_TRANSITION;
      if (bgTrack) bgTrack.style.transition = BG_TRANSITION;
    } else {
      track.style.transition = 'none';
      if (bgTrack) bgTrack.style.transition = 'none';
    }

    track.style.transform = `translateX(-${currentPos * 100}%)`;
    if (bgTrack) {
      bgTrack.style.transform = `translateX(-${currentPos * 100}%)`;
    }

    updateActiveStates(currentPos);
  }

  // The background track is visible; the card track is hidden for synchronization.
  const transitionTrack = bgTrack || track;

  // Seamless Infinite Loop Snap
  transitionTrack.addEventListener('transitionend', (e) => {
    if (e.target !== transitionTrack) return;
    isAnimating = false;

    // Passed last slide -> instantly snap to real first slide
    if (currentPos >= totalSlides + 1) {
      currentPos = 1;
      moveToPosition(currentPos, false);
      void transitionTrack.offsetWidth;
    }
    // Passed first slide backwards -> instantly snap to real last slide
    else if (currentPos <= 0) {
      currentPos = totalSlides;
      moveToPosition(currentPos, false);
      void transitionTrack.offsetWidth;
    }
  });

  function nextSlide() {
    if (isAnimating) return;
    moveToPosition(currentPos + 1, true);
  }

  function prevSlide() {
    if (isAnimating) return;
    moveToPosition(currentPos - 1, true);
  }

  function goToLogicalSlide(index) {
    if (!Number.isInteger(index) || index < 0 || index >= totalSlides) return;
    if (index === getLogicalIndex(currentPos)) return;
    if (isAnimating) {
      track.style.transition = 'none';
      if (bgTrack) bgTrack.style.transition = 'none';
      void transitionTrack.offsetWidth;
      isAnimating = false;
    }
    moveToPosition(index + 1, true);
  }

  // Next & Prev Buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  // Quick Tab Buttons Click
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndex = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        goToLogicalSlide(targetIndex);
        restartAutoplay();
      }
    });
  });

  // Autoplay Loop Logic
  function startAutoplay() {
    stopAutoplay();
    if (!isPlaying) return;
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    if (isPlaying) {
      startAutoplay();
    }
  }

  // Pause on hover while the visible carousel is under the pointer.
  interactionTarget.addEventListener('mouseenter', () => {
    stopAutoplay();
    const activeDot = paginationContainer?.querySelector('.slider-dot.active');
    if (activeDot) activeDot.classList.add('paused');
  });

  interactionTarget.addEventListener('mouseleave', () => {
    const activeDot = paginationContainer?.querySelector('.slider-dot.active');
    if (activeDot) activeDot.classList.remove('paused');
    restartAutoplay();
  });

  // Play/Pause Button Toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
        playPauseBtn.title = 'Pause Slideshow';
        startAutoplay();
      } else {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playPauseBtn.setAttribute('aria-label', 'Play slideshow');
        playPauseBtn.title = 'Play Slideshow';
        stopAutoplay();
      }
    });
  }

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchEndX = 0;

  interactionTarget.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  interactionTarget.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    const threshold = 45; // Minimum drag distance
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      restartAutoplay();
    }
  }

  // Keyboard navigation
  interactionTarget.setAttribute('tabindex', '0');
  interactionTarget.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      restartAutoplay();
    }
  });

  // Start continuous infinite autoplay loop
  startAutoplay();
}
