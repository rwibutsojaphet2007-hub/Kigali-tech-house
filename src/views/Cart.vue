<template>
  <div>
    <Header />
    
    <main class="py-12 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="p-8 border-b border-gray-200">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <span class="px-4 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                {{ cartItems.length }} items
              </span>
            </div>
            <p v-if="!cartItems.length" class="text-gray-500">Your cart is empty</p>
          </div>

          <div v-if="cartItems.length" class="divide-y divide-gray-200">
            <!-- Cart Items -->
            <div v-for="(item, index) in cartItems" :key="item.id" class="p-8 hover:bg-gray-50 transition">
              <div class="flex items-center gap-6">
                <div class="relative">
                  <img :src="item.image" :alt="item.title" class="w-24 h-24 object-cover rounded-xl shadow-md" />
                  <button 
                    @click="removeItem(item.id)"
                    class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
                
                <div class="flex-1 min-w-0">
                  <RouterLink :to="`/products/${item.id}`" class="block hover:text-primary-600 mb-1 font-semibold line-clamp-2">
                    {{ item.title }}
                  </RouterLink>
                  <p class="text-sm text-gray-600 mb-4">{{ item.category }}</p>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center bg-gray-100 rounded-lg p-2">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)" 
                        class="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded transition"
                        :disabled="item.quantity <= 1"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span class="w-12 text-center font-semibold px-4">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span class="text-2xl font-bold text-primary-600">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart Summary -->
            <div class="p-8 lg:p-12 bg-gradient-to-r from-gray-50 to-white">
              <div class="grid grid-cols-2 gap-4 text-right text-lg font-semibold mb-6">
                <span>Subtotal:</span>
                <span>${{ subtotal.toFixed(2) }}</span>
                <span>Shipping:</span>
                <span class="text-green-600">FREE</span>
                <span>Tax (10%):</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              
              <div class="border-t-2 border-gray-200 pt-6">
                <div class="flex justify-between items-baseline text-3xl font-bold mb-6">
                  <span>Total:</span>
                  <span class="text-primary-600">${{ total.toFixed(2) }}</span>
                </div>
                
                <RouterLink 
                  to="/checkout"
                  class="w-full block bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-5 px-8 rounded-2xl text-xl font-bold text-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                  :aria-label="`Proceed to checkout - $${total.toFixed(2)}`"
                >
                  Proceed to Checkout →
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24">
          <div class="max-w-md mx-auto p-12 bg-white rounded-2xl shadow-xl">
            <svg class="w-24 h-24 text-gray-400 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13.5-5.5l-2 2.5L17 11l-2-2.5"></path>
            </svg>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p class="text-xl text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <RouterLink 
              to="/products" 
              class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Start Shopping →
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
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)

const subtotal = computed(() => cartStore.total)
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + tax.value)

const removeItem = (id) => {
  cartStore.removeItem(id)
}

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity)
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

