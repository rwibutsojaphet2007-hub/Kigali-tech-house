<template>
  <div>
    <Header />
    
    <main class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Billing & Shipping -->
          <div class="lg:order-2">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Billing Information</h2>
              <form @submit.prevent="handlePayment" class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input v-model="billingDetails.name" required type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input v-model="billingDetails.email" required type="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input v-model="billingDetails.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input v-model="billingDetails.address" required type="text" placeholder="Street address" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 mb-3" />
                  <div class="grid md:grid-cols-2 gap-4">
                    <input v-model="billingDetails.city" required type="text" placeholder="City" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" />
                    <input v-model="billingDetails.zipcode" type="text" placeholder="ZIP Code" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>

                <!-- Stripe Elements -->
                <div id="card-element" class="p-4 border border-gray-300 rounded-xl bg-white"></div>
                <div id="card-errors" role="alert" class="text-red-600 text-sm mt-2 min-h-5"></div>

                <div class="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="font-semibold text-blue-900">Secure Checkout</p>
                    <p class="text-sm text-blue-800">Your payment information is encrypted and secure</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  :disabled="processing"
                  class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-5 px-8 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span v-if="!processing">Pay Securely ${{ total.toFixed(2) }}</span>
                  <span v-else>Processing...</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:order-1">
            <div class="bg-white rounded-2xl shadow-xl p-8 sticky top-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div v-if="cartItems.length" class="space-y-4 mb-8 max-h-96 overflow-y-auto">
                <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0">
                  <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm line-clamp-2 mb-1">{{ item.title }}</p>
                    <p class="text-sm text-gray-600">{{ item.quantity }} x ${{ item.price.toFixed(2) }}</p>
                  </div>
                  <span class="font-bold text-lg text-primary-600">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>

              <div v-else class="text-center py-12">
                <p class="text-gray-500 mb-4">No items in cart</p>
                <RouterLink to="/cart" class="text-primary-600 hover:text-primary-700 font-semibold">← Return to Cart</RouterLink>
              </div>

              <div class="space-y-4 divide-y divide-gray-200">
                <div class="flex justify-between py-3">
                  <span class="text-lg font-semibold">Subtotal</span>
                  <span class="text-lg font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between py-3">
                  <span class="text-lg font-semibold">Shipping</span>
                  <span class="text-green-600 font-semibold">FREE</span>
                </div>
                <div class="flex justify-between py-3">
                  <span class="text-lg font-semibold">Tax (10%)</span>
                  <span class="text-lg font-semibold">${{ tax.toFixed(2) }}</span>
                </div>
                <div class="pt-4">
                  <div class="flex justify-between items-baseline text-2xl font-bold">
                    <span>Total</span>
                    <span class="text-primary-600">${{ total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useCartStore } from '@/stores/cart.js'
import { useAuthStore } from '@/stores/auth.js'

const cartStore = useCartStore()
const authStore = useRouter()
const router = useRouter()

const billingDetails = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipcode: ''
})

const processing = ref(false)
const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.total)
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + tax.value)

onMounted(async () => {
  // Load Stripe
  stripe.value = await loadStripe('pk_test_51YOUR_PUBLISHABLE_KEY_HERE') // Replace with real test key
  if (stripe.value) {
    elements.value = stripe.value.elements()
    cardElement.value = elements.value.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          '::placeholder': {
            color: '#aab7c4'
          }
        }
      }
    })
    cardElement.value.mount('#card-element')
    cardElement.value.on('change', (event) => {
      const displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    })
  }
})

const handlePayment = async () => {
  if (!stripe.value || !cardElement.value) return

  processing.value = true

  try {
    // 1. Create order (mock)
    const orderData = {
      billing_details: billingDetails.value,
      cart_items: cartStore.items,
      amount: Math.round(total.value * 100) // cents
    }

    // 2. Create PaymentIntent (in real app, backend call)
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(total.value * 100) })
    })
    const { client_secret } = await response.json()

    // 3. Confirm payment
    const result = await stripe.value.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardElement.value,
        billing_details: billingDetails.value
      }
    })

    if (result.error) {
      const displayError = document.getElementById('card-errors')
      displayError.textContent = result.error.message
    } else {
      // Success! Clear cart, save order
      cartStore.items = []
      authStore.saveOrder(orderData) // Mock
      router.push('/order-success')
    }
  } catch (error) {
    console.error('Payment error:', error)
  } finally {
    processing.value = false
  }
}
</script>

