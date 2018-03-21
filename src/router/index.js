import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home';
import Product from '@/components/Product';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Checkout from '@/components/Checkout';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/product/:id',
      name: 'product/:id',
      component: Product
    },
    {
      path: '/checkout/:id',
      name: 'checkout/:id',
      component: Checkout
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
