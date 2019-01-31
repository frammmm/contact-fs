import passport from "passport";

import jwtStrategy from "./passport-jwt";
import localStrategy from "./passport-local";

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

export const requireAuthJwt = passport.authenticate("jwt", {
    session: false
});

export const requireAuthJwtElevated = passport.authenticate("jwt", {
    session: false
});

export const requireAuthLocal = passport.authenticate("local", {
    session: false
});