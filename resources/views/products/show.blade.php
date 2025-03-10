@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
                <div class="mb-6">
                    <a href="{{ route('products.index') }}" class="text-blue-500 hover:text-blue-700">
                        <i class="fas fa-arrow-left"></i> Back to Products
                    </a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        @if ($product->image)
                            <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" class="w-full rounded-lg shadow-md">
                        @else
                            <div class="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                                <span class="text-gray-500">No image available</span>
                            </div>
                        @endif
                    </div>

                    <div class="space-y-6">
                        <h1 class="text-3xl font-bold text-gray-900">{{ $product->name }}</h1>
                        <div class="text-2xl font-bold text-gray-900">${{ number_format($product->price, 2) }}</div>
                        
                        <div class="space-y-2">
                            <h2 class="text-lg font-semibold text-gray-800">Description</h2>
                            <p class="text-gray-600">{{ $product->description }}</p>
                        </div>

                        <div class="space-y-2">
                            <h2 class="text-lg font-semibold text-gray-800">Availability</h2>
                            @if ($product->stock > 0)
                                <p class="text-green-600">In Stock ({{ $product->stock }} available)</p>
                            @else
                                <p class="text-red-600">Out of Stock</p>
                            @endif
                        </div>

                        @if ($product->stock > 0)
                            <form action="{{ route('cart.add', $product) }}" method="POST" class="space-y-4">
                                @csrf
                                <div class="flex items-center space-x-4">
                                    <label for="quantity" class="text-gray-700">Quantity:</label>
                                    <select name="quantity" id="quantity" class="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                        @for ($i = 1; $i <= min($product->stock, 10); $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                                    Add to Cart
                                </button>
                            </form>
                        @endif

                        @auth
                            <div class="flex space-x-4 pt-6 border-t">
                                <a href="{{ route('products.edit', $product) }}" class="text-blue-500 hover:text-blue-700">Edit Product</a>
                                <form action="{{ route('products.destroy', $product) }}" method="POST" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-500 hover:text-red-700" onclick="return confirm('Are you sure you want to delete this product?')">
                                        Delete Product
                                    </button>
                                </form>
                            </div>
                        @endauth
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection