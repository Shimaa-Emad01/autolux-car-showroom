<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useCarsStore } from '../stores/carsStore'
import { useBrandsStore } from '../stores/brandsStore'

import CarHero from '../components/CarHero.vue'
import CarCard from '../components/CarCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import AiChatWidget from '../components/AiChatWidget.vue'

const route = useRoute()

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()

onMounted(async () => {
  await carsStore.fetchById(route.params.id)

  if (carsStore.currentCar) {
    await brandsStore.fetchById(
      carsStore.currentCar.brandId
    )

    await carsStore.fetchByBrand(
      carsStore.currentCar.brandId
    )
  }
})

const relatedCars = computed(() => {
  return carsStore.relatedCars.filter(
    car =>
      String(car.id) !==
      String(carsStore.currentCar?.id)
  )
})

const aiEntity = computed(() => {
  if (!carsStore.currentCar) {
    return null
  }

  return {
    ...carsStore.currentCar,
    brandName:
      brandsStore.currentBrand?.name || 'Unknown Brand'
  }
})
</script>

<template>

  <!-- Loading -->
  <LoadingSpinner
    v-if="carsStore.loading"
  />

  <!-- Error -->
  <div
    v-else-if="carsStore.error"
    class="container py-5"
  >

    <div class="alert alert-danger">
      {{ carsStore.error }}
    </div>

  </div>

  <!-- Not Found -->
  <div
    v-else-if="!carsStore.currentCar"
    class="container py-5"
  >

    <EmptyState
      title="Car Not Found"
      message="The car you are looking for does not exist."
    />

  </div>

  <!-- Details -->
  <template v-else>

    <CarHero
      :car="carsStore.currentCar"
      :brand="brandsStore.currentBrand"
    />

    <!-- Car Information -->
    <section class="container py-5">

      <div class="row g-4">

        <div class="col-lg-8">

          <span class="section-label">
            ABOUT THIS CAR
          </span>

          <h2 class="fw-bold mt-2 mb-3">
            {{ carsStore.currentCar.name }}
          </h2>

          <p class="text-secondary lead">
            {{ carsStore.currentCar.description }}
          </p>

        </div>

        <div class="col-lg-4">

          <div class="card border-0 shadow-sm p-4">

            <h5 class="fw-bold mb-4">
              Car Information
            </h5>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-secondary">
                Year
              </span>

              <strong>
                {{ carsStore.currentCar.year }}
              </strong>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-secondary">
                Brand
              </span>

              <strong>
                {{ brandsStore.currentBrand?.name || 'Unknown' }}
              </strong>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-secondary">
                Stock
              </span>

              <strong>
                {{ carsStore.currentCar.stock }}
              </strong>
            </div>

            <div class="d-flex justify-content-between">
              <span class="text-secondary">
                Price
              </span>

              <strong>
                ${{ Number(carsStore.currentCar.price).toLocaleString() }}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- Related Cars -->
    <section
      v-if="relatedCars.length > 0"
      class="related-section py-5"
    >

      <div class="container">

        <div class="text-center mb-5">

          <span class="section-label">
            YOU MAY ALSO LIKE
          </span>

          <h2 class="fw-bold mt-2">
            Related Cars
          </h2>

          <p class="text-secondary">
            More cars from the same brand.
          </p>

        </div>

        <div class="row g-4">

          <div
            v-for="car in relatedCars"
            :key="car.id"
            class="col-md-6 col-lg-4"
          >

            <CarCard
              :car="car"
              :brand-name="brandsStore.currentBrand?.name"
            />

          </div>

        </div>

      </div>

    </section>

    <!-- AI -->
    <AiChatWidget
      v-if="aiEntity"
      entity-type="car"
      :entity="aiEntity"
    />

  </template>

</template>