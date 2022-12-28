import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/Users/IndexView.vue'
import CreateView from '@/views/Users/CreateView.vue'

const routes = [
  {
    path: '/users',
    name: 'users.index',
    component: IndexView
  },
  {
    path: '/users/create',
    name: 'users.add',
    component: CreateView
  },
]  

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
