<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <div class="text-center mb-10">
          <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span class="text-3xl font-bold text-white">🇷🇼</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h1>
          <p class="text-gray-600">Sign in to your Kigali Tech Store account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="form.email" 
              required 
              type="email" 
              placeholder="Enter your email"
              class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-primary-200 focus:border-primary-500 transition-all"
              aria-describedby="email-error"
            />
            <p v-if="errors.email" id="email-error" class="text-red-600 text-sm mt-2">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="form.password" 
                required 
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-3 focus:ring-primary-200 focus:border-primary-500 transition-all"
                aria-describedby="password-error"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center"
                aria-label="Toggle password visibility"
              >
                <svg class="w-5 h-5 text-gray-400" :class="{ 'text-gray-600': showPassword }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L19 19" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" id="password-error" class="text-red-600 text-sm mt-2">{{ errors.password }}</p>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm font-semibold text-primary-600 hover:text-primary-700">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span v-if="!loading">Sign In</span>
            <LoadingSpinner v-else show-text="false" />
          </button>
        </form>

        <div class="mt-10 pt-8 border-t border-gray-200 text-center">
          <p class="text-gray-600 mb-4">Don't have an account?</p>
          <RouterLink 
            to="/register"
            class="inline-flex items-center gap-2 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Account
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
  email: '',
  password: ''
})

const errors = ref({})
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  errors.value = {}

  try {
    // Mock validation
    if (!form.email.includes('@')) {
      errors.value.email = 'Please enter a valid email address'
      return
    }
    if (form.password.length < 6) {
      errors.value.password = 'Password must be at least 6 characters'
      return
    }

    // Mock auth - in real app, call API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    authStore.login(form)
    router.push('/profile')
  } catch (error) {
    errors.value.email = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

