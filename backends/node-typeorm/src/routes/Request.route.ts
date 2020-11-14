import { Router } from 'express';

import RequestController from '../controllers/Request.controller';

import upload from '../helpers/middlewares/multer';

const router = Router();

const requestController = new RequestController();

router.get('/request', requestController.get);
router.post('/request', upload, requestController.post);
router.patch('/request', requestController.patch);

export default router;
