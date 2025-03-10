import { ArrowRight, Star, ShoppingBag, Truck, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Hero() {
  const navigate = useNavigate();
  const { setShowCart } = useCart();

  const handleShopNow = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCategories = () => {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'shipping':
        navigate('/shipping-info');
        break;
      case 'payment':
        navigate('/secure-payment');
        break;
      case 'quality':
        navigate('/quality-guarantee');
        break;
      default:
        break;
    }
  };
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              <Star className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-white/90">Premium Quality Products</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Discover Amazing Products for Your Lifestyle
            </h1>
            <p className="text-xl text-indigo-100 leading-relaxed">
              Shop the latest trends and innovative products curated just for you. Experience premium quality and exceptional service.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleShopNow}
                className="group inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-opacity-90 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleViewCategories}
                className="group inline-flex items-center px-6 py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-600 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-indigo-500"
              >
                View Categories
                <ShoppingBag className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
              <div
                onClick={() => handleFeatureClick('shipping')}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Truck className="h-5 w-5 text-indigo-300" />
                <span className="text-sm text-indigo-100">Free Shipping</span>
              </div>
              <div
                onClick={() => handleFeatureClick('payment')}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Shield className="h-5 w-5 text-indigo-300" />
                <span className="text-sm text-indigo-100">Secure Payment</span>
              </div>
              <div
                onClick={() => handleFeatureClick('quality')}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Star className="h-5 w-5 text-indigo-300" />
                <span className="text-sm text-indigo-100">Premium Quality</span>
              </div>
            </div>
          </div>
          <div className="relative animate-float hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-2xl transform rotate-6 scale-105"></div>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Shopping Experience"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 relative z-10"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 z-20">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Happy Customers</p>
                  <p className="text-gray-500">Join 2k+ satisfied shoppers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}