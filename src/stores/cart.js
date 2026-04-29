import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  const removeItem = (id) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (id, quantity) => {
    const item = items.value.find(item => item.id === id)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeItem(id)
      } else {
        saveToLocalStorage()
      }
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('kigali-cart', JSON.stringify(items.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('kigali-cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  // Load on init
  loadFromLocalStorage()

  return { items, total, count, addItem, removeItem, updateQuantity }
})

