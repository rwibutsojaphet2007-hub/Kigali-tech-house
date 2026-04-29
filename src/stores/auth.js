import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  const login = (credentials) => {
    // Mock auth with FakeStore API or local
    // In real app, use backend API
    user.value = { id: 1, email: credentials.email, name: 'Customer' }
    token.value = 'mock-jwt-token'
    isAuthenticated.value = true
    localStorage.setItem('kigali-token', token.value)
    localStorage.setItem('kigali-user', JSON.stringify(user.value))
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('kigali-token')
    localStorage.removeItem('kigali-user')
  }

  const loadFromLocalStorage = () => {
    const savedToken = localStorage.getItem('kigali-token')
    const savedUser = localStorage.getItem('kigali-user')
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  loadFromLocalStorage()

  return { user, token, isAuthenticated, login, logout }
})

