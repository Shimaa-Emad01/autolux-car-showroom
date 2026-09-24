<script setup>
import { computed, onMounted } from 'vue'

import { useCarsStore } from '../../stores/carsStore'
import { useBrandsStore } from '../../stores/brandsStore'

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()

onMounted(async () => {
  await Promise.all([
    carsStore.fetchList(),
    brandsStore.fetchList()
  ])
})

const totalCars = computed(() => carsStore.cars.length)

const totalBrands = computed(() => brandsStore.brands.length)

const totalStock = computed(() =>
  carsStore.cars.reduce(
    (total, car) => total + Number(car.stock || 0),
    0
  )
)

const averagePrice = computed(() => {
  if (!carsStore.cars.length) return 0

  const total = carsStore.cars.reduce(
    (sum, car) => sum + Number(car.price || 0),
    0
  )

  return total / carsStore.cars.length
})
</script>

<template>
  <div>

    <div class="mb-4">
      <h1 class="fw-bold">
        Dashboard
      </h1>

      <p class="text-secondary">
        Manage your AutoLux showroom.
      </p>
    </div>

    <div class="row g-4 mb-5">

      <div class="col-md-6 col-xl-3">
        <div class="admin-stat-card">
          <p class="text-secondary mb-2">
            Total Cars
          </p>

          <h2 class="fw-bold">
            {{ totalCars }}
          </h2>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="admin-stat-card">
          <p class="text-secondary mb-2">
            Total Brands
          </p>

          <h2 class="fw-bold">
            {{ totalBrands }}
          </h2>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="admin-stat-card">
          <p class="text-secondary mb-2">
            Available Stock
          </p>

          <h2 class="fw-bold">
            {{ totalStock }}
          </h2>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="admin-stat-card">
          <p class="text-secondary mb-2">
            Average Price
          </p>

          <h2 class="fw-bold">
            ${{ Math.round(averagePrice).toLocaleString() }}
          </h2>
        </div>
      </div>

    </div>

    <div class="row g-4">

      <div class="col-md-6">

        <div class="card border-0 shadow-sm p-4">

          <h5 class="fw-bold">
            Manage Cars
          </h5>

          <p class="text-secondary">
            Add, edit, delete and manage your car inventory.
          </p>

          <RouterLink
            to="/admin/cars"
            class="btn btn-dark"
          >
            Manage Cars
          </RouterLink>

        </div>

      </div>

      <div class="col-md-6">

        <div class="card border-0 shadow-sm p-4">

          <h5 class="fw-bold">
            Manage Brands
          </h5>

          <p class="text-secondary">
            Manage the automotive brands in your showroom.
          </p>

          <RouterLink
            to="/admin/brands"
            class="btn btn-dark"
          >
            Manage Brands
          </RouterLink>

        </div>

      </div>

    </div>

  </div>
</template>