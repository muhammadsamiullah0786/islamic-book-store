// =====================
// UI Helpers & Toast Notifications
// =====================

const UI = {
  // Create toast container if it doesn't exist
  initToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  },

  // Show toast notification
  showToast(message, type = 'success', duration = 3000) {
    this.initToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✕';
    const title = type === 'success' ? 'Success' : 'Error';
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;
    
    const container = document.querySelector('.toast-container');
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Format currency (PKR)
  formatPrice(price) {
    return `PKR ${price.toLocaleString()}`;
  },

  // Generate star rating HTML
  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < fullStars; i++) {
      html += '★';
    }
    if (hasHalfStar) {
      html += '☆';
    }
    
    return html;
  },

  // Create product card HTML
  createProductCard(product) {
    return `
      <article class="card product" data-id="${product.id}">
        <div class="img">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="body">
          <span class="chip">${product.category}</span>
          <h3>${product.title}</h3>
          <div class="muted" style="font-size: 0.875rem; margin: 4px 0;">${product.author}</div>
          <div class="meta">
            <span class="stars">${this.generateStars(product.rating)} (${product.rating})</span>
            <span class="price">${this.formatPrice(product.price)}</span>
          </div>
          <div class="actions">
            <a class="btn small" href="product.html?id=${product.id}">Details</a>
            <button class="btn small primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </article>
    `;
  },

  // Create skeleton loading card
  createSkeletonCard() {
    return `
      <div class="card skeleton-card skeleton"></div>
    `;
  },

  // Show loading state
  showLoading(container, count = 6) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!container) return;
    
    const skeletons = Array.from({ length: count }, () => this.createSkeletonCard()).join('');
    container.innerHTML = skeletons;
  },

  // Parse URL parameters
  getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  // Update URL without reload
  updateURL(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, '', url);
  },

  // Scroll to top smoothly
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Debounce function for search
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Set active nav link
  setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .menu-panel a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // Animate number counting
  animateCount(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.round(current);
    }, 16);
  },

  // Confirm dialog
  confirm(message) {
    return window.confirm(message);
  }
};

// Initialize UI features on page load
document.addEventListener('DOMContentLoaded', () => {
  UI.setActiveNav();
  
  // Close mobile menu when clicking outside
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.querySelector('.menu-panel');
  
  if (menuToggle && menuPanel) {
    document.addEventListener('click', (e) => {
      if (menuToggle.checked && !e.target.closest('.header')) {
        menuToggle.checked = false;
      }
    });
  }
});
