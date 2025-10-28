import ApiService from './api.js';

class ProductService {
  // Get all products with optional filtering and pagination
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    if (filters.category && filters.category !== 'all') {
      queryParams.append('category', filters.category);
    }
    if (filters.brand) {
      queryParams.append('brand', filters.brand);
    }
    if (filters.minPrice) {
      queryParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      queryParams.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.searchQuery) {
      queryParams.append('search', filters.searchQuery);
    }
    if (filters.page) {
      queryParams.append('page', filters.page.toString());
    }
    if (filters.limit) {
      queryParams.append('limit', filters.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return ApiService.get(endpoint);
  }

  // Get single product by ID
  async getProduct(id) {
    return ApiService.get(`/products/${id}`);
  }

  // Create new product (admin only)
  async createProduct(productData) {
    return ApiService.post('/products', productData);
  }

  // Update product (admin only)
  async updateProduct(id, productData) {
    return ApiService.put(`/products/${id}`, productData);
  }

  // Delete product (admin only)
  async deleteProduct(id) {
    return ApiService.delete(`/products/${id}`);
  }

  // Get all categories
  async getCategories() {
    return ApiService.get('/products/categories');
  }

  // Get all brands
  async getBrands() {
    return ApiService.get('/products/brands');
  }

  // Get featured products (first 8 products)
  async getFeaturedProducts() {
    return this.getProducts({ limit: 8 });
  }

  // Get products by category
  async getProductsByCategory(category) {
    return this.getProducts({ category });
  }

  // Search products
  async searchProducts(query, filters = {}) {
    return this.getProducts({ ...filters, searchQuery: query });
  }
}

export default new ProductService();