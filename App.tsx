import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      try {
        const { state } = JSON.parse(savedTheme);
        setTheme(state.isDarkMode);
      } catch (e) {
        // If parsing fails, use default
        setTheme(false);
      }
    }
  }, [setTheme]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
