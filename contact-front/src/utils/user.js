import jwtDecode from "jwt-decode";

import store from "@/store";

import { USER_CHECKAUTH } from "@/constants/api";
import { routesCollection } from "@/router/routes";
import { callApi } from "@/utils/request";

export const getDefaultRoleRoute = userRole => {
  return routesCollection.find(
    route =>
      route.meta &&
      route.meta.defaultRoute &&
      route.meta.defaultRoute.includes(userRole)
  );
};

export const getUserRole = token => {
  return jwtDecode(token).sub.role_id;
};

export const validateUserToken = token => {
  return callApi(USER_CHECKAUTH, "POST", null, token)
    .then(() => true)
    .catch(() => false);
};

export const validateUserAuth = (to, from, next) => {
  const isUserAuthenticated = store.state.user.isTokenValid;

  if (isUserAuthenticated) {
    const userRole = getUserRole(store.state.user.token);
    const defaultRoute = getDefaultRoleRoute(userRole);
    const requiredRoles = to.meta.roles;

    if (requiredRoles.includes(userRole) || !requiredRoles) {
      return next();
    }

    return next(defaultRoute);
  }

  next("login");
};

export const validateIsNotUser = (to, from, next) => {
  const isUserAuthenticated = store.state.user.isTokenValid;

  if (isUserAuthenticated) {
    const userRole = getUserRole(store.state.user.token);
    const defaultRoute = getDefaultRoleRoute(userRole);

    return next(defaultRoute);
  }

  next();
};
