<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useBrandsStore } from '../../stores/brandsStore'
import { useCarsStore } from '../../stores/carsStore'
import { useToast } from '../../composables/useToast'

import BaseModal from '../../components/BaseModal.vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'
import EmptyState from '../../components/EmptyState.vue'

const router = useRouter()

const brandsStore = useBrandsStore()
const carsStore = useCarsStore()
const toast = useToast()

const search = ref('')
const showDeleteModal = ref(false)
const brandToDelete = ref(null)

onMounted(async () => {
  await Promise.all([
    brandsStore.fetchList(),
    carsStore.fetchList()
  ])
})

const filteredBrands = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return brandsStore.brands

  return brandsStore.brands.filter(brand =>
    brand.name.toLowerCase().includes(query)
  )
})

const getCarCount = brandId => {
  return carsStore.cars.filter(
    car => String(car.brandId) === String(brandId)
  ).length
}

const openDelete = brand => {
  brandToDelete.value = brand
  showDeleteModal.value = true
}

const deleteBrand = async () => {
  if (!brandToDelete.value) return

  try {
    await brandsStore.removeBrand(brandToDelete.value.id)

    toast.success('Brand deleted successfully.')

    showDeleteModal.value = false
    brandToDelete.value = null
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
          Brands
        </h1>

        <p class="text-secondary mb-0">
          Manage automotive brands.
        </p>
      </div>

      <button
        class="btn btn-dark"
        @click="router.push('/admin/brands/new')"
      >
        + Add New Brand
      </button>

    </div>

    <div class="card border-0 shadow-sm p-3 mb-4">

      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Search brands..."
      >

    </div>

    <LoadingSpinner v-if="brandsStore.loading" />

    <div
      v-else-if="brandsStore.error"
      class="alert alert-danger"
    >
      {{ brandsStore.error }}
    </div>

    <EmptyState
      v-else-if="filteredBrands.length === 0"
      title="No Brands Found"
      message="There are no brands matching your search."
    />

    <div
      v-else
      class="admin-table shadow-sm"
    >

      <div class="table-responsive">

        <table class="table table-hover align-middle mb-0">

          <thead class="table-light">

            <tr>
              <th>Brand</th>
              <th>Description</th>
              <th>Cars</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="brand in filteredBrands"
              :key="brand.id"
            >

              <td>
                <div class="d-flex align-items-center gap-3">

                  <div class="admin-brand-logo">
                    <img
                      v-if="brand.logoUrl"
                      :src="brand.logoUrl"
                      :alt="brand.name"
                    >

                    <span v-else>
                      {{ brand.name.charAt(0) }}
                    </span>
                  </div>

                  <strong>
                    {{ brand.name }}
                  </strong>

                </div>
              </td>

              <td>
                <span class="text-secondary">
                  {{ brand.description }}
                </span>
              </td>

              <td>
                {{ getCarCount(brand.id) }}
              </td>

              <td>

                <div class="d-flex gap-2">

                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="router.push(`/admin/brands/${brand.id}/edit`)"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="openDelete(brand)"
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
      title="Delete Brand"
      :message="`Are you sure you want to delete ${brandToDelete?.name}?`"
      @confirm="deleteBrand"
      @cancel="showDeleteModal = false"
    />

  </div>
</template>