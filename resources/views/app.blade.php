<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E-commerce</title>
    @viteReactRefresh
    @vite(['src/main.tsx'])
</head>
<body>
    <div id="root"></div>
    <div class="flex items-center space-x-4">
        <div class="cart-button-container relative">
            <button class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                @if(isset($cartItemCount) && $cartItemCount > 0)
                    <span class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-indigo-600 rounded-full">
                        {{ $cartItemCount }}
                    </span>
                @endif
            </button>
        </div>
</body>
</html>