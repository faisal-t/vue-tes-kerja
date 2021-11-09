import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/jenis',
  },
  {
    path: '/jenis',
    name: 'Jenis Barang',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/jenis/Index.vue')
  },
  {
    path: '/transaksi',
    name: 'Transaksi',
    component: () => import(/* webpackChunkName: "about" */ '../views/transaksi/Index.vue')
  },
  {
    path: '/barang',
    name: 'Barang',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/barang/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
