import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import ShippingInfo from './components/features/ShippingInfo';
import SecurePayment from './components/features/SecurePayment';
import QualityGuarantee from './components/features/QualityGuarantee';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Cart from './components/Cart';

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Cart />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shipping-info" element={<ShippingInfo />} />
              <Route path="/secure-payment" element={<SecurePayment />} />
              <Route path="/quality-guarantee" element={<QualityGuarantee />} />
              <Route path="/" element={
                <>
                  <Hero />
                  <FeaturedCategories 
                    onCategorySelect={setSelectedCategoryId}
                    selectedCategoryId={selectedCategoryId}
                  />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="featured-products">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="mt-2 text-gray-500">Discover our handpicked selection of premium products</p>
                      </div>
                    </div>
                    <ProductList categoryId={selectedCategoryId} />
                  </main>
                </>
              } />
            </Routes>

            <footer className="bg-white border-t border-gray-200 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">New Arrivals</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Best Sellers</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">On Sale</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Clearance</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Contact Us</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">FAQs</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Shipping Info</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Returns</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Our Story</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Blog</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Press</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-indigo-600">Careers</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
                    <p className="text-gray-600 mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
                  <p>&copy; 2025 ShopHub. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;