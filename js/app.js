/**
 * Purple Intimate Lingerie - Interactive Storefront Application Logic
 * Boutique: Shop MF18, The Circle Mall, Kilimani, Nairobi
 * WhatsApp / Phone: +254 794 672 167
 */

// Application State
const state = {
  cart: JSON.parse(localStorage.getItem('pi_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('pi_wishlist')) || [],
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  selectedQuickProduct: null,
  selectedQuickSize: null
};

// WhatsApp Concierge Number (Boutique Official)
const BOUTIQUE_PHONE = '254794672167';
const FREE_SHIPPING_THRESHOLD = 5000; // KSh 5,000 for free delivery in Nairobi

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initCollectionsNav();
  renderBestSellers();
  renderProducts();
  renderReviews();
  renderFAQs();
  updateCartUI();
  updateWishlistUI();
  initEventListeners();
});

// ==========================================================================
// 1. Collections Navigation & Category Filters
// ==========================================================================
function initCollectionsNav() {
  const container = document.getElementById('collectionPillsContainer');
  if (!container) return;

  container.innerHTML = COLLECTIONS.map(col => `
    <button class="collection-pill-btn ${col.id === state.currentCategory ? 'active' : ''}" 
            data-category="${col.id}">
      <span class="pill-icon">${col.icon}</span>
      <span>${col.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.collection-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.collection-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-category');
      renderProducts();
      
      // Smooth scroll to catalog section if not in view
      const catalogEl = document.getElementById('mainCatalogSection');
      if (catalogEl && window.scrollY < catalogEl.offsetTop - 120) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ==========================================================================
// 2. Render Best Sellers Showcase
// ==========================================================================
function renderBestSellers() {
  const container = document.getElementById('bestSellersGrid');
  if (!container) return;

  const bestSellers = PRODUCTS_DATA.filter(p => p.bestSeller).slice(0, 4);

  container.innerHTML = bestSellers.map(product => createProductCardHTML(product, true)).join('');
  attachProductCardEvents(container);
}

// ==========================================================================
// 3. Render Main Product Catalog with Filters & Sort
// ==========================================================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countDisplay = document.getElementById('catalogResultsCount');
  if (!grid) return;

  let filtered = [...PRODUCTS_DATA];

  // Category filter
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.currentCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update counter
  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} intimate piece${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 44px; margin-bottom: 12px; opacity: 0.6;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">No intimate pieces found</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Try searching for something else or explore our other collections.</p>
        <button class="btn-primary" onclick="resetCatalogFilters()">View All Collections</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
  attachProductCardEvents(grid);
}

function resetCatalogFilters() {
  state.currentCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';
  initCollectionsNav();
  renderProducts();
}

// Generate Product Card HTML
function createProductCardHTML(product, isFeatured = false) {
  const isWishlisted = state.wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-box">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge-flag ${product.badge === 'Best Seller' ? 'gold' : ''}">${product.badge}</span>` : ''}
        
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                data-id="${product.id}" 
                aria-label="Save to Wishlist" 
                title="Save to Wishlist">
          ♥
        </button>

        <button class="quick-view-overlay-btn" data-id="${product.id}">
          👁 Quick View
        </button>
      </div>

      <div class="product-info-box">
        <span class="product-cat-label">${product.categoryName}</span>
        <h3 class="product-name-title">${product.name}</h3>
        
        <div class="product-rating-row">
          <span class="stars">★★★★★</span>
          <span class="count">(${product.reviewsCount})</span>
        </div>

        <div class="product-price-row">
          <span class="current-price">KSh ${product.price.toLocaleString()}</span>
          ${product.originalPrice > product.price ? `
            <span class="original-price">KSh ${product.originalPrice.toLocaleString()}</span>
            <span class="save-percent">-${discount}%</span>
          ` : ''}
        </div>

        <div class="product-size-pills">
          ${product.sizes.slice(0, 4).map(s => `<span class="size-pill">${s}</span>`).join('')}
          ${product.sizes.length > 4 ? `<span class="size-pill">+${product.sizes.length - 4} more</span>` : ''}
        </div>

        <div class="product-card-actions">
          <button class="btn-add-bag" data-id="${product.id}">
            <span>Bag</span> +
          </button>
          <button class="btn-quick-wa" data-id="${product.id}" title="Order instantly on WhatsApp" aria-label="Order on WhatsApp">
            💬
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachProductCardEvents(container) {
  // Add to Bag
  container.querySelectorAll('.btn-add-bag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const product = PRODUCTS_DATA.find(p => p.id === id);
      if (product) {
        addToCart(product, product.sizes[0], 1);
        showToast(`✨ ${product.name} added to your bag!`);
        openCartDrawer();
      }
    });
  });

  // Quick WhatsApp Direct Order
  container.querySelectorAll('.btn-quick-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const product = PRODUCTS_DATA.find(p => p.id === id);
      if (product) {
        directOrderWhatsApp(product);
      }
    });
  });

  // Quick View Modal
  container.querySelectorAll('.quick-view-overlay-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openQuickView(id);
    });
  });

  // Wishlist toggle
  container.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleWishlist(id, btn);
    });
  });
}

