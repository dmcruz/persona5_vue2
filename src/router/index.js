import Vue from 'vue'
import VueRouter from 'vue-router'
import P5List from '../views/P5List.vue'
import P5Detail from '../views/P5Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'P5List',
    component: P5List,
  },
  {
    path: '/persona/:name',
    component: P5Detail,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
