import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    meta: {
      auth: true
    },
    component: () => import ('../views/Home.vue')
  },
  {
    name: 'qr_stream',
    path: '/qr_stream',
    meta: {
      auth: true
    },
    component: () => import('../views/QrPage.vue')
  },
  {
    name: 'qr_purchase_request',
    path: '/qr_purchase_request/:axiosUrl',
    meta: {
      auth: true
    },
    component: () => import('../views/QrPurchaseRequest.vue')
  },
  {
    name: 'settings',
    path: '/settings',
    meta: {
      auth: true
    },
    component: () => import('../views/Settings.vue')
  },
  {
    name: 'signin',
    path: '/signin',
    component: () => import('../views/auth/Signin.vue'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/login',
    redirect: '/signin',
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/404.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
