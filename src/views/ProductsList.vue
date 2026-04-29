<template>
  <main class="py-12">
    <div class="container mx-auto px-4">

      <h1 class="text-4xl font-bold mb-12">Products</h1>

      <!-- Search Bar -->
      <div class="mb-12">
        <div class="relative max-w-md mx-auto mb-8">
          <input 
            v-model="searchQuery"
            @input="filterProducts"
            placeholder="Search products..." 
            class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all text-lg"
            aria-label="Search products"
          />
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div v-if="loading" class="grid md:grid-cols-4 gap-8">

        <div v-for="n in 8" :key="n" class="animate-pulse">
          <div class="bg-gray-300 h-80 rounded-xl mb-4"></div>
          <div class="h-6 bg-gray-300 rounded mb-2"></div>
          <div class="h-5 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
      
      <div v-else class="grid md:grid-cols-4 gap-8">

        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
        <div v-if="!filteredProducts.length && !loading" class="col-span-full text-center py-20">
          <p class="text-2xl text-gray-500 mb-8">No products found for "{{ searchQuery }}"</p>
          <button @click="searchQuery = ''; productsStore.fetchProducts()" class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold">
            Clear Search
          </button>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>

import { ref, computed, onMounted, nextTick } from 'vue'

import { useProductsStore } from '@/stores/products.js'
import ProductCard from '@/components/ProductCard.vue'


const productsStore = useProductsStore()
const loading = ref(true)
const products = ref([])
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  return products.value.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


onMounted(async () => {
  try {
    await productsStore.fetchProducts()
    products.value = productsStore.products
  } catch (error) {
    console.error('Failed to load products:', error)
    // Fallback mock data
    products.value = [
      {
        id: 1,
        title: 'iPhone 15 Pro',
        price: 999,
        image: 'https://fakestoreapi.com/img/81fPKd-52IL.jpg',
        category: 'electronics',
        rating: { rate: 4.5, count: 120 }
      },
      {
        id: 2,
        title: 'MacBook Pro',
        price: 2399,
        image: 'https://fakestoreapi.com/img/71pWzhdJtwL.jpg',
        category: 'electronics',
        rating: { rate: 4.8, count: 89 }
      },
      {
        id: 3,
        title: 'Samsung Galaxy S24',
        price: 799,
        image: 'https://fakestoreapi.com/img/71swqqe7XWL.jpg',
        category: 'electronics',
        rating: { rate: 4.3, count: 156 }
      }
    ]
  } finally {
    loading.value = false
  }
})


const filterProducts = () => {
  // Filter happens via computed
}

const addToCart = (product) => {
  console.log('Added to cart:', product.title)
}

</script>
