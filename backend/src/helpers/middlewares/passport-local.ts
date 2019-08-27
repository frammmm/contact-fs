import { Strategy } from "passport-local";

import UserController from "../../controllers/User.controller";

const userController = new UserController();

const localOptions = {
  usernameField: "email"
};

const strategy = new Strategy(localOptions, function (email: string, password: string, done: Function) {
  userController.validateUserIdentity(email, password)
    .then(identity => {
      if (!identity) return done(null, false, "Something went wrong");

      return done(null, identity);
    });
});

export default strategy;
