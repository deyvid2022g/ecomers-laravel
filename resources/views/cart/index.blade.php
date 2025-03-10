@extends('app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>

    @if($cart && $cart->items->count() > 0)
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Cart Items -->
            <div class="md:w-2/3">
                @foreach($cart->items as $item)
                    <div class="flex items-center border-b border-gray-200 py-4">
                        <img src="{{ $item->product->image }}" alt="{{ $item->product->name }}" class="w-24 h-24 object-cover rounded">
                        <div class="flex-1 ml-4">
                            <h3 class="text-lg font-semibold">{{ $item->product->name }}</h3>
                            <p class="text-gray-600">${{ number_format($item->price, 2) }}</p>
                            <div class="flex items-center mt-2">
                                <button class="text-gray-500 hover:text-gray-700 decrement-btn" data-item-id="{{ $item->id }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <span class="mx-3">{{ $item->quantity }}</span>
                                <button class="text-gray-500 hover:text-gray-700 increment-btn" data-item-id="{{ $item->id }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-lg font-semibold">${{ number_format($item->price * $item->quantity, 2) }}</p>
                            <button onclick="removeItem('{{ $item->id }}')" class="text-red-500 hover:text-red-700 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Cart Summary -->
            <div class="md:w-1/3">
                <div class="bg-gray-50 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Cart Summary</h2>
                    <div class="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${{ number_format($cart->total, 2) }}</span>
                    </div>
                    <div class="flex justify-between mb-4">
                        <span>Tax</span>
                        <span>${{ number_format($cart->total * 0.1, 2) }}</span>
                    </div>
                    <div class="border-t pt-4">
                        <div class="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${{ number_format($cart->total * 1.1, 2) }}</span>
                        </div>
                    </div>
                    <button onclick="checkout()" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    @else
        <div class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p class="mt-2 text-sm text-gray-500">Start shopping to add items to your cart</p>
            <a href="/" class="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Continue Shopping
            </a>
        </div>
    @endif
</div>

@push('scripts')
<script>
    let cartDropdown = null;

    function updateQuantity(itemId, change) {
        fetch(`/cart/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ quantity_change: change })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert('Failed to update quantity');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the quantity');
        });
    }

    function removeItem(itemId) {
        if (confirm('Are you sure you want to remove this item?')) {
            fetch(`/cart/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('Failed to remove item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while removing the item');
            });
        }
    }

    function toggleCartDropdown() {
        if (!cartDropdown) {
            fetch('/cart/items')
                .then(response => response.json())
                .then(data => {
                    const dropdown = document.createElement('div');
                    dropdown.className = 'absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50';
                    dropdown.innerHTML = generateCartDropdownContent(data);
                    document.querySelector('.cart-button-container').appendChild(dropdown);
                    cartDropdown = dropdown;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to load cart items');
                });
        } else {
            cartDropdown.remove();
            cartDropdown = null;
        }
    }

    function generateCartDropdownContent(data) {
        if (!data.items || data.items.length === 0) {
            return `
                <div class="p-4 text-center">
                    <p class="text-gray-500">Your cart is empty</p>
                </div>
            `;
        }

        const itemsHtml = data.items.map(item => `
            <div class="flex items-center p-4 border-b border-gray-100">
                <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4 flex-1">
                    <h3 class="text-sm font-medium">${item.product.name}</h3>
                    <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
                    <p class="text-sm font-medium">${item.price}</p>
                </div>
            </div>
        `).join('');

        return `
            ${itemsHtml}
            <div class="p-4">
                <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium">Total:</span>
                    <span class="text-sm font-medium">$${data.total}</span>
                </div>
                <a href="/cart" class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700">View Cart</a>
            </div>
        `;
    }

    function checkout() {
        window.location.href = '/checkout';
    }
</script>
@endpush
@section('scripts')
<script>
document.querySelectorAll('.increment-btn, .decrement-btn').forEach(button => {
    button.addEventListener('click', function() {
        const itemId = this.dataset.itemId;
        const isIncrement = this.classList.contains('increment-btn');
        fetch(`/cart/update/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({
                quantity: isIncrement ? 1 : -1
            })
        }).then(() => window.location.reload());
    });
});
</script>
@endsection
@endsection