import Vue from 'vue';
import VueRouter from 'vue-router';

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
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main' },
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/record-details',
    name: 'RecordDetails',
    meta: { layout: 'main' },
    component: () => import('../views/RecordDetails.vue'),
  },
  {
    path: '/planing',
    name: 'Planing',
    meta: { layout: 'main' },
    component: () => import('../views/Planing.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main' },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/categories',
    name: 'Category',
    meta: { layout: 'main' },
    component: () => import('../views/Categories.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
