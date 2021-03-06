import router from '@/router';

import { USER_LOGIN, USER_SIGNUP } from '@/constants/api';
import { callApi } from '@/utils/request';
import { getDefaultRoleRoute, getUserRole, validateUserToken } from '@/utils/user';

const state = {
  isTokenValid: false,
  token: null,
  loginError: false,
  signupError: false,
  loading: false,
};

const mutations = {
  authUser(state, payload) {
    state.isTokenValid = true;
    state.token = payload.token;
    state.loginError = false;
    state.signupError = false;
  },

  authFailed(state, payload) {
    state.loginError = payload;
  },

  signupFailed(state, payload) {
    state.signupError = payload;
  },

  changeTokenStatus(state, payload) {
    state.isTokenValid = payload.status;
    state.token = payload.token;
  },

  invalidateUserData(state) {
    localStorage.removeItem('jwt-token');

    state.isTokenValid = false;
    state.token = null;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  checkUserToken({ commit }, token) {
    return validateUserToken(token).then(isValid => {
      commit('changeTokenStatus', { token, status: isValid });
    });
  },

  signup({ commit }, payload) {
    commit('setLoading', true);

    return callApi(USER_SIGNUP, 'POST', payload)
      .then(res => {
        router.push('login');
      })
      .catch(err => {
        commit('signupFailed', err.response.data.description);
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },

  login({ commit }, payload) {
    commit('setLoading', true);

    return callApi(USER_LOGIN, 'POST', payload)
      .then(res => {
        const userToken = res.data.token;
        localStorage.setItem('jwt-token', userToken);

        const userRole = getUserRole(userToken);
        const defaultRoute = getDefaultRoleRoute(userRole);

        commit('authUser', {
          token: userToken,
        });

        router.push(defaultRoute);
      })
      .catch(err => {
        commit(
          'authFailed',
          'Пользователь с такой электронной почтой или паролем не найден',
        );
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },

  logout({ commit }) {
    commit('invalidateUserData');
    commit('reset');

    router.push('login');
  },
};

export default {
  state,
  mutations,
  actions,
};
