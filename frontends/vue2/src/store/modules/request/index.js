import { REQUEST } from '@/constants/api';
import { callApi, formSubmit } from '@/utils/request';

const state = {
  contactError: false,
  contactSuccess: false,
  items: [],
  loading: false,
};

const mutations = {
  receiveRequests(state, payload) {
    state.items = payload;
  },

  contactSuccess(state, payload) {
    state.contactSuccess = payload;
    state.contactError = false;
  },

  contactFailed(state, payload) {
    state.contactError = payload;
    state.contactSuccess = false;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  createRequest({ commit }, payload) {
    commit('setLoading', true);

    formSubmit(REQUEST, payload.data)
      .then(() => {
        commit('contactSuccess', 'Заявка успешно отправлена!');
      })
      .catch(err => {
        const response = err.response.data;

        let errorMessage = '';

        if (response.error && response.description) {
          errorMessage = response.description;
        } else {
          errorMessage = 'Не удалось отправить заявку';
        }

        commit('contactFailed', errorMessage);
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },

  getRequests({ commit }) {
    commit('setLoading', true);

    callApi(REQUEST, 'GET').then(result => {
      commit('receiveRequests', result.data);
    })
      .finally(() => {
        commit('setLoading', false);
      });
  },

  markAsReaded({ commit, dispatch }, payload) {
    commit('setLoading', true);

    callApi(REQUEST, 'PATCH', { id: payload.id }).then(() => {
      dispatch('getRequests', payload);
    })
      .finally(() => {
        commit('setLoading', false);
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
