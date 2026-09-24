<script setup>
import { computed } from 'vue'
import { useCarsStore } from '../stores/carsStore'

const props = defineProps({
  car: {
    type: Object,
    required: true
  },

  brandName: {
    type: String,
    default: ''
  }
})

const carsStore = useCarsStore()

const discountedPrice = computed(() => {
  const price = Number(props.car.price)
  const discount = Number(props.car.discount)

  return price - (price * discount) / 100
})

const buyNow = async () => {
  await carsStore.buyCar(props.car)
}
</script>

<template>
  <div class="card car-card h-100 border-0 shadow-sm">

    <!-- Image -->
    <div class="car-card-image-wrapper">

      <img
        :src="car.imageUrl"
        :alt="car.name"
        class="car-card-image"
      >

    </div>

    <!-- Body -->
    <div class="card-body d-flex flex-column p-4">

      <p class="car-brand mb-1">
        {{ brandName }}
      </p>

      <h5 class="card-title fw-bold mb-2">
        {{ car.name }}
      </h5>

      <p class="card-text text-secondary car-description">
        {{ car.description }}
      </p>

      <!-- Price -->
      <div class="mb-3">

        <template v-if="Number(car.discount) > 0">

          <span class="text-muted text-decoration-line-through me-2">
            ${{ Number(car.price).toLocaleString() }}
          </span>

          <span class="fw-bold text-success fs-5">
            ${{ discountedPrice.toLocaleString() }}
          </span>

          <span class="badge bg-warning text-dark ms-2">
            -{{ car.discount }}%
          </span>

        </template>

        <template v-else>

          <span class="fw-bold fs-5">
            ${{ Number(car.price).toLocaleString() }}
          </span>

        </template>

      </div>

      <!-- Tags -->
      <div class="mb-3">

        <span
          v-for="tag in car.tags"
          :key="tag"
          class="badge bg-light text-dark border me-1 mb-1"
        >
          {{ tag }}
        </span>

      </div>

      <!-- Stock -->
      <p
        v-if="Number(car.stock) > 0"
        class="text-success fw-semibold mb-3"
      >
        {{ car.stock }} in stock
      </p>

      <p
        v-else
        class="text-danger fw-semibold mb-3"
      >
        Out of stock
      </p>

      <!-- Buttons -->
      <div class="mt-auto d-flex gap-2">

        <RouterLink
          :to="`/cars/${car.id}`"
          class="btn btn-outline-dark flex-grow-1"
        >
          View Details
        </RouterLink>

        <button
          class="btn btn-dark"
          :disabled="Number(car.stock) === 0"
          @click="buyNow"
        >
          Buy Now
        </button>

      </div>

    </div>

  </div>
</template>