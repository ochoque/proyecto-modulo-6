import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/fabricantes',
    name: 'fabricantes',
    component: () => import(/* webpackChunkName: "fabricantes" */ '../views/FabricanteView.vue')
  },
  {
    path: '/fabricante/:id',
    name: 'FabricanteEdit',
    component: () => import(/* webpackChunkName: "FabricanteEdit" */ '../views/FabricanteEditView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import(/* webpackChunkName: "productos" */ '../views/ProductoView.vue')
  },
  {
    path: '/producto/:id',
    name: 'ProductoEdit',
    component: () => import(/* webpackChunkName: "ProductoEdit" */ '../views/ProductoEditView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
