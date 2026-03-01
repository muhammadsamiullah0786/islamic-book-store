// =====================
// Checkout Page Logic
// Form validation, order placement
// =====================

class CheckoutPage {
  constructor() {
    this.cart = [];
    this.form = document.querySelector('#checkout-form');
    this.placeOrderBtn = document.querySelector('#place-order-btn');
    this.orderSummary = document.querySelector('#order-summary');
    this.successMessage = document.querySelector('#success-message');
    this.checkoutContainer = document.querySelector('#checkout-container');
    
    this.init();
  }

  init() {
    this.cart = CartStore.getCart();
    
    // Redirect if cart is empty
    if (this.cart.length === 0) {
      window.location.href = 'cart.html';
      return;
    }
    
    this.renderOrderSummary();
    this.attachEventListeners();
  }

  renderOrderSummary() {
    if (!this.orderSummary) return;

    const subtotal = CartStore.getTotal();
    const shipping = subtotal >= 5000 ? 0 : 250;
    const total = subtotal + shipping;

    const itemsHTML = this.cart.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--line);">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
          <img src="${item.image}" alt="${item.title}" 
               style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line);">
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 0.938rem;">${item.title}</div>
            <div class="muted" style="font-size: 0.813rem;">Qty: ${item.quantity}</div>
          </div>
        </div>
        <div style="font-weight: 700; color: var(--brand-light);">
          ${UI.formatPrice(item.price * item.quantity)}
        </div>
      </div>
    `).join('');

    this.orderSummary.innerHTML = `
      <h3 style="margin-bottom: 16px;">Order Summary</h3>
      <div style="margin-bottom: 16px;">
        ${itemsHTML}
      </div>
      <div style="padding: 16px 0; border-top: 1px solid var(--line);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span class="muted">Subtotal</span>
          <strong>${UI.formatPrice(subtotal)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span class="muted">Shipping</span>
          <strong>${shipping === 0 ? '<span style="color: var(--brand-light);">FREE</span>' : UI.formatPrice(shipping)}</strong>
        </div>
        <div class="hr"></div>
        <div style="display: flex; justify-content: space-between; font-size: 1.25rem;">
          <strong>Total</strong>
          <strong style="color: var(--brand-light);">${UI.formatPrice(total)}</strong>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateAndSubmit();
      });
    }

    // Real-time validation
    const inputs = this.form?.querySelectorAll('input, select, textarea');
    inputs?.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Update field styling
    if (isValid) {
      field.style.borderColor = 'var(--line)';
      this.removeErrorMessage(field);
    } else {
      field.style.borderColor = 'var(--danger)';
      this.showErrorMessage(field, errorMessage);
    }

    return isValid;
  }

  showErrorMessage(field, message) {
    this.removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: var(--danger); font-size: 0.813rem; margin-top: 4px;';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
  }

  removeErrorMessage(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }

  validateAndSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Validate all required fields
    let isValid = true;
    const requiredFields = this.form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      UI.showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    // Show loading state
    if (this.placeOrderBtn) {
      this.placeOrderBtn.disabled = true;
      this.placeOrderBtn.textContent = 'Processing...';
    }

    // Simulate API call
    setTimeout(() => {
      this.placeOrder(data);
    }, 1500);
  }

  placeOrder(orderData) {
    const order = {
      id: Date.now(),
      items: this.cart,
      customer: orderData,
      total: CartStore.getTotal() + (CartStore.getTotal() >= 5000 ? 0 : 250),
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save order to localStorage (for demo)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    CartStore.clearCart();

    // Show success message
    this.showSuccess(order);
  }

  showSuccess(order) {
    if (this.checkoutContainer) this.checkoutContainer.classList.add('hidden');
    if (this.successMessage) {
      this.successMessage.classList.remove('hidden');
      this.successMessage.innerHTML = `
        <div class="card pad" style="max-width: 600px; margin: 0 auto; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 16px;">✓</div>
          <h2 style="color: var(--brand-light); margin-bottom: 12px;">Order Confirmed!</h2>
          <p class="muted" style="margin-bottom: 24px;">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div class="card pad" style="background: var(--surface-2); margin-bottom: 24px; text-align: left;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="muted">Order ID:</span>
              <strong>#${order.id}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="muted">Total:</span>
              <strong style="color: var(--brand-light);">${UI.formatPrice(order.total)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span class="muted">Status:</span>
              <span class="badge">${order.status}</span>
            </div>
          </div>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="shop.html" class="btn primary">Continue Shopping</a>
            <a href="index.html" class="btn">Go to Homepage</a>
          </div>
        </div>
      `;
    }

    UI.scrollToTop();
    UI.showToast('Order placed successfully!', 'success', 5000);
  }
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#checkout-form')) {
    new CheckoutPage();
  }
});
