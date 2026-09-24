<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  brand: {
    type: Object,
    default: null
  },
  saving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  logoUrl: '',
  description: ''
})

const errors = ref({})

watch(
  () => props.brand,
  brand => {
    form.name = brand?.name || ''
    form.logoUrl = brand?.logoUrl || ''
    form.description = brand?.description || ''
    errors.value = {}
  },
  { immediate: true }
)

const validate = () => {
  errors.value = {}

  if (!form.name.trim()) {
    errors.value.name = 'Brand name is required.'
  }

  if (!form.description.trim()) {
    errors.value.description = 'Description is required.'
  }

  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (!validate()) return

  emit('submit', {
    name: form.name.trim(),
    logoUrl: form.logoUrl.trim(),
    description: form.description.trim()
  })
}
</script>

<template>
  <form
    class="admin-form-card"
    @submit.prevent="submitForm"
  >

    <div class="mb-4">
      <label class="form-label fw-semibold">
        Brand Name *
      </label>

      <input
        v-model="form.name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.name }"
        placeholder="BMW"
      >

      <div
        v-if="errors.name"
        class="invalid-feedback"
      >
        {{ errors.name }}
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label fw-semibold">
        Logo URL
      </label>

      <input
        v-model="form.logoUrl"
        type="url"
        class="form-control"
        placeholder="https://..."
      >
    </div>

    <div class="mb-4">
      <label class="form-label fw-semibold">
        Description *
      </label>

      <textarea
        v-model="form.description"
        rows="6"
        class="form-control"
        :class="{ 'is-invalid': errors.description }"
        placeholder="Brand description..."
      ></textarea>

      <div
        v-if="errors.description"
        class="invalid-feedback"
      >
        {{ errors.description }}
      </div>
    </div>

    <div class="d-flex justify-content-end gap-2">

      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="emit('cancel')"
      >
        Cancel
      </button>

      <button
        type="submit"
        class="btn btn-dark"
        :disabled="saving"
      >
        {{ saving ? 'Saving...' : brand ? 'Update Brand' : 'Create Brand' }}
      </button>

    </div>

  </form>
</template>