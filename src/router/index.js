import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  base:'/earlyRice',
  routes: [
    { path: '/', name: 'index', component: () => import('../views/index'), },
   
  ]
})

export default router
