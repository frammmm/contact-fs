import { ExtractJwt, Strategy } from "passport-jwt";
import UserController from "../../controllers/User.controller";

const userController = new UserController();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

export default new Strategy(jwtOptions, async (token, done: Function) => {
    userController.auth(token).then(result => {
        if (!result) {
            return done(null, false, "Unauthorized");
        }

        done(null, result);
    });
});