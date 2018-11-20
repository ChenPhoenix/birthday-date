import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index/Index'
import Register from '@/components/Register/Register'
import List from '@/components/List/List'

Vue.use(Router)

export default new Router({
    // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
      {
          path: '/',
          component: Index
      },
      {
          path: '/register',
          component: Register
      },
      {
          path: '/list',
          component: List
      }
  ]
})
