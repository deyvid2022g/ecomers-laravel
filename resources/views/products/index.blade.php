@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Products</h2>
                    @auth
                        <a href="{{ route('products.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add New Product
                        </a>
                    @endauth
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    @foreach ($products as $product)
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            @if ($product->image)
                                <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" class="w-full h-48 object-cover">
                            @else
                                <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <span class="text-gray-500">No image</span>
                                </div>
                            @endif
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $product->name }}</h3>
                                <p class="text-gray-600 text-sm mb-4">{{ Str::limit($product->description, 100) }}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-lg font-bold text-gray-900">${{ number_format($product->price, 2) }}</span>
                                    <a href="{{ route('products.show', $product) }}" class="text-blue-500 hover:text-blue-700">View Details</a>
                                </div>
                                @if ($product->stock > 0)
                                    <p class="text-sm text-green-600 mt-2">In Stock ({{ $product->stock }})</p>
                                @else
                                    <p class="text-sm text-red-600 mt-2">Out of Stock</p>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="mt-6">
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection