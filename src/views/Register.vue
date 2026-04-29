<template>
  <div class="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50 py-12 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-10">
        <div class="text-center mb-10">
          <div class="w-20 h-20 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span class="text-3xl font-bold text-white">🇷🇼</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-3">Join Us Today</h1>
          <p class="text-gray-600">Create your Kigali Tech Store account</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input 
              v-model="form.name" 
              required 
              type="text" 
              placeholder="Enter your full name"
              class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-accent-200 focus:border-accent-500 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="form.email" 
              required 
              type="email" 
              placeholder="Enter your email"
              class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-accent-200 focus:border-accent-500 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              placeholder="+250 ..."
              class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-accent-200 focus:border-accent-500 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="form.password" 
                required 
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                class="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-3 focus:ring-accent-200 focus:border-accent-500 transition-all"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="showPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L19 19' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'" />
                </svg>
              </button>
            </div>
            <div class="mt-2 text-xs text-gray-500">
              Password must be at least 8 characters long
            </div>
          </div>

          <div class="pt-2">
            <label class="flex items-center">
              <input v-model="form.terms" required type="checkbox" class="rounded border-gray-300 text-accent-600 focus:ring-accent-500 h-5 w-5">
              <span class="ml-3 text-sm text-gray-700">
                I agree to the <a href="#" class="text-accent-600 hover:text-accent-700">Terms of Service</a> and <a href="#" class="text-accent-600 hover:text-accent-700">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button 
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-5 px-8 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span v-if="!loading">Create Account</span>
            <LoadingSpinner v-else show-text="false" />
          </button>
        </form>

        <div class="mt-10 pt-8 border-t border-gray-200 text-center">
          <p class="text-gray-600 mb-4">Already have an account?</p>
          <RouterLink 
            to="/login"
            class="inline-flex items-center gap-2 bg-white border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  terms: false
})

const loading = ref(false)
const showPassword = ref(false)

const handleRegister = async () => {
  loading.value = true

  try {
    // Mock validation
    if (form.password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    
    if (!form.terms) {
      alert('Please accept the terms and conditions')
      return
    }

    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Auto-login after registration
    authStore.login({
      email: form.email,
      name: form.name
    })
    
    router.push('/profile')
  } catch (error) {
    alert('Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

