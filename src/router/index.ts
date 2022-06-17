import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ModalView from '../views/ModalView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'modal',
    component: ModalView
  },
  {
    path: '/i18n',
    name: 'i18n',
    component: () => import(/* webpackChunkName: "i18n" */ '../views/I18nView.vue')
  },
  {
    path: '/date',
    name: 'datepick',
    component: () => import(/* webpackChunkName: "date" */ '../views/DatepickView.vue')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import(/* webpackChunkName: "date" */ '../views/LoadingView.vue')
  },
  {
    path: '/keyfeature',
    name: 'keyfeature',
    component: () => import(/* webpackChunkName: "keyfeature" */ '../views/KeyFeatureView.vue')
  },
  {
    path: '/routerview',
    name: 'routerview',
    component: () => import(/* webpackChunkName: "routerview" */ '../views/RouterView.vue'),
    children:[
      {
        path: 'hello',
        name: 'hello',
        component: ()=> import(/* webpackChunkName: "hello" */ '../components/Hello.vue'),
        props($route){  //把收到的query參數，做為props傳給Hello
          return { msg: $route.query.msg }
        },
        meta :{
          data : 'hello'
        }
      },
      {
        path: 'world/:msg',
        name: 'world',
        component: ()=> import(/* webpackChunkName: "world" */  '../components/World.vue'),
        props : true, //把收到的param參數當作props傳給World
        meta :{
          data : 'world'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
