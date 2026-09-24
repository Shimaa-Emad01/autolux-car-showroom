<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  car: {
    type: Object,
    default: null
  },
  brands: {
    type: Array,
    default: () => []
  },
  saving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  brandId: '',
  year: '',
  price: '',
  discount: 0,
  stock: 0,
  tags: '',
  imageUrl: '',
  description: ''
})

const errors = ref({})

const isEdit = computed(() => Boolean(props.car))

const resetForm = () => {
  form.name = props.car?.name || ''
  form.brandId = props.car?.brandId ?? ''
  form.year = props.car?.year || ''
  form.price = props.car?.price || ''
  form.discount = props.car?.discount ?? 0
  form.stock = props.car?.stock ?? 0
  form.tags = Array.isArray(props.car?.tags)
    ? props.car.tags.join(', ')
    : ''
  form.imageUrl = props.car?.imageUrl || ''
  form.description = props.car?.description || ''

  errors.value = {}
}

watch(
  () => props.car,
  () => {
    resetForm()
  },
  { immediate: true }
)

const validate = () => {
  errors.value = {}

  if (!form.name.trim()) {
    errors.value.name = 'Car name is required.'
  }

  if (!form.brandId) {
    errors.value.brandId = 'Please select a brand.'
  }

  if (!form.year || Number(form.year) < 1900) {
    errors.value.year = 'Please enter a valid year.'
  }

  if (!form.price || Number(form.price) <= 0) {
    errors.value.price = 'Price must be greater than 0.'
  }

  if (Number(form.discount) < 0 || Number(form.discount) > 100) {
    errors.value.discount = 'Discount must be between 0 and 100.'
  }

  if (Number(form.stock) < 0) {
    errors.value.stock = 'Stock cannot be negative.'
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
    brandId: Number(form.brandId),
    year: Number(form.year),
    price: Number(form.price),
    discount: Number(form.discount),
    stock: Number(form.stock),
    tags: form.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean),
    imageUrl: form.imageUrl.trim(),
    description: form.description.trim()
  })
}
</script>

<template>
  <form
    class="admin-form-card"
    @submit.prevent="submitForm"
  >

    <div class="row g-4">

      <div class="col-md-8">
        <label class="form-label fw-semibold">
          Car Name *
        </label>

        <input
          v-model="form.name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          placeholder="BMW M4 Competition"
        >

        <div
          v-if="errors.name"
          class="invalid-feedback"
        >
          {{ errors.name }}
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label fw-semibold">
          Brand *
        </label>

        <select
          v-model="form.brandId"
          class="form-select"
          :class="{ 'is-invalid': errors.brandId }"
        >
          <option value="">
            Select Brand
          </option>

          <option
            v-for="brand in brands"
            :key="brand.id"
            :value="brand.id"
          >
            {{ brand.name }}
          </option>
        </select>

        <div
          v-if="errors.brandId"
          class="invalid-feedback"
        >
          {{ errors.brandId }}
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label fw-semibold">
          Year *
        </label>

        <input
          v-model="form.year"
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errors.year }"
        >

        <div
          v-if="errors.year"
          class="invalid-feedback"
        >
          {{ errors.year }}
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label fw-semibold">
          Price *
        </label>

        <input
          v-model="form.price"
          type="number"
          min="0"
          class="form-control"
          :class="{ 'is-invalid': errors.price }"
        >

        <div
          v-if="errors.price"
          class="invalid-feedback"
        >
          {{ errors.price }}
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label fw-semibold">
          Discount %
        </label>

        <input
          v-model="form.discount"
          type="number"
          min="0"
          max="100"
          class="form-control"
          :class="{ 'is-invalid': errors.discount }"
        >

        <div
          v-if="errors.discount"
          class="invalid-feedback"
        >
          {{ errors.discount }}
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label fw-semibold">
          Stock *
        </label>

        <input
          v-model="form.stock"
          type="number"
          min="0"
          class="form-control"
          :class="{ 'is-invalid': errors.stock }"
        >

        <div
          v-if="errors.stock"
          class="invalid-feedback"
        >
          {{ errors.stock }}
        </div>
      </div>

      <div class="col-md-8">
        <label class="form-label fw-semibold">
          Tags
        </label>

        <input
          v-model="form.tags"
          type="text"
          class="form-control"
          placeholder="Luxury, Sport, Automatic"
        >

        <small class="text-secondary">
          Separate tags with commas.
        </small>
      </div>

      <div class="col-12">
        <label class="form-label fw-semibold">
          Image URL
        </label>

        <input
          v-model="form.imageUrl"
          type="url"
          class="form-control"
          placeholder="https://..."
        >
      </div>

      <div class="col-12">
        <label class="form-label fw-semibold">
          Description *
        </label>

        <textarea
          v-model="form.description"
          rows="5"
          class="form-control"
          :class="{ 'is-invalid': errors.description }"
          placeholder="Describe the car..."
        ></textarea>

        <div
          v-if="errors.description"
          class="invalid-feedback"
        >
          {{ errors.description }}
        </div>
      </div>

    </div>

    <div class="d-flex justify-content-end gap-2 mt-4">

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
        {{ saving ? 'Saving...' : isEdit ? 'Update Car' : 'Create Car' }}
      </button>

    </div>

  </form>
</template>