import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import ProductService from '../services/productService';
import { FilterOptions, Product } from '../types/product';

export const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    searchQuery: searchParams.get('search') || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    brand: undefined,
    minRating: undefined,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, categoriesResponse] = await Promise.all([
          ProductService.getBrands(),
          ProductService.getCategories()
        ]);

        if (brandsResponse.success) {
          setBrands(brandsResponse.data || []);
        }

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data || []);
        }
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load filters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    setFilters(prev => ({
      ...prev,
      category: category || undefined,
      searchQuery: search || undefined,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getProducts(filters);
        
        if (response.success) {
          setProducts(response.data.products || []);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      searchQuery: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      brand: undefined,
      minRating: undefined,
    });
    setSearchParams({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {filters.category || filters.searchQuery ? (
              <>
                {filters.searchQuery && `Search results for "${filters.searchQuery}"`}
                {filters.category && !filters.searchQuery && filters.category}
                {filters.category && filters.searchQuery && ` in ${filters.category}`}
              </>
            ) : (
              'All Products'
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => handleFilterChange('category', cat)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                    </label>
                  ))}
                  {filters.category && (
                    <button
                      onClick={() => handleFilterChange('category', undefined)}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Show All
                    </button>
                  )}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Brand</h3>
                <select
                  value={filters.brand || ''}
                  onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Min Price</label>
                    <input
                      type="number"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="$0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Max Price</label>
                    <input
                      type="number"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="$10000"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-800 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                {/* Same filter content as desktop */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={filters.category === cat}
                          onChange={() => handleFilterChange('category', cat)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Brand</h3>
                  <select
                    value={filters.brand || ''}
                    onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
