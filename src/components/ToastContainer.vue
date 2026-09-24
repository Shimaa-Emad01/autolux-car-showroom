<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-container-custom">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast-custom"
      :class="`toast-${toast.type}`"
    >
      <span>{{ toast.message }}</span>

      <button
        type="button"
        class="toast-close"
        @click="toastStore.remove(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>