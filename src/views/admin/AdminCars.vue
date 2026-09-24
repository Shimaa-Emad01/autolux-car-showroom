<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useCarsStore } from '../../stores/carsStore'
import { useBrandsStore } from '../../stores/brandsStore'
import { useToast } from '../../composables/useToast'

import BaseModal from '../../components/BaseModal.vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'
import EmptyState from '../../components/EmptyState.vue'

const router = useRouter()

const carsStore = useCarsStore()
const brandsStore = useBrandsStore()
const toast = useToast()

const search = ref('')
const showDeleteModal = ref(false)
const carToDelete = ref(null)

onMounted(async () => {
  await Promise.all([
    carsStore.fetchList(),
    brandsStore.fetchList()
  ])
})

const filteredCars = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return carsStore.cars

  return carsStore.cars.filter(car =>
    car.name.toLowerCase().includes(query)
  )
})

const getBrandName = brandId => {
  const brand = brandsStore.brands.find(
    item => String(item.id) === String(brandId)
  )

  return brand?.name || 'Unknown'
}

const openDelete = car => {
  carToDelete.value = car
  showDeleteModal.value = true
}

const deleteCar = async () => {
  if (!carToDelete.value) return

  try {
    await carsStore.removeCar(carToDelete.value.id)

    toast.success('Car deleted successfully.')

    showDeleteModal.value = false
    carToDelete.value = null
  } catch (error) {
    toast.error(error.message)
  }
}
</script>

<template>
  <div>

    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h1 class="fw-bold mb-1">
          Cars
        </h1>

        <p class="text-secondary mb-0">
          Manage your car inventory.
        </p>
      </div>

      <button
        class="btn btn-dark"
        @click="router.push('/admin/cars/new')"
      >
        + Add New Car
      </button>

    </div>

    <div class="card border-0 shadow-sm p-3 mb-4">

      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Search cars..."
      >

    </div>

    <LoadingSpinner v-if="carsStore.loading" />

    <div
      v-else-if="carsStore.error"
      class="alert alert-danger"
    >
      {{ carsStore.error }}
    </div>

    <EmptyState
      v-else-if="filteredCars.length === 0"
      title="No Cars Found"
      message="There are no cars matching your search."
    />

    <div
      v-else
      class="admin-table shadow-sm"
    >

      <div class="table-responsive">

        <table class="table table-hover align-middle mb-0">

          <thead class="table-light">

            <tr>
              <th>Car</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="car in filteredCars"
              :key="car.id"
            >

              <td>
                <div class="d-flex align-items-center gap-3">

                  <img
                    :src="car.imageUrl"
                    :alt="car.name"
                    class="admin-table-image"
                  >

                  <strong>
                    {{ car.name }}
                  </strong>

                </div>
              </td>

              <td>
                {{ getBrandName(car.brandId) }}
              </td>

              <td>
                {{ car.year }}
              </td>

              <td>
                ${{ Number(car.price).toLocaleString() }}
              </td>

              <td>
                <span
                  class="badge"
                  :class="Number(car.stock) > 0
                    ? 'bg-success'
                    : 'bg-danger'"
                >
                  {{ car.stock }}
                </span>
              </td>

              <td>

                <div class="d-flex gap-2">

                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="router.push(`/admin/cars/${car.id}/edit`)"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="openDelete(car)"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    <BaseModal
      :show="showDeleteModal"
      title="Delete Car"
      :message="`Are you sure you want to delete ${carToDelete?.name}?`"
      @confirm="deleteCar"
      @cancel="showDeleteModal = false"
    />

  </div>
</template>