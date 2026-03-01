// =====================
// Cart Page Logic
// Render cart, update quantities, calculate totals
// =====================

class CartPage {
  constructor() {
    this.cart = [];
    this.cartItemsContainer = document.querySelector('#cart-items');
    this.emptyCartMessage = document.querySelector('#empty-cart');
    this.cartSummary = document.querySelector('#cart-summary');
    this.subtotalEl = document.querySelector('#subtotal');
    this.shippingEl = document.querySelector('#shipping');
    this.totalEl = document.querySelector('#total');
    this.checkoutBtn = document.querySelector('#checkout-btn');
    this.clearCartBtn = document.querySelector('#clear-cart-btn');
    
    this.SHIPPING_COST = 250; // PKR
    this.FREE_SHIPPING_THRESHOLD = 5000; // PKR
    
    this.init();
  }

  init() {
    this.loadCart();
    this.attachEventListeners();
  }

  loadCart() {
    this.cart = CartStore.getCart();
    this.renderCart();
    this.updateSummary();
  }

  renderCart() {
    if (!this.cartItemsContainer) return;

    // Show/hide empty cart message
    if (this.cart.length === 0) {
      if (this.emptyCartMessage) this.emptyCartMessage.classList.remove('hidden');
      if (this.cartSummary) this.cartSummary.classList.add('hidden');
      if (this.cartItemsContainer) this.cartItemsContainer.innerHTML = '';
      return;
    }

    if (this.emptyCartMessage) this.emptyCartMessage.classList.add('hidden');
    if (this.cartSummary) this.cartSummary.classList.remove('hidden');

    // Render cart items
    const itemsHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
    this.cartItemsContainer.innerHTML = `
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
      </div>
    `;
  }

  createCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;
    return `
      <tr data-id="${item.id}">
        <td>
          <div style="display: flex; align-items: center; gap: 16px;">
            <img src="${item.image}" alt="${item.title}" 
                 style="width: 64px; height: 64px; object-fit: cover; border-radius: 12px; border: 1px solid var(--line);">
            <div>
              <strong>${item.title}</strong>
              <div class="muted" style="font-size: 0.875rem;">${item.author}</div>
            </div>
          </div>
        </td>
        <td><strong>${UI.formatPrice(item.price)}</strong></td>
        <td>
          <div class="qty">
            <button type="button" class="decrease-qty" data-id="${item.id}">−</button>
            <strong>${item.quantity}</strong>
            <button type="button" class="increase-qty" data-id="${item.id}">+</button>
          </div>
        </td>
        <td><strong style="color: var(--brand-light);">${UI.formatPrice(itemTotal)}</strong></td>
        <td>
          <button class="btn small danger remove-item" data-id="${item.id}">Remove</button>
        </td>
      </tr>
    `;
  }

  attachEventListeners() {
    // Event delegation for cart actions
    if (this.cartItemsContainer) {
      this.cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const productId = parseInt(target.dataset.id);

        if (target.classList.contains('increase-qty')) {
          this.updateQuantity(productId, 1);
        } else if (target.classList.contains('decrease-qty')) {
          this.updateQuantity(productId, -1);
        } else if (target.classList.contains('remove-item')) {
          this.removeItem(productId);
        }
      });
    }

    // Checkout button
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }

    // Clear cart button
    if (this.clearCartBtn) {
      this.clearCartBtn.addEventListener('click', () => {
        if (UI.confirm('Are you sure you want to clear your cart?')) {
          CartStore.clearCart();
          this.loadCart();
          UI.showToast('Cart cleared', 'success');
        }
      });
    }
  }

  updateQuantity(productId, change) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      this.removeItem(productId);
    } else if (newQuantity <= 10) {
      CartStore.updateQuantity(productId, newQuantity);
      this.loadCart();
    }
  }

  removeItem(productId) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    if (UI.confirm(`Remove "${item.title}" from cart?`)) {
      CartStore.removeItem(productId);
      this.loadCart();
      UI.showToast('Item removed from cart', 'success');
    }
  }

  updateSummary() {
    if (!this.subtotalEl || !this.shippingEl || !this.totalEl) return;

    const subtotal = CartStore.getTotal();
    const shipping = subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.SHIPPING_COST;
    const total = subtotal + shipping;

    this.subtotalEl.textContent = UI.formatPrice(subtotal);
    
    if (shipping === 0) {
      this.shippingEl.innerHTML = `<span style="color: var(--brand-light);">FREE</span>`;
    } else {
      this.shippingEl.textContent = UI.formatPrice(shipping);
    }
    
    this.totalEl.textContent = UI.formatPrice(total);

    // Show free shipping message
    const shippingNote = document.querySelector('#shipping-note');
    if (shippingNote) {
      if (subtotal > 0 && subtotal < this.FREE_SHIPPING_THRESHOLD) {
        const remaining = this.FREE_SHIPPING_THRESHOLD - subtotal;
        shippingNote.innerHTML = `<span class="muted">Add ${UI.formatPrice(remaining)} more for FREE shipping!</span>`;
      } else if (subtotal >= this.FREE_SHIPPING_THRESHOLD) {
        shippingNote.innerHTML = `<span style="color: var(--brand-light);">🎉 You got FREE shipping!</span>`;
      }
    }
  }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#cart-items')) {
    new CartPage();
  }
});
