import { Router, Request, Response } from 'express';
import { getItemsByPost, addItemToFeed, patchItemAsRead } from '../controllers/notification-controller';
import { validatePost, validatePatch, validateParams } from '../middleware/index';
import { handle405s } from '../errors';
import endpoints from './endpoints.json';

const notificationsRouter = Router();

notificationsRouter.route('/post/:id').get(validateParams, getItemsByPost).patch(validatePatch, validateParams, patchItemAsRead).all(handle405s);
notificationsRouter.route('/post').post(validatePost, addItemToFeed).all(handle405s);
notificationsRouter.get("/", (_req: Request, res: Response) => {
    res.status(200).send(endpoints);
  });


export default notificationsRouter;