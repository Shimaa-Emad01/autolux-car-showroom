<template>
  <div class="card h-100 border-0 shadow-sm brand-card">

    <div class="text-center pt-4">

      <img
        :src="brand.logoUrl"
        :alt="brand.name"
        class="brand-logo"
      >

    </div>

    <div class="card-body text-center">

      <h4 class="fw-bold">
        {{ brand.name }}
      </h4>

      <p class="text-secondary">
        {{ brand.description }}
      </p>

      <RouterLink
        :to="`/brands/${brand.id}`"
        class="btn btn-dark"
      >
        Explore Brand
      </RouterLink>

    </div>

  </div>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    required: true
  }
})
</script>