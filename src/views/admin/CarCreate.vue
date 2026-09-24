<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCarsStore } from '../../stores/carsStore'
import { useBrandsStore } from '../../stores/brandsStore'
import { useToast } from '../../composables/useToast'

import CarForm from '../../components/CarForm.vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'

const router = useRouter()

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()
const toast = useToast()

onMounted(() => {
  brandsStore.fetchList()
})

const createCar = async car => {
  try {
    await carsStore.createCar({
      ...car,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    toast.success('Car created successfully.')

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
        Add New Car
      </h1>

      <p class="text-secondary">
        Add a new vehicle to your showroom.
      </p>
    </div>

    <LoadingSpinner v-if="brandsStore.loading" />

    <CarForm
      v-else
      :brands="brandsStore.brands"
      :saving="carsStore.saving"
      @submit="createCar"
      @cancel="router.push('/admin/cars')"
    />

  </div>
</template>