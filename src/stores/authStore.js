import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: localStorage.getItem('autolux_admin') === 'true',
    error: null
  }),

  actions: {
    login(username, password) {
      if (username === 'admin' && password === '1234') {
        this.isAdmin = true
        this.error = null

        localStorage.setItem('autolux_admin', 'true')

        return true
      }

      this.error = 'Invalid username or password.'
      return false
    },

    logout() {
      this.isAdmin = false
      localStorage.removeItem('autolux_admin')
    }
  }
})