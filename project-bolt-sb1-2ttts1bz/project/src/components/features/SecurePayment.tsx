import { Shield, CreditCard, Lock, CheckCircle } from 'lucide-react';

export default function SecurePayment() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Secure Payment Methods</h1>
          <p className="text-lg text-gray-600 mb-12">Your security is our top priority. Shop with confidence using our trusted payment options.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Encryption</h3>
            <p className="text-gray-600">All your payment information is encrypted using industry-standard SSL technology. Your data is always protected.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Multiple Payment Options</h3>
            <p className="text-gray-600">Choose from various payment methods including credit cards, PayPal, and other secure payment options.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Security Measures</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">PCI DSS Compliant</h3>
                <p className="mt-2 text-gray-600">We follow all Payment Card Industry Data Security Standard requirements to ensure your data is safe.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Fraud Prevention</h3>
                <p className="mt-2 text-gray-600">Advanced fraud detection systems protect you from unauthorized transactions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Secure Checkout</h3>
                <p className="mt-2 text-gray-600">Our checkout process is fully encrypted and secure, giving you peace of mind with every purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}