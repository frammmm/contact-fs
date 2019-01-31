import Vue from "vue";

import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

const userToken = localStorage.getItem("jwt-token");
store.dispatch("checkUserToken", userToken).then(() => {
  new Vue({
    el: "#app",
    router,
    store,
    template: "<router-view />"
  });
});
