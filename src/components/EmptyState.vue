<script setup>
defineProps({
  title: {
    type: String,
    default: 'Nothing Found'
  },
  message: {
    type: String,
    default: 'There is nothing to display right now.'
  }
})
</script>

<template>
  <div class="text-center py-5">

    <div class="empty-state-icon mb-3">
      🔍
    </div>

    <h3 class="fw-bold">
      {{ title }}
    </h3>

    <p class="text-secondary mb-0">
      {{ message }}
    </p>

  </div>
</template>