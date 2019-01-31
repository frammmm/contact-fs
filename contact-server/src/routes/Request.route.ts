import { Router } from "express";
import upload from "../helpers/middlewares/multer";

const router = Router();

import RequestController from "../controllers/Request.controller";

const requestController = new RequestController();

router.get("/request", requestController.get);
router.post("/request", upload, requestController.post);
router.patch("/request", requestController.patch);

export default router;
