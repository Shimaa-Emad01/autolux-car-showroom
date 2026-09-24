<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="admin-layout">

    <aside class="admin-sidebar">

      <div class="admin-logo">
        AutoLux
      </div>

      <nav class="admin-nav">

        <RouterLink to="/admin">
          Dashboard
        </RouterLink>

        <RouterLink to="/admin/cars">
          Cars
        </RouterLink>

        <RouterLink to="/admin/brands">
          Brands
        </RouterLink>

      </nav>

      <button
        class="btn btn-outline-light w-100 mt-auto"
        @click="logout"
      >
        Logout
      </button>

    </aside>

    <main class="admin-content">

      <div class="admin-topbar">
        <h5 class="mb-0">
          AutoLux Admin
        </h5>

        <span class="text-secondary">
          Administrator
        </span>
      </div>

      <div class="container-fluid p-4">
        <RouterView />
      </div>

    </main>

  </div>
</template>