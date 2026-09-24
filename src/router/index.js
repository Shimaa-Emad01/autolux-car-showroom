import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Cars from '../views/Cars.vue'
import CarDetails from '../views/CarDetails.vue'
import Brands from '../views/Brands.vue'
import BrandDetails from '../views/BrandDetails.vue'

import AdminLogin from '../views/admin/AdminLogin.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import AdminCars from '../views/admin/AdminCars.vue'
import CarCreate from '../views/admin/CarCreate.vue'
import CarEdit from '../views/admin/CarEdit.vue'
import AdminBrands from '../views/admin/AdminBrands.vue'
import BrandCreate from '../views/admin/BrandCreate.vue'
import BrandEdit from '../views/admin/BrandEdit.vue'

import AdminLayout from '../components/AdminLayout.vue'

import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/cars',
    name: 'Cars',
    component: Cars
  },

  {
    path: '/cars/:id',
    name: 'CarDetails',
    component: CarDetails
  },

  {
    path: '/brands',
    name: 'Brands',
    component: Brands
  },

  {
    path: '/brands/:id',
    name: 'BrandDetails',
    component: BrandDetails
  },

  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      adminArea: true
    }
  },

  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      adminArea: true
    },

    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: Dashboard
      },

      {
        path: 'cars',
        name: 'AdminCars',
        component: AdminCars
      },

      {
        path: 'cars/new',
        name: 'CarCreate',
        component: CarCreate
      },

      {
        path: 'cars/:id/edit',
        name: 'CarEdit',
        component: CarEdit
      },

      {
        path: 'brands',
        name: 'AdminBrands',
        component: AdminBrands
      },

      {
        path: 'brands/new',
        name: 'BrandCreate',
        component: BrandCreate
      },

      {
        path: 'brands/:id/edit',
        name: 'BrandEdit',
        component: BrandEdit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(to => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAdmin) {
    return {
      name: 'AdminLogin'
    }
  }
})

export default router