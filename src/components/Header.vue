<template>
  <header class="bg-primary-600 text-white shadow-lg">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-bold flex items-center gap-2">
        <span>🇷🇼</span>
        Kigali Tech Store
      </RouterLink>
      
      <div class="hidden md:flex items-center gap-6">
        <RouterLink to="/" class="hover:text-secondary-500 transition">Home</RouterLink>
        <RouterLink to="/products" class="hover:text-secondary-500 transition">Products</RouterLink>
        <RouterLink to="/cart" class="hover:text-secondary-500 transition relative">
          Cart ({{ cartCount }})
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-secondary-500 text-xs rounded-full px-2 py-1">{{ cartCount }}</span>
        </RouterLink>
        <RouterLink to="/wishlist" class="hover:text-secondary-500 transition">Wishlist</RouterLink>
        <template v-if="isAuthenticated">
          <RouterLink to="/profile" class="hover:text-secondary-500 transition">Profile</RouterLink>
          <button @click="logout" class="bg-secondary-500 px-4 py-2 rounded-lg hover:bg-secondary-600 transition">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="hover:text-secondary-500 transition">Login</RouterLink>
          <RouterLink to="/register" class="bg-secondary-500 px-4 py-2 rounded-lg hover:bg-secondary-600 transition">Sign Up</RouterLink>
        </template>
      </div>
      
      <!-- Mobile menu button -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </nav>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-primary-700 px-4 py-2">
      <RouterLink to="/" class="block py-2 hover:text-secondary-500">Home</RouterLink>
      <RouterLink to="/products" class="block py-2 hover:text-secondary-500">Products</RouterLink>
      <RouterLink to="/cart" class="block py-2 hover:text-secondary-500">Cart ({{ cartCount }})</RouterLink>
      <RouterLink to="/wishlist" class="block py-2 hover:text-secondary-500">Wishlist</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/login" class="block py-2 hover:text-secondary-500">Login</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/register" class="block py-2 hover:text-secondary-500">Sign Up</RouterLink>
    </div>
    
    <!-- Search bar -->
    <div class="container mx-auto px-4 py-2">
      <form @submit.prevent="searchProducts" class="flex max-w-md mx-auto">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search products..." 
          class="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-label="Search products"
        />
        <button type="submit" class="bg-primary-500 hover:bg-primary-600 px-6 py-2 rounded-r-lg transition text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'

const cartStore = useCartStore()
const authStore = useAuthStore()
const productsStore = useProductsStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const cartCount = computed(() => cartStore.count)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
}

const searchProducts = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${searchQuery.value}`)
  }
  mobileMenuOpen.value = false
}

onMounted(() => {
  productsStore.fetchCategories()
})
</script>

