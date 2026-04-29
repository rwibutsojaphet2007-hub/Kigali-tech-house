import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    try {
      loading.value = true
      const response = await axios.get('https://fakestoreapi.com/products')
      products.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories')
      categories.value = response.data
    } catch (err) {
      error.value = err.message
    }
  }

  const fetchCategoryProducts = async (category) => {
    try {
      loading.value = true
      const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
      products.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const searchProducts = async (query) => {
    try {
      loading.value = true
      const response = await axios.get(`https://fakestoreapi.com/products/search?q=${query}`)
      products.value = response.data || []
    } catch (err) {
      error.value = err.message
      products.value = []
    } finally {
      loading.value = false
    }
  }

  return { products, categories, loading, error, fetchProducts, fetchCategories, fetchCategoryProducts, searchProducts }
})

