<script setup>
import { computed } from 'vue'
import { useCarsStore } from '../stores/carsStore'

const props = defineProps({
  car: {
    type: Object,
    required: true
  },

  brand: {
    type: Object,
    default: null
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
  <section class="car-hero py-5">

    <div class="container">

      <div class="row align-items-center g-5">

        <!-- Image -->
        <div class="col-lg-7">

          <div class="car-hero-image-wrapper">

            <img
              :src="car.imageUrl"
              :alt="car.name"
              class="car-hero-image"
            >

          </div>

        </div>

        <!-- Information -->
        <div class="col-lg-5">

          <p class="text-uppercase text-secondary fw-semibold mb-2">
            Premium Car
          </p>

          <h1 class="display-5 fw-bold mb-3">
            {{ car.name }}
          </h1>

          <RouterLink
            v-if="brand"
            :to="`/brands/${brand.id}`"
            class="text-decoration-none"
          >
            {{ brand.name }}
          </RouterLink>

          <p class="text-secondary mt-4">
            {{ car.description }}
          </p>

          <!-- Price -->
          <div class="my-4">

            <template v-if="Number(car.discount) > 0">

              <span class="text-muted text-decoration-line-through me-2">
                ${{ Number(car.price).toLocaleString() }}
              </span>

              <span class="fs-3 fw-bold text-success">
                ${{ discountedPrice.toLocaleString() }}
              </span>

              <span class="badge bg-warning text-dark ms-2">
                -{{ car.discount }}%
              </span>

            </template>

            <template v-else>

              <span class="fs-3 fw-bold">
                ${{ Number(car.price).toLocaleString() }}
              </span>

            </template>

          </div>

          <!-- Stock -->
          <p
            v-if="Number(car.stock) > 0"
            class="text-success fw-semibold"
          >
            {{ car.stock }} in stock
          </p>

          <p
            v-else
            class="text-danger fw-semibold"
          >
            Out of stock
          </p>

          <button
            class="btn btn-dark btn-lg mt-3"
            :disabled="Number(car.stock) === 0"
            @click="buyNow"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>

  </section>
</template>