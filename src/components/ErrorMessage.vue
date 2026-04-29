<template>
  <div role="alert" aria-live="assertive" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
    <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
    </svg>
    <div>
      <h3 class="text-lg font-semibold text-red-800 mb-1">{{ title }}</h3>
      <p class="text-red-700">{{ message }}</p>
      <button v-if="retryFn" @click="retryFn" class="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition">Try Again</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Something went wrong'
  },
  message: String,
  retryFn: Function
})
</script>

