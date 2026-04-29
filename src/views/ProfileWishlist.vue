<template>
  <main class="py-12 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white rounded-2xl shadow-xl">
        <div class="p-8 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold text-gray-900">Saved Items</h1>
            <span class="px-4 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold">
              {{ wishlistItems.length }} items
            </span>
          </div>
        </div>

        <div v-if="wishlistItems.length" class="p-8">
          <p class="text-gray-600 mb-8">These are the items you've saved for later. Move them to cart when ready to purchase.</p>
          <div class="grid md:grid-cols-4 gap-8">
            <div 
              v-for="item in wishlistItems" 
              :key="item.id" 
              class="relative group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all border hover:border-gray-200"
            >
              <button 
                @click="removeFromWishlist(item.id)"
                class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Remove from saved items"
              >
                <svg class="w-5 h-5 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div class="text-center">
                <RouterLink :to="`/products/${item.id}`">
                  <img 
                    :src="item.image" 
                    :alt="item.title" 
                    class="w-32 h-32 object-cover rounded-xl mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform"
                  />
                </RouterLink>
                
                <RouterLink :to="`/products/${item.id}`" class="block hover:text-primary-600 mb-3 font-semibold line-clamp-2 h-12 text-center">
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
                    class="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24 p-8">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-2xl mb-8 mx-auto">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">No saved items</h2>
          <p class="text-xl text-gray-600 mb-8">Items you save will appear here.</p>
          <RouterLink 
            to="/products" 
            class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Browse Products →
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
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

