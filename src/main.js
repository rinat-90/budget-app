import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date';
import currencyFilter from "./filters/currency";
import tooltipDirective from './directives/tooltip.directives'
import messagePlugin from './utils/message.plugin';
import AppLoader from "./components/Partials/Loader";
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.component('app-loader', AppLoader);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);


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


