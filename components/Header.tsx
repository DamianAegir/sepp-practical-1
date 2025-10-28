import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useAuthStore } from "../store/authStore";
import ProductService from "../services/productService";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ProductService.getCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm">
        Free shipping on orders over $50 | Singapore Polytechnic Special Offer
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              SEPP
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Buttons / User Menu - Desktop */}
            {isAuthenticated && user ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category?category=${encodeURIComponent(category)}`}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {category}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Mobile Navigation */}
          <nav className="flex flex-col py-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category?category=${encodeURIComponent(category)}`}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {category}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Contact
            </Link>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="h-5 w-5 mr-3" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="px-4 py-3 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
