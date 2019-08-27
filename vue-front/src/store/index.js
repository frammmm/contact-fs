import Vue from 'vue';
import Vuex from 'vuex';

import request from './modules/request';
import user from './modules/user';

Vue.use(Vuex);

let initialState = {
  request: request.state,
  user: user.state,
};

export default new Vuex.Store({
  modules: {
    request,
    user,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(key => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
});
