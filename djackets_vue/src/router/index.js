import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import MyAccount from '../views/MyAccount.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:category_slug/:product_slug/',
    name: 'product-details',
    component: Product
  },
  {
    path: '/:category_slug',
    name: 'category',
    component: Category
  },
  {
	path: '/search',
	name: 'search',
	component: Search
  },
  {
	path: '/cart',
  	name: 'cart',
  	component: Cart
  },
  {
	path: '/signup',
	name: 'signup',
	component: SignUp
  },
  {
	path: '/log-in',
	name: 'LogIn',
	component: Login
  },
  {
	path: '/my-account',
	name: 'MyAccount',
	component: MyAccount,
	meta: {
		requireLogin: true
	}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
		next({ name: 'Login', query: { to: to.path } });
	} else {
		next()
	}
})

export default router
