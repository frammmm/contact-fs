import Vue from 'vue';

import App from './app';

import router from './router';
import store from './store';

import 'bulma/css/bulma.css';

const userToken = localStorage.getItem('jwt-token');
store.dispatch('checkUserToken', userToken).then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
});
