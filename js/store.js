// =====================
// LocalStorage Cart Manager
// =====================

const CartStore = {
  STORAGE_KEY: 'islamic_bookstore_cart',

  // Get all cart items
  getCart() {
    try {
      const cart = localStorage.getItem(this.STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart:', error);
      return [];
    }
  },

  // Save cart to localStorage
  saveCart(cart) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      this.updateCartBadge();
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  },

  // Add item to cart
  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        author: product.author,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    return existingItem ? 'updated' : 'added';
  },

  // Remove item from cart
  removeItem(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  // Clear entire cart
  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCartBadge();
  },

  // Get cart item count
  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total price
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Update cart badge in header
  updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.setAttribute('data-count', count);
    }
  },

  // Check if product is in cart
  isInCart(productId) {
    const cart = this.getCart();
    return cart.some(item => item.id === productId);
  },

  // Get specific item from cart
  getItem(productId) {
    const cart = this.getCart();
    return cart.find(item => item.id === productId);
  }
};

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
  CartStore.updateCartBadge();
});
