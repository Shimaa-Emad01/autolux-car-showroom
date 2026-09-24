<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    v-if="show"
    class="modal-backdrop-custom"
    @click.self="emit('cancel')"
  >
    <div class="modal-card-custom">

      <h4 class="fw-bold mb-3">
        {{ title }}
      </h4>

      <p class="text-secondary">
        {{ message }}
      </p>

      <div class="d-flex justify-content-end gap-2 mt-4">

        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="emit('cancel')"
        >
          Cancel
        </button>

        <button
          type="button"
          class="btn btn-danger"
          @click="emit('confirm')"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
</template>