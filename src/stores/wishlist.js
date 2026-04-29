import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const toggleItem = (product) => {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push({ ...product })
    }
    saveToLocalStorage()
  }

  const isInWishlist = (id) => {
    return items.value.some(item => item.id === id)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('kigali-wishlist', JSON.stringify(items.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('kigali-wishlist')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  loadFromLocalStorage()

  return { items, toggleItem, isInWishlist }
})

