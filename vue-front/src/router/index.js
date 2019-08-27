import Vue from "vue";
import Router from "vue-router";

import Layout from "../views/Layout";

import { routes } from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    routes.login,
    routes.signup,
    {
      path: "*",
      component: Layout,
      children: [routes.contact, routes.requests]
    }
  ]
});

export default router;
