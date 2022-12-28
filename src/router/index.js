import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/Users/IndexView.vue'

const routes = [
  {
    path: '/users',
    name: 'users.index',
    component: IndexView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
