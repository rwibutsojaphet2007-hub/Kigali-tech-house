<template>
  <div>
    <Header />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-500 to-primary-600 py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Premium Tech<br />
          <span class="text-secondary-500">For Every Rwandan</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Affordable smartphones, laptops & accessories delivered across Kigali. Quality you trust, prices you love.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <RouterLink to="/products" class="bg-secondary-500 hover:bg-secondary-600 text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            Shop Now
          </RouterLink>
          <RouterLink to="/products" class="border-2 border-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
            View Products
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Discover the best tech products across all categories</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-6 mb-16">
          <div 
            v-for="category in categories.slice(0, 4)" 
            :key="category"
            class="group cursor-pointer" 
            @click="goToCategory(category)"
            role="button"
            tabindex="0"
            @keyup.enter="goToCategory(category)"
          >
            <div class="bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center justify-center">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span class="text-2xl font-bold text-white">{{ category.charAt(0).toUpperCase() }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ formatCategory(category) }}</h3>
              <p class="text-gray-600">Premium selection</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-xl text-gray-600">Our best sellers - updated daily</p>
        </div>
        
        <div v-if="featuredProductsLoading" class="grid md:grid-cols-4 gap-8 py-20">
          <LoadingSpinner v-for="n in 4" :key="n" />
        </div>
        
        <ErrorMessage 
          v-else-if="featuredProductsError" 
          :message="featuredProductsError" 
          @retry="fetchFeaturedProducts"
        />
        

        <div v-else-if="featuredProducts.length" class="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">

          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="onAddToCart"
          />
        </div>
        
        <div v-else class="text-center py-20">
          <p class="text-gray-500 text-lg">No featured products available right now. Check back soon!</p>
        </div>
        
        <div class="text-center mt-16">
          <RouterLink to="/products" class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            View All Products →
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useProductsStore } from '@/stores/products.js'

const productsStore = useProductsStore()

const categories = computed(() => productsStore.categories)
const featuredProductsLoading = computed(() => productsStore.loading)
const featuredProductsError = computed(() => productsStore.error)

const featuredProducts = computed(() => productsStore.products.slice(0, 12))


const goToCategory = (category) => {
  window.location.href = `/products/${encodeURIComponent(category)}`
}

const formatCategory = (category) => {
  return category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const onAddToCart = (product) => {
  // Optional: show toast notification
  console.log('Added to cart:', product.title)
}

const fetchFeaturedProducts = async () => {
  await productsStore.fetchProducts()
}

onMounted(async () => {
  await productsStore.fetchProducts()
  await productsStore.fetchCategories()
})
</script>

