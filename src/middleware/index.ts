import { NextFunction, Request, Response } from "express";
import { PostNotification, Post, Comment, NotificationType, User  } from "../types/notifications";
import Joi from 'joi';


export const notificationSchema = Joi.object<PostNotification>({
    type: Joi.string<NotificationType>().required(),
    read: Joi.boolean().required(),
    post: Joi.object<Post>({
        id: Joi.string().required(),
        title: Joi.string(),
    }).required(), 
    comment: Joi.object<Comment>({
        id: Joi.string().required(),
        commentText: Joi.string(),
    }),
    user: Joi.object<User>({
        id: Joi.string().required(),
        name: Joi.string().required(),
    }).required(),
});


export const validatePost = (req: Request, res: Response, next: NextFunction) => {
    const notification: PostNotification = req.body;
    const { error } = notificationSchema.validate(notification, { abortEarly: false })
    
    if( error ) res.status(400).send({ error : error.message });
    return next(error);
}


export const validatePatch = (req: Request<unknown, unknown, { read: boolean }>, res: Response, next: NextFunction) => {
    const { read } = req.body;
    
    const { error } = Joi.boolean().validate(read, { abortEarly: false });

    if( error ) res.status(400).send({ error : error.message });
    return next(error);
}

export const validateParams = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const { error } = Joi.string().uuid().validate(id, { abortEarly: false });

    if( error ) res.status(400).send({ error : error.message });
    return next(error);
}