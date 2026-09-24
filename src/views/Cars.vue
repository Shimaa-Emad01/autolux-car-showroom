<script setup>
import { computed, onMounted, ref } from 'vue'

import { useCarsStore } from '../stores/carsStore'
import { useBrandsStore } from '../stores/brandsStore'

import CarCard from '../components/CarCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()

const searchQuery = ref('')
const selectedBrand = ref('')

onMounted(async () => {
  await Promise.all([
    carsStore.fetchList(),
    brandsStore.fetchList()
  ])
})

const filteredCars = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return carsStore.cars.filter(car => {
    const matchesSearch =
      !search ||
      car.name.toLowerCase().includes(search)

    const matchesBrand =
      !selectedBrand.value ||
      String(car.brandId) === String(selectedBrand.value)

    return matchesSearch && matchesBrand
  })
})

const getBrandName = brandId => {
  const brand = brandsStore.brands.find(
    item => String(item.id) === String(brandId)
  )

  return brand ? brand.name : 'Unknown Brand'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedBrand.value = ''
}

const retry = async () => {
  await Promise.all([
    carsStore.fetchList(),
    brandsStore.fetchList()
  ])
}
</script>

<template>
  <section class="container py-5">

    <!-- Page Header -->
    <div class="text-center mb-5">

      <span class="section-label">
        OUR COLLECTION
      </span>

      <h1 class="display-4 fw-bold mt-2">
        Browse Our Cars
      </h1>

      <p class="lead text-secondary">
        Explore our collection of premium cars from trusted brands.
      </p>

    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="carsStore.loading" />

    <!-- Error -->
    <div
      v-else-if="carsStore.error"
      class="alert alert-danger"
    >
      <strong>Something went wrong.</strong>

      <p class="mb-3">
        {{ carsStore.error }}
      </p>

      <button
        class="btn btn-dark"
        @click="retry"
      >
        Retry
      </button>
    </div>

    <template v-else>

      <!-- Filters -->
      <div class="row g-3 align-items-end mb-5">

        <!-- Search -->
        <div class="col-lg-6">

          <label
            for="carSearch"
            class="form-label fw-semibold"
          >
            Search Cars
          </label>

          <input
            id="carSearch"
            v-model="searchQuery"
            type="text"
            class="form-control form-control-lg"
            placeholder="Search by car name..."
          >

        </div>

        <!-- Brand Filter -->
        <div class="col-lg-3">

          <label
            for="brandFilter"
            class="form-label fw-semibold"
          >
            Filter by Brand
          </label>

          <select
            id="brandFilter"
            v-model="selectedBrand"
            class="form-select form-select-lg"
          >

            <option value="">
              All Brands
            </option>

            <option
              v-for="brand in brandsStore.brands"
              :key="brand.id"
              :value="brand.id"
            >
              {{ brand.name }}
            </option>

          </select>

        </div>

        <!-- Clear -->
        <div class="col-lg-3">

          <button
            class="btn btn-outline-dark btn-lg w-100"
            @click="clearFilters"
          >
            Clear Filters
          </button>

        </div>

      </div>

      <!-- Result Count -->
      <div class="mb-4">

        <p class="text-secondary mb-0">
          Showing
          <strong>{{ filteredCars.length }}</strong>
          car(s)
        </p>

      </div>

      <!-- No Results -->
      <EmptyState
        v-if="filteredCars.length === 0"
        title="No Cars Found"
        message="No cars match your current search or filter."
      />

      <!-- Cars -->
      <div
        v-else
        class="row g-4"
      >

        <div
          v-for="car in filteredCars"
          :key="car.id"
          class="col-md-6 col-lg-4"
        >

          <CarCard
            :car="car"
            :brand-name="getBrandName(car.brandId)"
          />

        </div>

      </div>

    </template>

  </section>
</template>