import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecipeManager from '../views/RecipeManager.vue'
import Reviews from '../views/Reviews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manager',
    name: 'Reciepe Manager',
    component: RecipeManager
  },
  {
    path: '/review',
    name: 'Review',
    component: Reviews
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
