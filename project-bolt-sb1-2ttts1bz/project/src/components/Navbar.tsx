import { useState } from 'react';
import { ShoppingCart, Search, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { state: authState, logoutUser } = useAuth();
  const { state: cartState, setShowCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-md text-gray-600 lg:hidden"
              aria-label="Toggle menu"
              title="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-2xl font-bold text-indigo-600 ml-2 hover:text-indigo-700 transition-colors">ShopHub</Link>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowCart(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              aria-label="Shopping cart"
              title="Open shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartState.items.length > 0 && (
                <span 
                  className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-indigo-600 rounded-full"
                  aria-label={`${cartState.items.length} items in cart`}
                >
                  {cartState.items.length}
                </span>
              )}
            </button>

            {authState.user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  aria-label="User menu"
                  title="Toggle user menu"
                  aria-expanded={showDropdown}
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{authState.user.name}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={logoutUser}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      aria-label="Sign out"
                      title="Sign out of your account"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign in</Link>
                <Link to="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}