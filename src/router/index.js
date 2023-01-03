import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/Users/IndexView.vue'
import CreateView from '@/views/Users/CreateView.vue'
import EditView from '@/views/Users/EditView.vue'
import AddressView from '@/views/Users/AddressView.vue'

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
    {
    path: '/users/:id',
    name: 'users.edit',
    component: EditView,
    props: true
  },
  {
    path: '/users/address/:id',
    name: 'users.address',
    component: AddressView,
    props: true
  },
]  

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
