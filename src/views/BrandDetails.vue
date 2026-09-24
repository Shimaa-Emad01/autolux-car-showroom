<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useBrandsStore } from '../stores/brandsStore'
import { useCarsStore } from '../stores/carsStore'

import CarCard from '../components/CarCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import AiChatWidget from '../components/AiChatWidget.vue'

const route = useRoute()

const brandsStore = useBrandsStore()
const carsStore = useCarsStore()

onMounted(async () => {
  await brandsStore.fetchById(route.params.id)
  await carsStore.fetchByBrand(route.params.id)
})

const brand = computed(() => brandsStore.currentBrand)

const cars = computed(() => carsStore.relatedCars)

const aiEntity = computed(() => {
  if (!brand.value) return null

  return {
    ...brand.value
  }
})
</script>

<template>

  <LoadingSpinner
    v-if="brandsStore.loading"
  />

  <div
    v-else-if="brandsStore.error"
    class="container py-5"
  >
    <div class="alert alert-danger">
      {{ brandsStore.error }}
    </div>
  </div>

  <div
    v-else-if="!brand"
    class="container py-5"
  >
    <EmptyState
      title="Brand Not Found"
      message="The brand you are looking for does not exist."
    />
  </div>

  <template v-else>

    <section class="brand-details-hero py-5">

      <div class="container">

        <div class="row align-items-center g-5">

          <div class="col-lg-4 text-center">

            <div class="brand-logo-large">

              <img
                v-if="brand.logoUrl"
                :src="brand.logoUrl"
                :alt="brand.name"
              >

              <span v-else>
                {{ brand.name.charAt(0) }}
              </span>

            </div>

          </div>

          <div class="col-lg-8">

            <span class="section-label">
              AUTOMOTIVE BRAND
            </span>

            <h1 class="display-4 fw-bold mt-2">
              {{ brand.name }}
            </h1>

            <p class="lead text-secondary mt-3">
              {{ brand.description }}
            </p>

          </div>

        </div>

      </div>

    </section>

    <section class="container py-5">

      <div class="text-center mb-5">

        <span class="section-label">
          OUR COLLECTION
        </span>

        <h2 class="fw-bold mt-2">
          {{ brand.name }} Cars
        </h2>

      </div>

      <LoadingSpinner
        v-if="carsStore.relatedLoading"
      />

      <EmptyState
        v-else-if="cars.length === 0"
        title="No Cars Found"
        message="This brand currently has no cars."
      />

      <div
        v-else
        class="row g-4"
      >

        <div
          v-for="car in cars"
          :key="car.id"
          class="col-md-6 col-lg-4"
        >

          <CarCard
            :car="car"
            :brand-name="brand.name"
          />

        </div>

      </div>

    </section>

    <AiChatWidget
      v-if="aiEntity"
      entity-type="brand"
      :entity="aiEntity"
    />

  </template>

</template>