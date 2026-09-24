<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  error.value = ''

  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Please enter username and password.'
    return
  }

  loading.value = true

  const success = authStore.login(
    username.value,
    password.value
  )

  if (!success) {
    error.value = authStore.error
    loading.value = false
    return
  }

  router.push('/admin')
}
</script>

<template>
  <section class="min-vh-100 d-flex align-items-center bg-light">

    <div class="container">

      <div class="row justify-content-center">

        <div class="col-md-5 col-lg-4">

          <div class="card border-0 shadow-sm p-4">

            <div class="text-center mb-4">

              <h2 class="fw-bold">
                AutoLux Admin
              </h2>

              <p class="text-secondary">
                Sign in to manage your showroom
              </p>

            </div>

            <div
              v-if="error"
              class="alert alert-danger"
            >
              {{ error }}
            </div>

            <form @submit.prevent="login">

              <div class="mb-3">

                <label class="form-label">
                  Username
                </label>

                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  placeholder="Enter username"
                >

              </div>

              <div class="mb-4">

                <label class="form-label">
                  Password
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                >

              </div>

              <button
                class="btn btn-dark w-100"
                :disabled="loading"
              >
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </button>

            </form>

            <RouterLink
              to="/"
              class="text-center mt-3 text-decoration-none text-secondary"
            >
              ← Back to website
            </RouterLink>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>