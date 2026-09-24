<script setup>
import { computed, onMounted, ref } from 'vue'
import { useBrandsStore } from '../stores/brandsStore'
import BrandCard from '../components/BrandCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'

const brandsStore = useBrandsStore()

const search = ref('')

onMounted(() => {
  brandsStore.fetchList()
})

const filteredBrands = computed(() => {
  const searchText = search.value.trim().toLowerCase()

  return brandsStore.brands.filter(brand =>
    brand.name.toLowerCase().includes(searchText)
  )
})

const clearSearch = () => {
  search.value = ''
}
</script>

<template>
  <section class="container py-5">

    <!-- Header -->

    <div class="text-center mb-5">

      <span class="text-uppercase text-secondary small fw-bold">
        Automotive Brands
      </span>

      <h1 class="display-5 fw-bold mt-2">
        Explore Our Brands
      </h1>

      <p class="text-secondary">
        Discover cars from some of the world's most recognized brands.
      </p>

    </div>

    <!-- Search -->

    <div class="row justify-content-center mb-5">

      <div class="col-md-8">

        <label
          for="brandSearch"
          class="form-label fw-semibold"
        >
          Search Brands
        </label>

        <div class="input-group">

          <input
            id="brandSearch"
            v-model="search"
            type="search"
            class="form-control"
            placeholder="Search by brand name..."
          >

          <button
            class="btn btn-outline-dark"
            @click="clearSearch"
          >
            Clear
          </button>

        </div>

      </div>

    </div>

    <!-- Loading -->

    <LoadingSpinner v-if="brandsStore.loading" />

    <!-- Error -->

    <div v-else-if="brandsStore.error">

      <div class="alert alert-danger">
        {{ brandsStore.error }}
      </div>

      <button
        class="btn btn-dark"
        @click="brandsStore.fetchList"
      >
        Retry
      </button>

    </div>

    <!-- Empty -->

    <EmptyState
      v-else-if="filteredBrands.length === 0"
      title="No Brands Found"
      message="Try another search term."
    />

    <!-- Brands -->

    <div
      v-else
      class="row g-4"
    >

      <div
        v-for="brand in filteredBrands"
        :key="brand.id"
        class="col-md-6 col-lg-4"
      >

        <BrandCard :brand="brand" />

      </div>

    </div>

  </section>
</template>