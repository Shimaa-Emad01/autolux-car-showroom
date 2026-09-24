<script setup>
import { useRouter } from 'vue-router'

import { useBrandsStore } from '../../stores/brandsStore'
import { useToast } from '../../composables/useToast'

import BrandForm from '../../components/BrandForm.vue'

const router = useRouter()

const brandsStore = useBrandsStore()
const toast = useToast()

const createBrand = async brand => {
  try {
    await brandsStore.createBrand({
      ...brand,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    toast.success('Brand created successfully.')

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
        Add New Brand
      </h1>

      <p class="text-secondary">
        Add a new automotive brand.
      </p>
    </div>

    <BrandForm
      :saving="brandsStore.saving"
      @submit="createBrand"
      @cancel="router.push('/admin/brands')"
    />

  </div>
</template>