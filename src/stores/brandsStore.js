import { defineStore } from 'pinia'
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} from '../api/brandsApi'

import { getCarsByBrand } from '../api/carsApi'

export const useBrandsStore = defineStore('brands', {
  state: () => ({
    brands: [],
    currentBrand: null,
    loading: false,
    saving: false,
    error: null,
    lastFetchedAt: null
  }),

  actions: {
    async fetchList(search = '') {
      this.loading = true
      this.error = null

      try {
        this.brands = await getBrands(search)
        this.lastFetchedAt = new Date().toISOString()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      this.currentBrand = null

      try {
        this.currentBrand = await getBrandById(id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createBrand(brand) {
      this.saving = true
      this.error = null

      try {
        const existingBrands = await getBrands()

        const duplicate = existingBrands.find(
          item =>
            item.name.trim().toLowerCase() ===
            brand.name.trim().toLowerCase()
        )

        if (duplicate) {
          throw new Error(
            'A brand with this name already exists.'
          )
        }

        const createdBrand = await createBrand(brand)

        this.brands.unshift(createdBrand)

        return createdBrand
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },

    async updateBrand(id, brand) {
      this.saving = true
      this.error = null

      try {
        const existingBrands = await getBrands()

        const duplicate = existingBrands.find(
          item =>
            String(item.id) !== String(id) &&
            item.name.trim().toLowerCase() ===
              brand.name.trim().toLowerCase()
        )

        if (duplicate) {
          throw new Error(
            'A brand with this name already exists.'
          )
        }

        const updatedBrand = await updateBrand(id, brand)

        const index = this.brands.findIndex(
          item => String(item.id) === String(id)
        )

        if (index !== -1) {
          this.brands[index] = updatedBrand
        }

        if (
          this.currentBrand &&
          String(this.currentBrand.id) === String(id)
        ) {
          this.currentBrand = updatedBrand
        }

        return updatedBrand
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },

    async removeBrand(id) {
      this.saving = true
      this.error = null

      try {
        const relatedCars = await getCarsByBrand(id)

        if (relatedCars.length > 0) {
          throw new Error(
            'Cannot delete this brand because it still has cars.'
          )
        }

        await deleteBrand(id)

        this.brands = this.brands.filter(
          brand => String(brand.id) !== String(id)
        )
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    }
  }
})