import { defineStore } from 'pinia'
import {
  getCars,
  getCarById,
  getCarsByBrand,
  createCar,
  updateCar,
  deleteCar,
  updateCarStock
} from '../api/carsApi'

import { getBrandById } from '../api/brandsApi'

export const useCarsStore = defineStore('cars', {
  state: () => ({
    cars: [],
    currentCar: null,
    relatedCars: [],
    loading: false,
    relatedLoading: false,
    saving: false,
    error: null,
    lastFetchedAt: null
  }),

  actions: {
    async fetchList() {
      this.loading = true
      this.error = null

      try {
        const data = await getCars()

        this.cars = data
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
      this.currentCar = null

      try {
        this.currentCar = await getCarById(id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchByBrand(brandId) {
      this.relatedLoading = true

      try {
        this.relatedCars = await getCarsByBrand(brandId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.relatedLoading = false
      }
    },

    async createCar(car) {
      this.saving = true
      this.error = null

      try {
        await getBrandById(car.brandId)

        const allCars = await getCars()

        const duplicate = allCars.find(
          item =>
            item.name.trim().toLowerCase() ===
              car.name.trim().toLowerCase() &&
            String(item.brandId) === String(car.brandId)
        )

        if (duplicate) {
          throw new Error(
            'A car with this name already exists for this brand.'
          )
        }

        const createdCar = await createCar(car)

        this.cars.unshift(createdCar)

        return createdCar
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },

    async updateCar(id, car) {
      this.saving = true
      this.error = null

      try {
        await getBrandById(car.brandId)

        const allCars = await getCars()

        const duplicate = allCars.find(
          item =>
            String(item.id) !== String(id) &&
            item.name.trim().toLowerCase() ===
              car.name.trim().toLowerCase() &&
            String(item.brandId) === String(car.brandId)
        )

        if (duplicate) {
          throw new Error(
            'A car with this name already exists for this brand.'
          )
        }

        const updatedCar = await updateCar(id, car)

        const index = this.cars.findIndex(
          item => String(item.id) === String(id)
        )

        if (index !== -1) {
          this.cars[index] = updatedCar
        }

        if (
          this.currentCar &&
          String(this.currentCar.id) === String(id)
        ) {
          this.currentCar = updatedCar
        }

        return updatedCar
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },

    async removeCar(id) {
      this.saving = true
      this.error = null

      try {
        await deleteCar(id)

        this.cars = this.cars.filter(
          car => String(car.id) !== String(id)
        )
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },

    async buyCar(car) {
      if (Number(car.stock) <= 0) {
        return
      }

      const newStock = Number(car.stock) - 1

      try {
        const updatedCar = await updateCarStock(
          car.id,
          newStock
        )

        const index = this.cars.findIndex(
          item => String(item.id) === String(car.id)
        )

        if (index !== -1) {
          this.cars[index] = updatedCar
        }

        if (
          this.currentCar &&
          String(this.currentCar.id) === String(car.id)
        ) {
          this.currentCar = updatedCar
        }

        return updatedCar
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})