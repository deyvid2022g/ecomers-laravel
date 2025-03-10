import { Truck, Package, Clock } from 'lucide-react';

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Shipping Policy</h1>
          <p className="text-lg text-gray-600 mb-12">Learn about our shipping options and delivery process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Truck className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Standard Shipping</h3>
            <p className="text-gray-600">Enjoy free standard shipping on all orders over $50. Delivery typically takes 3-5 business days.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Tracking</h3>
            <p className="text-gray-600">Track your package at any time with our real-time tracking system. Stay updated on your delivery status.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Express Delivery</h3>
            <p className="text-gray-600">Need it faster? Choose express delivery at checkout for 1-2 business day delivery.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How long will my delivery take?</h3>
              <p className="text-gray-600">Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How can I track my order?</h3>
              <p className="text-gray-600">Once your order ships, you'll receive a tracking number via email to monitor your delivery status.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}