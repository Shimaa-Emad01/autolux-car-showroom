<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCarsStore } from '../../stores/carsStore'
import { useBrandsStore } from '../../stores/brandsStore'
import { useToast } from '../../composables/useToast'

import CarForm from '../../components/CarForm.vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()
const toast = useToast()

onMounted(async () => {
  await Promise.all([
    carsStore.fetchById(route.params.id),
    brandsStore.fetchList()
  ])
})

const updateCar = async car => {
  try {
    await carsStore.updateCar(
      route.params.id,
      {
        ...car,
        updatedAt: new Date().toISOString()
      }
    )

    toast.success('Car updated successfully.')

    router.push('/admin/cars')
  } catch (error) {
    toast.error(error.message)
  }
}
</script>

<template>
  <div>

    <div class="mb-4">
      <h1 class="fw-bold">
        Edit Car
      </h1>

      <p class="text-secondary">
        Update vehicle information.
      </p>
    </div>

    <LoadingSpinner v-if="carsStore.loading || brandsStore.loading" />

    <div
      v-else-if="!carsStore.currentCar"
      class="alert alert-danger"
    >
      Car not found.
    </div>

    <CarForm
      v-else
      :car="carsStore.currentCar"
      :brands="brandsStore.brands"
      :saving="carsStore.saving"
      @submit="updateCar"
      @cancel="router.push('/admin/cars')"
    />

  </div>
</template>