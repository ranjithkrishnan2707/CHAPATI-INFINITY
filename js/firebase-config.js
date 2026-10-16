/**
 * CHAPATI INFINITY - FIREBASE BACKEND CONFIG
 * ============================================
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project → "chapati-infinity"
 * 3. Enable Firestore Database (Start in Production Mode)
 * 4. Go to Project Settings → Your Apps → Add Web App
 * 5. Copy the config object below and replace the placeholder values
 * 6. Set Firestore Security Rules (see rules below)
 *
 * FIRESTORE SECURITY RULES (paste in Firebase Console → Firestore → Rules):
 * -----------------------------------------------------------------------
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Orders: anyone can create, only admins can read
 *     match /orders/{orderId} {
 *       allow create: if request.resource.data.keys().hasAll([
 *         'customerName', 'customerPhone', 'customerAddress', 'items', 'totalAmount', 'timestamp', 'status'
 *       ])
 *         && request.resource.data.customerName is string
 *         && request.resource.data.customerName.size() >= 2
 *         && request.resource.data.customerName.size() <= 100
 *         && request.resource.data.customerPhone is string
 *         && request.resource.data.customerPhone.matches('^[6-9][0-9]{9}$')
 *         && request.resource.data.totalAmount is number
 *         && request.resource.data.totalAmount > 0
 *         && request.resource.data.totalAmount < 10000
 *         && request.resource.data.items.size() > 0
 *         && request.resource.data.items.size() <= 20;
 *       allow read, update, delete: if false; // Admin reads via Firebase Admin SDK
 *     }
 *   }
 * }
 * -----------------------------------------------------------------------
 */

// ⚠️  REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBi-wPp-MHX4L-dh-dlnh73OXLnLEpSHYY",
  authDomain: "chapati-infinity-41ce4.firebaseapp.com",
  projectId: "chapati-infinity-41ce4",
  storageBucket: "chapati-infinity-41ce4.firebasestorage.app",
  messagingSenderId: "252184468980",
  appId: "1:252184468980:web:410f4bfb6edec3bd3d2da1",
  measurementId: "G-3HWQCFY5DP"
};

// ─── Firebase SDK loader (modular v10 via CDN) ────────────────────────────────
let db = null;           // Firestore instance
let firebaseReady = false;

async function initFirebase() {
  try {
    // Dynamic import of Firebase Modular SDK (v10)
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const { getFirestore, collection, addDoc, serverTimestamp } =
      await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

    // Don't initialise with placeholder values
    if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
      console.warn("[Chapati Infinity] Firebase not configured. Orders will only be sent via WhatsApp.");
      return;
    }

    const app = initializeApp(FIREBASE_CONFIG);
    db = getFirestore(app);
    firebaseReady = true;

    // Expose helpers on window for use in app.js
    window._fbAddDoc = addDoc;
    window._fbCollection = collection;
    window._fbServerTimestamp = serverTimestamp;

    console.info("[Chapati Infinity] Firebase Firestore ready ✓");
  } catch (err) {
    console.error("[Chapati Infinity] Firebase init error:", err);
  }
}

/**
 * saveOrderToFirestore
 * Saves a validated order to Firestore.
 * Returns the new document ID on success, or null on failure.
 *
 * @param {Object} orderData  - { customerName, customerPhone, customerAddress, items[], totalAmount }
 * @returns {Promise<string|null>}
 */
async function saveOrderToFirestore(orderData) {
  if (!firebaseReady || !db) return null;

  // ─── Input Sanitisation ───────────────────────────────────────────────────
  const sanitise = (str, maxLen = 200) =>
    String(str || '').replace(/[<>"'`]/g, '').trim().substring(0, maxLen);

  const name = sanitise(orderData.customerName, 100);
  const phone = String(orderData.customerPhone || '').replace(/\D/g, '').substring(0, 10);
  const address = sanitise(orderData.customerAddress, 300);
  const total = Number(orderData.totalAmount);

  // ─── Validation ───────────────────────────────────────────────────────────
  if (name.length < 2) throw new Error("Name must be at least 2 characters.");
  if (!/^[6-9]\d{9}$/.test(phone)) throw new Error("Enter a valid 10-digit Indian mobile number.");
  if (!Array.isArray(orderData.items) || orderData.items.length === 0) throw new Error("Cart is empty.");
  if (total <= 0 || total > 9999) throw new Error("Invalid order total.");

  // ─── Sanitise items array ─────────────────────────────────────────────────
  const items = orderData.items.map(item => ({
    id: sanitise(item.id, 50),
    name: sanitise(item.name, 100),
    qty: Math.max(1, Math.min(99, Number(item.qty) || 1)),
    price: Math.max(0, Math.min(9999, Number(item.price) || 0)),
    qtyDesc: sanitise(item.qtyDesc, 80)
  }));

  // ─── Write to Firestore ───────────────────────────────────────────────────
  try {
    const docRef = await window._fbAddDoc(
      window._fbCollection(db, "orders"),
      {
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        items,
        totalAmount: total,
        status: "pending_whatsapp",
        source: "website_cart",
        timestamp: window._fbServerTimestamp(),
        // Rate-limit helper — client IP handled server-side
        userAgent: navigator.userAgent.substring(0, 200)
      }
    );
    console.info("[Chapati Infinity] Order saved → ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("[Chapati Infinity] Firestore write failed:", err);
    return null;
  }
}

// Auto-initialise when the script loads
initFirebase();
