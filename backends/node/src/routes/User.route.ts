import { Router } from "express";

import UserController from "../controllers/User.controller";
import { requireAuthJwt, requireAuthLocal } from "../helpers/middlewares/passport";

const router = Router();

const userController = new UserController();

router.post("/auth", requireAuthJwt, userController.afterAuthCheck);
router.post("/login", requireAuthLocal, userController.afterLogin);
router.post("/signup", userController.signup);

export default router;
