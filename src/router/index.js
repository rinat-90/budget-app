import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/record-detail/:id',
    name: 'RecordDetail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/RecordDetail.vue'),
  },
  {
    path: '/planing',
    name: 'Planing',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planing.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/categories',
    name: 'Category',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some(record => record.meta.auth);
  if(requiredAuth && !currentUser){
    next('/login?message=login')
  }else{
    next()
  }
});

export default router;
