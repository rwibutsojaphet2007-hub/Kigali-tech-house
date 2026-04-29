<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12">
    <div class="max-w-md mx-auto text-center px-4">
      <div class="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-8 p-6">
        <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      
      <h1 class="text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        404
      </h1>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p class="text-lg text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="space-y-4 mb-12">
        <RouterLink 
          to="/" 
          class="inline-block bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 block w-full sm:w-auto mx-auto"
        >
          ← Back to Home
        </RouterLink>
        
        <RouterLink 
          to="/products"
          class="inline-block bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 block w-full sm:w-auto mx-auto"
        >
          Continue Shopping
        </RouterLink>
      </div>
      
      <div class="text-xs text-gray-500 space-y-1">
        <p>Or try one of these popular destinations:</p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <RouterLink to="/" class="hover:text-primary-600 transition">Home</RouterLink>
          <RouterLink to="/products" class="hover:text-primary-600 transition">Products</RouterLink>
          <RouterLink to="/cart" class="hover:text-primary-600 transition">Cart</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

