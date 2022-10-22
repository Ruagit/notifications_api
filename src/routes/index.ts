import Router from 'express';
import  notificationsRouter  from './notifications-router';

const mainRouter = Router();

mainRouter.use('/feed', notificationsRouter);

export default mainRouter;