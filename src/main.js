import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import VueMeta from 'vue-meta';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from './directives/tooltip.directives'
import messagePlugin from './utils/message.plugin';
import titlePlugin from './utils/title.plugin'
import AppLoader from "./components/Partials/Loader";
import Paginate from 'vuejs-paginate'
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('app-loader', AppLoader);
Vue.component('paginate', Paginate);


firebase.initializeApp({
  apiKey: "AIzaSyDjNkTgjFeVubOuHJApghtpJFgPrp6jXmw",
  authDomain: "budget-app-ef949.firebaseapp.com",
  databaseURL: "https://budget-app-ef949.firebaseio.com",
  projectId: "budget-app-ef949",
  storageBucket: "budget-app-ef949.appspot.com",
  messagingSenderId: "910121447415",
  appId: "1:910121447415:web:06b0f2be154c2c9b4388f2",
  measurementId: "G-9RX1XD3G40"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});


