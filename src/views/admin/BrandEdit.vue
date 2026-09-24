<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useBrandsStore } from '../../stores/brandsStore'
import { useToast } from '../../composables/useToast'

import BrandForm from '../../components/BrandForm.vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const brandsStore = useBrandsStore()
const toast = useToast()

onMounted(() => {
  brandsStore.fetchById(route.params.id)
})

const updateBrand = async brand => {
  try {
    await brandsStore.updateBrand(
      route.params.id,
      {
        ...brand,
        updatedAt: new Date().toISOString()
      }
    )

    toast.success('Brand updated successfully.')

    router.push('/admin/brands')
  } catch (error) {
    toast.error(error.message)
  }
}
</script>

<template>
  <div>

    <div class="mb-4">
      <h1 class="fw-bold">
        Edit Brand
      </h1>

      <p class="text-secondary">
        Update brand information.
      </p>
    </div>

    <LoadingSpinner v-if="brandsStore.loading" />

    <div
      v-else-if="!brandsStore.currentBrand"
      class="alert alert-danger"
    >
      Brand not found.
    </div>

    <BrandForm
      v-else
      :brand="brandsStore.currentBrand"
      :saving="brandsStore.saving"
      @submit="updateBrand"
      @cancel="router.push('/admin/brands')"
    />

  </div>
</template>