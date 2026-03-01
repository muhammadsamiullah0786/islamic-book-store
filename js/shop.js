// =====================
// Shop Page Logic
// Filters, Sorting, Product Rendering
// =====================

class ShopPage {
  constructor() {
    this.products = productsData;
    this.filteredProducts = [...this.products];
    this.searchInput = document.querySelector('#search-input');
    this.categorySelect = document.querySelector('#category-select');
    this.minPriceInput = document.querySelector('#min-price');
    this.maxPriceInput = document.querySelector('#max-price');
    this.ratingSelect = document.querySelector('#rating-select');
    this.sortSelect = document.querySelector('#sort-select');
    this.productGrid = document.querySelector('#product-grid');
    this.productCount = document.querySelector('#product-count');
    this.applyBtn = document.querySelector('#apply-filters');
    this.resetBtn = document.querySelector('#reset-filters');
    
    this.init();
  }

  init() {
    this.renderProducts();
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Filter buttons
    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', () => this.applyFilters());
    }
    
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Sort dropdown
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.sortProducts());
    }

    // Live search with debounce
    if (this.searchInput) {
      this.searchInput.addEventListener('input', UI.debounce(() => {
        this.applyFilters();
      }, 300));
    }

    // Add to cart buttons (event delegation)
    if (this.productGrid) {
      this.productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          const productId = parseInt(e.target.dataset.id);
          this.addToCart(productId);
        }
      });
    }
  }

  applyFilters() {
    let filtered = [...this.products];

    // Search filter
    const searchTerm = this.searchInput?.value.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.author.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    const category = this.categorySelect?.value;
    if (category && category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price range filter
    const minPrice = parseFloat(this.minPriceInput?.value) || 0;
    const maxPrice = parseFloat(this.maxPriceInput?.value) || Infinity;
    filtered = filtered.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // Rating filter
    const minRating = this.ratingSelect?.value;
    if (minRating && minRating !== 'Any') {
      const ratingValue = parseFloat(minRating);
      filtered = filtered.filter(product => product.rating >= ratingValue);
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts() {
    const sortValue = this.sortSelect?.value || 'featured';
    
    switch (sortValue) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'featured':
      default:
        this.filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }
    
    this.renderProducts();
  }

  renderProducts() {
    if (!this.productGrid) return;

    // Update product count
    if (this.productCount) {
      this.productCount.textContent = this.filteredProducts.length;
    }

    // Show message if no products found
    if (this.filteredProducts.length === 0) {
      this.productGrid.innerHTML = `
        <div class="card pad" style="grid-column: 1 / -1; text-align: center; padding: 48px 24px;">
          <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">📚</div>
          <h3>No products found</h3>
          <p class="muted">Try adjusting your filters or search terms.</p>
          <button class="btn primary" style="margin-top: 16px;" onclick="shopPage.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    // Render product cards
    const productsHTML = this.filteredProducts
      .map(product => UI.createProductCard(product))
      .join('');
    
    this.productGrid.innerHTML = productsHTML;
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      UI.showToast('Product not found', 'error');
      return;
    }

    const result = CartStore.addItem(product, 1);
    
    if (result === 'added') {
      UI.showToast(`${product.title} added to cart!`, 'success');
    } else {
      UI.showToast(`Cart updated!`, 'success');
    }
  }

  resetFilters() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.categorySelect) this.categorySelect.value = 'All';
    if (this.minPriceInput) this.minPriceInput.value = '';
    if (this.maxPriceInput) this.maxPriceInput.value = '';
    if (this.ratingSelect) this.ratingSelect.value = 'Any';
    if (this.sortSelect) this.sortSelect.value = 'featured';
    
    this.filteredProducts = [...this.products];
    this.sortProducts();
  }
}

// Initialize shop page
let shopPage;
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#product-grid')) {
    shopPage = new ShopPage();
  }
});
