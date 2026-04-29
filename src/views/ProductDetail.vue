<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <RouterLink to="/products" class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Products
      </RouterLink>

      <div v-if="loading" class="flex justify-center py-20">
        <LoadingSpinner show-text="false" />
      </div>

      <div v-else-if="product" class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Product Gallery -->
        <div>
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-96 object-contain rounded-2xl shadow-xl mb-6"
          />
          <div class="flex gap-3">
            <button 
              v-for="(image, index) in product.images || [product.image]" 
              :key="index"
              @click="selectedImage = image"
              :class="['w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition-all', selectedImage === image ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300']"
              :aria-label="`View image ${index + 1}`"
            >
              <img :src="image" :alt="product.title" class="w-full h-full rounded-xl object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="sticky top-12">
            <div class="mb-6">
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{{ product.title }}</h1>
              <div class="flex items-center gap-4 mb-6">
                <div class="flex text-yellow-400 text-xl">
                  <span v-for="n in Math.floor(product.rating?.rate || 0)" :key="n">★</span>
                  <span v-if="(product.rating?.rate || 0) % 1 !== 0">★</span>
                </div>
                <span class="text-2xl text-gray-600">({{ product.rating?.count || 0 }} reviews)</span>
              </div>
              <div class="text-4xl font-bold text-primary-600 mb-8">${{ product.price.toFixed(2) }}</div>
            </div>

            <!-- Category & Stock -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8">
              <div class="flex flex-wrap gap-4 text-sm">
                <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                  {{ product.category }}
                </span>
                <span class="text-green-600">✓ In Stock</span>
              </div>
            </div>

            <!-- Add to Cart Form -->
            <div class="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
              <div class="flex items-center gap-4 mb-6">
                <label class="text-lg font-semibold w-24">Quantity:</label>
                <div class="flex items-center gap-2">
                  <button 
                    @click="quantity = Math.max(1, quantity - 1)" 
                    class="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span class="w-16 text-center text-xl font-semibold">{{ quantity }}</span>
                  <button 
                    @click="quantity = quantity + 1" 
                    class="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4 mb-6">
                <button 
                  @click="addToCart"
                  class="bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                  :aria-label="`Add ${quantity} x ${product.title} to cart`"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5.5M7 13l-1.5 5.5M16 13l1.5 5.5m0 0L18 13m1.5-5.5l-1.5 5.5"></path>
                  </svg>
                  Add to Cart
                </button>
                
                <button 
                  @click="toggleWishlist"
                  class="border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 text-red-600 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                  :aria-label="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
                >
                  <svg class="w-6 h-6" fill="currentColor" :class="isInWishlist ? 'text-red-500' : 'text-gray-400'" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" :class="isInWishlist ? 'fill-current' : ''"/>
                  </svg>
                  {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
                </button>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Description</h3>
              <p class="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{{ product.description }}</p>
            </div>

            <!-- Specifications (mock) -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
              <dl class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt class="font-semibold text-gray-600">Brand:</dt>
                  <dd class="text-gray-900 ml-2">{{ product.brand || 'Kigali Tech' }}</dd>
                </div>
                <div>
                  <dt class="font-semibold text-gray-600">Weight:</dt>
                  <dd class="text-gray-900 ml-2">{{ product.weight || '1.2kg' }}</dd>
                </div>
                <div>
                  <dt class="font-semibold text-gray-600">Dimensions:</dt>
                  <dd class="text-gray-900 ml-2">{{ product.dimensions || '15 x 10 x 2 cm' }}</dd>
                </div>
                <div>
                  <dt class="font-semibold text-gray-600">Warranty:</dt>
                  <dd class="text-gray-900 ml-2">1 Year</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'
import { useWishlistStore } from '@/stores/wishlist.js'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const productId = ref(route.params.id)
const loading = ref(false)
const product = ref(null)
const quantity = ref(1)
const selectedImage = ref('')

const isInWishlist = computed(() => wishlistStore.isInWishlist(product.value?.id))

const fetchProduct = async () => {
  loading.value = true
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`)
    product.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch product:', error)
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value) {
    const item = { ...product.value, quantity: quantity.value }
    cartStore.addItem(item)
    quantity.value = 1 // Reset
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleItem(product.value)
  }
}

watch(() => route.params.id, (newId) => {
  productId.value = newId
  fetchProduct()
}, { immediate: true })

onMounted(() => {
  fetchProduct()
})
</script>

