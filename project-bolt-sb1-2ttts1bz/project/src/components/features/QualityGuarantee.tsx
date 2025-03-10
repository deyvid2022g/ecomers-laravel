import { Star, Award, CheckCircle, RefreshCw } from 'lucide-react';

export default function QualityGuarantee() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quality Guarantee</h1>
          <p className="text-lg text-gray-600 mb-12">We stand behind every product we sell with our comprehensive quality guarantee</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Star className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Selection</h3>
            <p className="text-gray-600">Every product in our store is carefully selected to meet our high quality standards.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Certified</h3>
            <p className="text-gray-600">All our products undergo rigorous quality testing before being offered to our customers.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Satisfaction Guaranteed</h3>
            <p className="text-gray-600">Not satisfied? We offer a 100% satisfaction guarantee on all our products.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <RefreshCw className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Returns</h3>
            <p className="text-gray-600">Simple and hassle-free returns within 30 days of purchase.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Quality Promise</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Premium Materials</h3>
                <p className="mt-2 text-gray-600">We use only the highest quality materials in all our products.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Expert Craftsmanship</h3>
                <p className="mt-2 text-gray-600">Each product is crafted with attention to detail and expert precision.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quality Control</h3>
                <p className="mt-2 text-gray-600">Rigorous quality control measures ensure consistent high standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}