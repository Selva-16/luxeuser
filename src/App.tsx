import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Star, Facebook, Twitter, Instagram, User, LogOut } from 'lucide-react';
import ProductGrid from './components/ProductGrid';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AuthModal from './components/AuthModal';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Sofas', 'Chairs', 'Tables', 'Beds', 'Storage'];

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsCartOpen(false);
      navigate('/checkout');
    }
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Modern living room"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Elevate Your Living Space
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover our curated collection of premium furniture that combines style, comfort, and quality craftsmanship.
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="inline-block bg-white px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid category={selectedCategory} searchQuery={searchQuery} />
        <BlogSection />
        <Newsletter />
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 
                onClick={() => navigate('/')} 
                className="text-2xl font-bold text-gray-900 cursor-pointer"
              >
                LuxeFurnish
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium
                    ${selectedCategory === category.toLowerCase() ? 'text-gray-900 bg-gray-100' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Username Fetch */}
              <div className="relative">
                {user ? (
                  <div className="relative group">
                    <span className="text-gray-900 font-medium cursor-pointer group-hover:underline">
                      {user.username}
                    </span>

                    {/* Dropdown menu on hover */}
                    <div className="absolute left-0 mt-2 w-32 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={signOut}
                        className="flex items-center h-10 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-gray-600" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleAuthAction}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <User className="h-6 w-6 text-gray-600" />
                  </button>
                )}
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-4 pb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category.toLowerCase());
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">LuxeFurnish</h3>
              <p className="text-gray-400">Quality furniture for modern living.</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-400 hover:text-white">{category}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              © 2025 LuxeFurnish. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;