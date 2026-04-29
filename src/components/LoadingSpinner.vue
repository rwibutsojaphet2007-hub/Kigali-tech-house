<template>
  <div role="status" aria-label="Loading" class="flex items-center justify-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    <span v-if="showText" class="ml-2 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  showText: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Loading...'
  }
})
</script>

