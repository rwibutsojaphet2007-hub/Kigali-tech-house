<template>
  <main class="py-12 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white rounded-2xl shadow-xl">
        <div class="p-8 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Order History</h1>
              <p class="text-gray-600 mt-1">{{ user ? user.name : 'Customer' }}'s Orders</p>
            </div>
            <div class="text-right">
              <span class="text-2xl font-bold text-green-600">${{ totalSpent.toFixed(2) }}</span>
              <p class="text-sm text-gray-500">Total spent</p>
            </div>
          </div>
        </div>

        <div v-if="orders.length" class="divide-y divide-gray-200">
          <div v-for="order in orders" :key="order.id" class="p-8 hover:bg-gray-50 transition">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">Order #{{ order.id }}</h3>
                <p class="text-gray-600">Placed on {{ formatDate(order.date) }}</p>
              </div>
              <div class="text-right">
                <span class="text-2xl font-bold text-primary-600">${{ order.total.toFixed(2) }}</span>
                <span class="block text-sm text-gray-500">Paid</span>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div v-for="item in order.items.slice(0, 3)" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm line-clamp-2 mb-1">{{ item.title }}</p>
                  <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <span class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              <div v-if="order.items.length > 3" class="md:col-span-3 p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-600">and {{ order.items.length - 3 }} more items</p>
              </div>
            </div>

            <div class="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Delivered</span>
              <div class="flex gap-2 text-sm">
                <span>Ships to:</span>
                <span class="font-semibold">{{ order.shippingAddress }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24">
          <div class="max-w-md mx-auto">
            <svg class="w-24 h-24 text-gray-400 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">No orders yet</h3>
            <p class="text-gray-600 mb-8">Your order history will appear here once you make your first purchase.</p>
            <RouterLink to="/products" class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all">
              Browse Products
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

// Mock orders - in real app, fetch from API
const orders = computed(() => [
  {
    id: '#1001',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    total: 245.97,
    status: 'delivered',
    shippingAddress: '123 Kigali Street, Kacyiru, Kigali',
    items: [
      { id: 1, title: 'Wireless Headphones', image: 'https://fakestoreapi.com/img/60.jpg', price: 89.99, quantity: 2 },
      { id: 2, title: 'Smartphone Case', image: 'https://fakestoreapi.com/img/61.jpg', price: 15.99, quantity: 1 }
    ]
  },
  {
    id: '#1002',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    total: 156.50,
    status: 'delivered',
    shippingAddress: '456 Remera Road, Remera, Kigali',
    items: [
      { id: 3, title: 'USB-C Charger', image: 'https://fakestoreapi.com/img/62.jpg', price: 29.99, quantity: 3 },
      { id: 4, title: 'Screen Protector', image: 'https://fakestoreapi.com/img/63.jpg', price: 12.99, quantity: 2 }
    ]
  }
])

const totalSpent = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0))

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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

