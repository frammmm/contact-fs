import { validateIsNotUser, validateUserAuth } from "@/utils/user";

export const routes = {
  login: {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login"),
    beforeEnter: validateIsNotUser
  },
  signup: {
    name: "signup",
    path: "/signup",
    component: () => import("@/views/Signup"),
    beforeEnter: validateIsNotUser
  },
  requests: {
    name: "requests",
    path: "/requests",
    component: () => import("@/views/Requests"),
    beforeEnter: validateUserAuth,
    meta: {
      requiresAuth: true,
      roles: [2],
      defaultRoute: [2]
    }
  },
  contact: {
    name: "contact",
    path: "/",
    component: () => import("@/views/Contact"),
    beforeEnter: validateUserAuth,
    meta: {
      requiresAuth: true,
      roles: [1],
      defaultRoute: [1]
    }
  }
};

//TODO: Replace this shit with reduce/something
export const routesCollection = Object.values(routes);
