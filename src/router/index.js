import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/products',
      component: () => import('../views/ProductsLayout.vue'),
      children: [
        { 
          path: '', 
          name: 'products',
          component: () => import('../views/ProductsList.vue')
        },
        { 
          path: ':id', 
          name: 'product-detail', 
          component: () => import('../views/ProductDetail.vue'),
          props: true 
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/Wishlist.vue')
    },
    {
      path: '/checkout',
      meta: { requiresAuth: true },
      name: 'checkout',
      component: () => import('../views/Checkout.vue')
    },
    {
      path: '/profile',
      meta: { requiresAuth: true },
      component: () => import('../views/ProfileLayout.vue'),
      children: [
        { 
          path: '', 
          redirect: '/profile/orders' 
        },
        { 
          path: 'orders', 
          name: 'profile-orders',
          component: () => import('../views/ProfileOrders.vue')
        },
        { 
          path: 'wishlist', 
          name: 'profile-wishlist',
          component: () => import('../views/ProfileWishlist.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

// Global navigation guards - simplified without dynamic import
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('kigali-token') !== null
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

