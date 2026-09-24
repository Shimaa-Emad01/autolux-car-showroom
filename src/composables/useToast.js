import { useToastStore } from '../stores/toastStore'

export function useToast() {
  const toastStore = useToastStore()

  return {
    success(message) {
      toastStore.show(message, 'success')
    },

    error(message) {
      toastStore.show(message, 'danger')
    },

    info(message) {
      toastStore.show(message, 'info')
    }
  }
}