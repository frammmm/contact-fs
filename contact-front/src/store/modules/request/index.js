import { REQUEST } from "@/constants/api";
import { callApi, formSubmit } from "@/utils/request";

const state = {
  items: [],
  contactError: false
};

const mutations = {
  receiveRequests(state, payload) {
    state.items = payload;
  },

  contactFailed(state, payload) {
    state.contactError = payload;
  }
};

const actions = {
  createRequest({ commit }, payload) {
    formSubmit(REQUEST, payload.data, payload.token)
      .then(() => {
        commit("contactFailed", false);
      })
      .catch(err => {
        commit(
          "contactFailed",
          err.response.data || "Не удалось отправить заявку"
        );
      });
  },
  getRequests({ commit }, payload) {
    callApi(REQUEST, "GET", null, payload.token).then(result => {
      commit("receiveRequests", result.data);
    });
  },
  markAsReaded({ commit, dispatch }, payload) {
    callApi(REQUEST, "PATCH", { id: payload.id }, payload.token).then(() => {
      dispatch("getRequests", payload);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
