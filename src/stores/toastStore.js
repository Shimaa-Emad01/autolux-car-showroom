import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),

  actions: {
    show(message, type = 'success') {
      const id = Date.now() + Math.random()

      this.toasts.push({
        id,
        message,
        type
      })

      setTimeout(() => {
        this.remove(id)
      }, 3500)
    },

    remove(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id)
    }
  }
})