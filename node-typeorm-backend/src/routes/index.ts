import express, { Router } from 'express';

import UserRoute from './User.route';
// import RequestRoute from './Request.route';

import { NOT_FOUND } from '../helpers/constants/httpCodes';
import { requireAuthJwt } from '../helpers/middlewares/passport';

const router = Router();

router.all('/api/*', requireAuthJwt);

// router.use('/api/uploads', express.static('uploads'));
// router.use('/api/', RequestRoute);
router.use('/', UserRoute);

router.use('*', (_, res) => {
  res.sendStatus(NOT_FOUND);
});

export default router;
