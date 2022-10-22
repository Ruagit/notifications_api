
import { Request, Response } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import { PostNotification } from '../types/notifications';

const { DATA_SOURCE = 'feed'} = process.env;

const path = `./data/${DATA_SOURCE}.json`;

export const fetchDataFeed = () => {
    const data = readFileSync(path, 'utf-8');
    return JSON.parse(data);
};

export const getItemsByPost = (req: Request, res: Response) => {
    const { id } = req.params;

    const data: PostNotification[] = fetchDataFeed();

    const items = data.filter(({ post }) => post.id === id);

    if (!items) res.status(404).send('Notifications are not available');

    return res.status(200).send(items);
}

export const addItemToFeed = (req: Request, res: Response) => {
    const notification: PostNotification = req.body;

    const data: PostNotification[] = fetchDataFeed();

    const updatedFeed = [notification, ...data];

    try {
        writeFileSync(path, JSON.stringify(updatedFeed, null, 2));
        res.status(201).send({ message: "successfully created post", id: `${notification.post.id}`});
      } catch (error) {
        res.status(400).send(error);
      }
}

export const patchItemAsRead = (req: Request<{id : string}, unknown, { read: boolean } >, res: Response) => {
    const { id } = req.params;
    const { read } = req.body;

    const data: PostNotification[] = fetchDataFeed();

    const items = data.map((item) => {
        const { post } = item;
        if (post.id === id) {
            return {...item, read}
        }
        return item;
    })
    
    const markedItems = items.filter(({ post }) => post.id === id);

    if (markedItems.length === 0) res.status(200).send('No notifications were marked as read')

    try {
        writeFileSync(path, JSON.stringify(items, null , 2));
        res.status(200).send(markedItems);
      } catch (error) {
        res.status(400).send(error);
      }
}