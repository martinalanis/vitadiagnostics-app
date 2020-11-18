import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    component: () => import('@/layouts/Default'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        name: 'clientes',
        path: '/clientes',
        component: () => import('@/views/Clientes')
      },
      {
        name: 'usuarios',
        path: '/usuarios',
        component: () => import('@/views/Usuarios')
      },
      {
        name: 'refacciones',
        path: '/refacciones',
        component: () => import('@/views/Refacciones')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged']
  console.log(isLogged)
  const authorization = to.matched.some(record => record.meta.requiresAuth)

  // if (authorization && isLogged) {
  //   // manda a login si se quiere ingresar a ruta protegida sin estar logueado
  //   next()
  // } else if (authorization && !isLogged) {
  //   // envia a home si ya esta el usuario y se intenta ingresar a login
  //   next({ name: 'login' })
  // } else if (!authorization && isLogged) {
  //   /**
  //    * Dos posibles casos:
  //    * Se quiere ingresar a ruta protegida y se esta logueado
  //    * se quiere ingresar a login y no se esta logueado
  //    */
  //   next({ name: 'dashboard' })
  // } else {
  //   next({ name: 'login' })
  // }
  if (authorization && !isLogged) {
    // manda a login si se quiere ingresar a ruta protegida sin estar logueado
    next({ name: 'login' })
  } else if (!authorization && isLogged) {
    // envia a home si ya esta el usuario y se intenta ingresar a login
    next('dashboard')
  } else {
    /**
     * Dos posibles casos:
     * Se quiere ingresar a ruta protegida y se esta logueado
     * se quiere ingresar a login y no se esta logueado
     */
    console.log(to)
    next()
  }
})

export default router