// ==========================================================================
// 4. Cart Operations & Drawer Management
// ==========================================================================
function addToCart(product, size = null, quantity = 1) {
  const chosenSize = size || product.sizes[0];
  const existingIndex = state.cart.findIndex(item => item.id === product.id && item.size === chosenSize);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
}

function updateCartItemQuantity(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('Item removed from your bag.');
}

function saveCart() {
  localStorage.setItem('pi_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const badges = document.querySelectorAll('.cart-badge-count');
  const itemsContainer = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const totalEl = document.getElementById('cartTotalAmount');
  const freeShippingText = document.getElementById('freeShippingProgressText');
  const freeShippingFill = document.getElementById('freeShippingProgressFill');

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  badges.forEach(b => {
    b.textContent = totalItems;
    b.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  // Sync mobile bottom nav cart badge
  const mobileCartBadge = document.getElementById('mobileBottomCartBadge');
  if (mobileCartBadge) {
    mobileCartBadge.textContent = totalItems;
    mobileCartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  if (subtotalEl) subtotalEl.textContent = `KSh ${subtotal.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `KSh ${subtotal.toLocaleString()}`;

  // Shipping progress calculation
  if (freeShippingText && freeShippingFill) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      freeShippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Same-Day Nairobi Delivery</strong>!`;
      freeShippingFill.style.width = '100%';
    } else {
      const needed = FREE_SHIPPING_THRESHOLD - subtotal;
      const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      freeShippingText.innerHTML = `Add <strong>KSh ${needed.toLocaleString()}</strong> more to enjoy <strong>FREE Nairobi Delivery</strong>`;
      freeShippingFill.style.width = `${pct}%`;
    }
  }

  // Render items list
  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="icon">🛍️</div>
        <h4>Your Intimate Bag is Empty</h4>
        <p>Explore our seductive lace sets, waist trainers, and silky robes to begin.</p>
        <button class="btn-primary" onclick="closeCartDrawer(); resetCatalogFilters();">Explore Collection</button>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cart-item-meta">Size: <strong>${item.size}</strong></div>
        <div class="cart-stepper">
          <button onclick="updateCartItemQuantity(${index}, -1)" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartItemQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-price-remove">
        <span class="cart-item-price">KSh ${(item.price * item.quantity).toLocaleString()}</span>
        <button class="cart-remove-btn" onclick="removeCartItem(${index})" title="Remove item" aria-label="Remove item">🗑️</button>
      </div>
    </div>
  `).join('');
}

function openCartDrawer() {
  document.getElementById('cartDrawerBackdrop')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawerBackdrop')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================================================
// 5. WhatsApp Checkout & Messaging
// ==========================================================================
function checkoutViaWhatsApp() {
  if (state.cart.length === 0) {
    showToast('Your bag is empty! Add an item before checking out.');
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryStatus = subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE Same-Day Nairobi Delivery' : 'Standard Delivery';

  let msg = `✨ *NEW ORDER - PURPLE INTIMATE LINGERIE*\n`;
  msg += `📍 *Shop MF18, The Circle Mall, Kilimani, Nairobi*\n`;
  msg += `----------------------------------------\n`;

  state.cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   • Size: ${item.size}\n`;
    msg += `   • Qty: ${item.quantity}\n`;
    msg += `   • Price: KSh ${(item.price * item.quantity).toLocaleString()}\n\n`;
  });

  msg += `----------------------------------------\n`;
  msg += `💰 *TOTAL AMOUNT:* KSh ${subtotal.toLocaleString()}\n`;
  msg += `🚚 *Delivery Option:* ${deliveryStatus} (100% Discreet Unmarked Packaging)\n`;
  msg += `🔄 *Return Policy:* 24-Hour Exchange Guarantee\n\n`;
  msg += `👤 *My Delivery Location in Nairobi/Kenya:*\n`;
  msg += `[Please specify your location/estate]\n\n`;
  msg += `Kindly confirm availability and payment instructions. Thank you!`;

  const waUrl = `https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function directOrderWhatsApp(product, chosenSize = null) {
  const size = chosenSize || product.sizes[0];
  let msg = `✨ *PURPLE INTIMATE LINGERIE - DIRECT ORDER INQUIRY*\n`;
  msg += `----------------------------------------\n`;
  msg += `Item: *${product.name}*\n`;
  msg += `Category: ${product.categoryName}\n`;
  msg += `Size: ${size}\n`;
  msg += `Price: KSh ${product.price.toLocaleString()}\n`;
  msg += `----------------------------------------\n`;
  msg += `Hi! I would like to order this item with Same-Day Delivery in Nairobi. Are you in stock at The Circle Mall boutique?`;

  const waUrl = `https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// 6. WhatsApp Interactive Chatbot Popup Widget
// ==========================================================================
function toggleWhatsAppChatbot() {
  const windowEl = document.getElementById('waChatbotWindow');
  if (windowEl) {
    windowEl.classList.toggle('open');
  }
}

function closeWhatsAppChatbot() {
  document.getElementById('waChatbotWindow')?.classList.remove('open');
}

function handleWhatsAppQuickPrompt(promptType) {
  let msg = '';
  switch (promptType) {
    case 'size':
      msg = `Hi Purple Intimate! 📏 I need assistance finding my correct size for your lingerie/shapewear collection.`;
      break;
    case 'delivery':
      msg = `Hello! ⚡ I'd like to check Same-Day Delivery coverage and fees for my location in Nairobi.`;
      break;
    case 'track':
      msg = `Hello! 📦 I would like to track my order from Purple Intimate Lingerie.`;
      break;
    case 'stylist':
    default:
      msg = `Hi! 💬 I'd love to chat with a stylist at your Kilimani boutique about new arrivals and recommendations.`;
      break;
  }

  const url = `https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ==========================================================================
// 6b. Mobile Navigation Drawer
// ==========================================================================
function openMobileNav() {
  document.getElementById('mobileNavBackdrop')?.classList.add('open');
  document.getElementById('mobileNavDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobileNavBackdrop')?.classList.remove('open');
  document.getElementById('mobileNavDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function sendCustomChatMessage() {
  const input = document.getElementById('waChatCustomInput');
  if (!input || input.value.trim() === '') return;

  const msg = `✨ *INQUIRY - PURPLE INTIMATE LINGERIE*\n${input.value.trim()}`;
  const url = `https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  input.value = '';
}

// ==========================================================================
// 7. Wishlist System
// ==========================================================================
function toggleWishlist(productId, btnElement) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    btnElement?.classList.remove('active');
    showToast('Item removed from your wishlist.');
  } else {
    state.wishlist.push(productId);
    btnElement?.classList.add('active');
    showToast('♥ Added to your wishlist!');
  }

  localStorage.setItem('pi_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadgeCount');
  if (badge) {
    badge.textContent = state.wishlist.length;
    badge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  }

  // Sync mobile bottom nav wishlist badge
  const mobileBadge = document.getElementById('mobileBottomWishlistBadge');
  if (mobileBadge) {
    mobileBadge.textContent = state.wishlist.length;
    mobileBadge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  }
}

