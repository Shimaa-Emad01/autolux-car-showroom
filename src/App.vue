<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastContainer from './components/ToastContainer.vue'

const route = useRoute()

const isAdminArea = computed(() => {
  return route.meta.adminArea === true
})
</script>

<template>

  <template v-if="!isAdminArea">
    <Navbar />
  </template>

  <main>
    <RouterView />
  </main>

  <template v-if="!isAdminArea">
    <Footer />
  </template>

  <ToastContainer />

</template>