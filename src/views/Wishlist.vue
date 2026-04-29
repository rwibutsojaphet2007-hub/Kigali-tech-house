<template>
  <div>
    <Header />
    
    <main class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="flex items-center gap-3 mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Wishlist</h1>
            <span class="px-4 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold">
              {{ wishlistItems.length }} items
            </span>
          </div>

          <div v-if="wishlistItems.length" class="grid md:grid-cols-4 gap-8">
            <div 
              v-for="item in wishlistItems" 
              :key="item.id" 
              class="group relative bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 hover:shadow-2xl transition-all border hover:border-red-200"
            >
              <button 
                @click="removeFromWishlist(item.id)"
                class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border-2 border-red-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-50 text-red-500 hover:text-red-600 transition-all shadow-lg"
                aria-label="Remove from wishlist"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>

              <div class="text-center">
                <img 
                  :src="item.image" 
                  :alt="item.title" 
                  class="w-32 h-32 object-cover rounded-xl mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform"
                />
                
                <RouterLink :to="`/products/${item.id}`" class="block hover:text-primary-600 mb-3 font-semibold line-clamp-2 h-12">
                  {{ item.title }}
                </RouterLink>
                
                <div class="flex items-center justify-center gap-2 mb-6">
                  <div class="flex text-yellow-400 text-sm">
                    <span v-for="n in Math.floor(item.rating?.rate || 0)" :key="n">★</span>
                  </div>
                  <span class="text-sm text-gray-600">({{ item.rating?.count || 0 }})</span>
                </div>

                <div class="space-y-2">
                  <div class="text-xl font-bold text-primary-600">${{ item.price.toFixed(2) }}</div>
                  <button 
                    @click="addToCart(item)"
                    class="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label="`Move ${item.title} to cart`"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-24">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-2xl mb-8">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p class="text-xl text-gray-600 mb-8">Save products you love for later.</p>
            <RouterLink 
              to="/products" 
              class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Start Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useWishlistStore } from '@/stores/wishlist.js'
import { useCartStore } from '@/stores/cart.js'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const wishlistItems = computed(() => wishlistStore.items)

const removeFromWishlist = (id) => {
  const item = wishlistItems.value.find(p => p.id === id)
  if (item) {
    wishlistStore.toggleItem(item)
  }
}

const addToCart = (item) => {
  cartStore.addItem(item)
  removeFromWishlist(item.id) // Optional: remove from wishlist when added to cart
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