// ==========================================================================
// 8. Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  state.selectedQuickProduct = product;
  state.selectedQuickSize = product.sizes[0];

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewContent');
  if (!modal || !body) return;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  body.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-image-frame">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="quickview-details">
        <span class="product-cat-label">${product.categoryName}</span>
        <h2>${product.name}</h2>
        
        <div class="product-rating-row" style="margin-bottom: 14px;">
          <span class="stars">★★★★★</span>
          <span class="count">${product.rating} (${product.reviewsCount} verified reviews)</span>
        </div>

        <div class="product-price-row">
          <span class="current-price" style="font-size: 26px;">KSh ${product.price.toLocaleString()}</span>
          ${product.originalPrice > product.price ? `
            <span class="original-price" style="font-size: 16px;">KSh ${product.originalPrice.toLocaleString()}</span>
            <span class="save-percent">-${discount}% OFF</span>
          ` : ''}
        </div>

        <p class="desc">${product.description}</p>

        <div class="quickview-size-selector">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label>Select Your Size:</label>
            <button onclick="openModal('sizeGuideModal')" style="font-size: 11px; color: var(--gold-primary); text-decoration: underline;">
              📏 Size Guide
            </button>
          </div>
          <div class="size-select-options">
            ${product.sizes.map((s, idx) => `
              <button class="size-option-pill ${idx === 0 ? 'selected' : ''}" onclick="selectQuickViewSize(this, '${s}')">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <ul style="color: var(--text-secondary); font-size: 13px; line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
          ${product.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <button class="btn-primary" onclick="addQuickViewToBag()">
            Add to Bag
          </button>
          <button class="btn-checkout-wa" onclick="directOrderWhatsApp(state.selectedQuickProduct, state.selectedQuickSize)">
            Order on WhatsApp
          </button>
        </div>

        <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; gap: 16px; font-size: 11px; color: var(--text-muted);">
          <span>⚡ Same-Day Nairobi Delivery</span>
          <span>🔄 24-Hr Return Guarantee</span>
          <span>🔒 100% Discreet Box</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectQuickViewSize(btn, size) {
  document.querySelectorAll('.size-option-pill').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.selectedQuickSize = size;
}

function addQuickViewToBag() {
  if (state.selectedQuickProduct && state.selectedQuickSize) {
    addToCart(state.selectedQuickProduct, state.selectedQuickSize, 1);
    closeModal('quickViewModal');
    showToast(`✨ Added ${state.selectedQuickProduct.name} (${state.selectedQuickSize}) to bag!`);
    openCartDrawer();
  }
}

function filterByCollection(colId) {
  state.currentCategory = colId;
  const container = document.getElementById('collectionPillsContainer');
  if (container) {
    container.querySelectorAll('.collection-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-category') === colId) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        btn.classList.remove('active');
      }
    });
  }
  renderProducts();
  const catalogEl = document.getElementById('mainCatalogSection');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderWishlistModal() {
  const content = document.getElementById('wishlistModalContent');
  if (!content) return;

  if (state.wishlist.length === 0) {
    content.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 40px; margin-bottom: 12px; opacity: 0.5;">♥</div>
        <h4 style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Your Wishlist is Empty</h4>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Tap the heart icon on any piece you adore to save it here.</p>
        <button class="btn-primary" onclick="closeModal('wishlistModal'); resetCatalogFilters();">Browse Collections</button>
      </div>
    `;
    return;
  }

  const wishlistedProducts = PRODUCTS_DATA.filter(p => state.wishlist.includes(p.id));
  content.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px; max-height: 60vh; overflow-y: auto;">
      ${wishlistedProducts.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #fbf9fd; border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${p.image}" alt="${p.name}" style="width: 54px; height: 54px; object-fit: cover; border-radius: var(--radius-sm);">
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${p.name}</h4>
              <p style="font-size: 13px; font-weight: 700; color: var(--gold-primary);">KSh ${p.price.toLocaleString()}</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-primary" style="padding: 8px 14px; font-size: 11px;" onclick="addToCart(PRODUCTS_DATA.find(x => x.id === '${p.id}')); closeModal('wishlistModal'); openCartDrawer();">
              Add to Bag
            </button>
            <button onclick="toggleWishlist('${p.id}'); renderWishlistModal();" style="color: var(--sale-red); font-size: 16px; padding: 6px;" title="Remove from Wishlist">
              ✕
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================================================
// 9. Modals (Generic Open / Close)
// ==========================================================================
function openModal(modalId) {
  if (modalId === 'wishlistModal') {
    renderWishlistModal();
  }
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modals when clicking outside content box
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ==========================================================================
// 10. Reviews & FAQs Rendering
// ==========================================================================
function renderReviews() {
  const grid = document.getElementById('customerReviewsGrid');
  if (!grid) return;

  grid.innerHTML = REVIEWS_DATA.map(r => `
    <div class="review-card">
      <div>
        <div class="review-stars">★★★★★</div>
        <h4 class="review-title">"${r.title}"</h4>
        <p class="review-text">${r.text}</p>
      </div>
      <div class="review-author-row">
        <div class="author-avatar">${r.name.charAt(0)}</div>
        <div class="author-info">
          <h4>${r.name} <span class="verified-badge-icon" title="Verified Buyer">✓</span></h4>
          <p>${r.location} • ${r.productName}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFAQs() {
  const container = document.getElementById('faqsAccordion');
  if (!container) return;

  container.innerHTML = FAQS_DATA.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question-btn" onclick="toggleFAQ(this)">
        <span>${faq.q}</span>
        <span class="faq-icon-arrow">▼</span>
      </button>
      <div class="faq-answer-pane">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(button) {
  const item = button.closest('.faq-item');
  const wasActive = item.classList.contains('active');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

  if (!wasActive) {
    item.classList.add('active');
  }
}

// ==========================================================================
// 11. Toast Notice System
// ==========================================================================
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('globalToast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================================================
// 12. Simulated M-Pesa Direct Checkout
// ==========================================================================
function initiateMpesaCheckout() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotal === 0) {
    showToast('Your bag is empty!');
    return;
  }

  const phonePrompt = prompt("Enter your Safaricom M-Pesa phone number (e.g., 0712345678):", "07");
  if (!phonePrompt || phonePrompt.trim().length < 10) {
    alert("Please enter a valid Kenyan Safaricom phone number.");
    return;
  }

  alert(`📲 STK Push simulated for KSh ${subtotal.toLocaleString()} to ${phonePrompt}.\n\nAn M-Pesa prompt will appear on your phone to complete payment. Our Kilimani dispatch rider will deliver your discreet parcel today!`);
  state.cart = [];
  saveCart();
  updateCartUI();
  closeCartDrawer();
  showToast('🎉 Order placed successfully! We will contact you shortly.');
}

// ==========================================================================
// 13. Event Listeners & Search Bar
// ==========================================================================
function initEventListeners() {
  // Search input
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('catalogSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer triggers
  document.querySelectorAll('.cart-drawer-trigger').forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  document.getElementById('closeCartDrawerBtn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerBackdrop')?.addEventListener('click', closeCartDrawer);

  // WhatsApp Launcher trigger
  document.getElementById('waChatbotLauncher')?.addEventListener('click', toggleWhatsAppChatbot);
  document.getElementById('waCloseChatBtn')?.addEventListener('click', closeWhatsAppChatbot);

  // Esc key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeWhatsAppChatbot();
      closeMobileNav();
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  // Mobile hamburger menu toggle
  document.getElementById('mobileMenuToggle')?.addEventListener('click', openMobileNav);
  document.getElementById('mobileNavClose')?.addEventListener('click', closeMobileNav);
  document.getElementById('mobileNavBackdrop')?.addEventListener('click', closeMobileNav);
}
