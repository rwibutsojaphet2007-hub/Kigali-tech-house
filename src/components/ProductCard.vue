<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group h-full">
    <!-- Product Image -->
    <div class="relative h-64 overflow-hidden bg-gray-100">
      <img 
        :src="product.image" 
        :alt="product.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <button 
        @click="toggleWishlist"
        :aria-label="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'" 
        class="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
      >
        <svg class="w-6 h-6" fill="currentColor" :class="isInWishlist ? 'text-red-500' : 'text-gray-400'" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" :class="isInWishlist ? 'fill-current' : ''"/>
        </svg>
      </button>
    </div>
    
    <!-- Product Info -->
    <div class="p-6">
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 leading-tight" :title="product.title">
        {{ product.title }}
      </h3>
      
      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex text-sm text-yellow-400">
          <span v-for="n in Math.floor(product.rating?.rate || 0)" :key="n" class="★"></span>
          <span v-if="product.rating?.rate % 1 !== 0" class="★ text-yellow-200"></span>
        </div>
        <span class="ml-2 text-sm text-gray-500">({{ product.rating?.count || 0 }})</span>
      </div>
      
      <!-- Price -->
      <div class="text-2xl font-bold text-primary-600 mb-4">
        ${{ product.price.toFixed(2) }}
      </div>
      
      <!-- Actions -->
      <div class="space-y-2">
        <button 
          @click="addToCart"
          class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          :aria-label="`Add ${product.title} to cart`"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5.5M7 13l-1.5 5.5M16 13l1.5 5.5m0 0L18 13m1.5-5.5l-1.5 5.5"></path>
          </svg>
          Add to Cart
        </button>
        
        <RouterLink 
          :to="`/products/${product.id}`"
          class="block w-full text-center bg-white border-2 border-primary-500 hover:bg-primary-500 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import { useWishlistStore } from '@/stores/wishlist.js'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  cartStore.addItem(props.product)
  emit('add-to-cart', props.product)
}

const toggleWishlist = () => {
  wishlistStore.toggleItem(props.product)
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

