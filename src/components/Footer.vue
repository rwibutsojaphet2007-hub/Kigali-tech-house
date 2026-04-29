<template>
  <footer class="bg-gray-900 text-white py-12 mt-12">
    <div class="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🇷🇼</span>
          Kigali Tech Store
        </h3>
        <p class="text-gray-400 mb-4">Affordable tech for every Rwandan. Quality smartphones, laptops & accessories.</p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-white transition">Facebook</a>
          <a href="#" class="text-gray-400 hover:text-white transition">Twitter</a>
          <a href="#" class="text-gray-400 hover:text-white transition">Instagram</a>
        </div>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li><RouterLink to="/products" class="text-gray-400 hover:text-white transition">Products</RouterLink></li>
          <li><RouterLink to="/cart" class="text-gray-400 hover:text-white transition">Cart</RouterLink></li>
          <li><RouterLink to="/wishlist" class="text-gray-400 hover:text-white transition">Wishlist</RouterLink></li>
          <li><RouterLink to="/profile" class="text-gray-400 hover:text-white transition">Profile</RouterLink></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Categories</h4>
        <ul class="space-y-2">
          <li v-for="category in categories.slice(0, 4)" :key="category" class="text-gray-400 hover:text-white transition cursor-pointer" @click="goToCategory(category)">{{ category }}</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Contact</h4>
        <p class="text-gray-400">Kigali, Rwanda</p>
        <p class="text-gray-400">+250 788 123 456</p>
        <p class="text-gray-400">info@kigalitechstore.com</p>
      </div>
    </div>
    
    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
      <p>&copy; 2026 Kigali Tech Store. Made with ❤️ in Rwanda.</p>
    </div>
  </footer>
</template>

<script setup>
import { useProductsStore } from '@/stores/products.js'
import { RouterLink } from 'vue-router'

const productsStore = useProductsStore()
const categories = productsStore.categories

const goToCategory = (category) => {
  window.location.href = `/products/${category}`
}
</script>

