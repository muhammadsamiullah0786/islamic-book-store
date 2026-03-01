// =====================
// Product Page Logic
// URL params, quantity selector, add to cart
// =====================

class ProductPage {
  constructor() {
    this.productId = null;
    this.product = null;
    this.quantity = 1;
    
    this.quantityDisplay = document.querySelector('#quantity-display');
    this.decreaseBtn = document.querySelector('#decrease-qty');
    this.increaseBtn = document.querySelector('#increase-qty');
    this.addToCartBtn = document.querySelector('#add-to-cart-btn');
    this.buyNowBtn = document.querySelector('#buy-now-btn');
    
    this.init();
  }

  init() {
    this.loadProduct();
    this.attachEventListeners();
  }

  loadProduct() {
    // Get product ID from URL
    const params = UI.getURLParams();
    this.productId = parseInt(params.id);

    if (!this.productId) {
      this.showError('No product ID provided');
      return;
    }

    // Find product in data
    this.product = productsData.find(p => p.id === this.productId);

    if (!this.product) {
      this.showError('Product not found');
      return;
    }

    this.renderProduct();
  }

  renderProduct() {
    // Update page title
    document.title = `${this.product.title} - Islamic Book Store`;

    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="index.html">Home</a> / 
        <a href="shop.html">Shop</a> / 
        ${this.product.title}
      `;
    }

    // Update product image
    const productImg = document.querySelector('#product-img');
    if (productImg) {
      productImg.src = this.product.image;
      productImg.alt = this.product.title;
    }

    // Update product details
    const productTitle = document.querySelector('#product-title');
    if (productTitle) productTitle.textContent = this.product.title;

    const productCategory = document.querySelector('#product-category');
    if (productCategory) productCategory.textContent = this.product.category;

    const productAuthor = document.querySelector('#product-author');
    if (productAuthor) productAuthor.textContent = `By ${this.product.author}`;

    const productRating = document.querySelector('#product-rating');
    if (productRating) {
      productRating.innerHTML = `${UI.generateStars(this.product.rating)} (${this.product.rating})`;
    }

    const productPrice = document.querySelector('#product-price');
    if (productPrice) productPrice.textContent = UI.formatPrice(this.product.price);

    const productDescription = document.querySelector('#product-description');
    if (productDescription) productDescription.textContent = this.product.description;

    const productStock = document.querySelector('#product-stock');
    if (productStock) {
      productStock.textContent = this.product.inStock ? 'In Stock' : 'Out of Stock';
      productStock.className = this.product.inStock ? 'badge' : 'chip';
    }
  }

  attachEventListeners() {
    // Decrease quantity
    if (this.decreaseBtn) {
      this.decreaseBtn.addEventListener('click', () => {
        if (this.quantity > 1) {
          this.quantity--;
          this.updateQuantityDisplay();
        }
      });
    }

    // Increase quantity
    if (this.increaseBtn) {
      this.increaseBtn.addEventListener('click', () => {
        if (this.quantity < 10) {
          this.quantity++;
          this.updateQuantityDisplay();
        }
      });
    }

    // Add to cart
    if (this.addToCartBtn) {
      this.addToCartBtn.addEventListener('click', () => {
        this.addToCart();
      });
    }

    // Buy now
    if (this.buyNowBtn) {
      this.buyNowBtn.addEventListener('click', () => {
        this.buyNow();
      });
    }
  }

  updateQuantityDisplay() {
    if (this.quantityDisplay) {
      this.quantityDisplay.textContent = this.quantity;
    }
  }

  addToCart() {
    if (!this.product) {
      UI.showToast('Product not loaded', 'error');
      return;
    }

    CartStore.addItem(this.product, this.quantity);
    UI.showToast(`${this.quantity}x ${this.product.title} added to cart!`, 'success');
    
    // Reset quantity
    this.quantity = 1;
    this.updateQuantityDisplay();
  }

  buyNow() {
    if (!this.product) {
      UI.showToast('Product not loaded', 'error');
      return;
    }

    // Add to cart first
    this.addToCart();
    
    // Redirect to checkout
    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 500);
  }

  showError(message) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = `
        <section class="section">
          <div class="container text-center">
            <div style="font-size: 64px; margin-bottom: 16px; opacity: 0.5;">❌</div>
            <h2>Error</h2>
            <p class="muted">${message}</p>
            <a href="shop.html" class="btn primary" style="margin-top: 24px;">Browse Shop</a>
          </div>
        </section>
      `;
    }
  }
}

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the product page
  const productContainer = document.querySelector('#product-container');
  if (productContainer || document.querySelector('.page-head h1')?.textContent === 'Product Details') {
    new ProductPage();
  }
});
