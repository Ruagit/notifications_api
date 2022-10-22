process.env.DATA_SOURCE = 'feed_test';

import server from '../server';
import request from 'supertest';
import { describe, expect, it, afterEach } from '@jest/globals';
import { PostNotification } from '../types/notifications';
import { randomUUID } from 'crypto';
import { restoreDB } from '../utils';
import { fetchDataFeed } from '../controllers/notification-controller';

const handler = server.listen();

const basePath = '/notifications/feed/post';

const postId = randomUUID();

const testBody: PostNotification = {
    type: 'Like',
    read: false,
    post: {
        id: postId,
        title: 'do we really need automation testing? Bring back manual checks',
    },
    user: {
        id: randomUUID(),
        name: 'Senor Test',
    },
};

describe('API', () => {
    afterEach(() => {
        restoreDB()
    })
    describe('Gets a List of Notifications by Post', () => {
        describe('/notificaitons/feed/post/:id', () => {
            it('Status: 200 returns a list of notifications ', () => {
                return request(handler)
                    .get(`${basePath}/b1638f970c3ddd528671df76c4dcf13e`)
                    .then((res) => {
                        expect(res.status).toEqual(200);
                        expect(res.body[0].post.id).toEqual(
                            'b1638f970c3ddd528671df76c4dcf13e'
                        );
                    })
            })
            it('Status: 404 Path Not Found for Request', () => {
                return request(handler)
                    .get(
                        `/notifications/feed/wrongpath/b1638f970c3ddd528671df76c4dcf13e`
                    )
                    .then((res) => {
                        expect(res.status).toEqual(404);
                    })
            })
        })
    })
    describe('Marks notifications as read', () => {
        describe('/notificaitons/feed/post/:id', () => {
            it('Status: 200 marks notifications as read for a post', () => {
                return request(handler)
                    .patch(`${basePath}/b1638f970c3ddd528671df76c4dcf13e`)
                    .send({ read: true })
                    .then((res) => {
                        expect(res.status).toEqual(200);
                        expect(res.body[0].read).toBe(true);
                        expect(res.body[0].post.id).toBe(
                            'b1638f970c3ddd528671df76c4dcf13e'
                        );
                    })
            })
            it('Status: 404 Path Not Found for Request', () => {
                return request(handler)
                    .patch(
                        `/notifications/feed/wrongpath/b1638f970c3ddd528671df76c4dcf13e`
                    )
                    .send({ read: true })
                    .then((res) => {
                        expect(res.status).toEqual(404);
                    })
            })
            it('Status: 400 request body invalid', () => {
                const invalidBoolValue = { read: 999 };
                return request(handler)
                    .patch(`${basePath}/b1638f970c3ddd528671df76c4dcf13e`)
                    .send(invalidBoolValue)
                    .then((res) => {
                        expect(res.status).toEqual(400);
                        expect(res.body.error).toBe('"value" must be a boolean');
                    })
            })
        })
    })

    describe('Add a notification item to Feed', () => {
        describe('/notificaitons/feed/post/:id', () => {
            it('Status: 201 returns a list of notifications ', () => {
                return request(handler)
                    .post(`${basePath}/`)
                    .send(testBody)
                    .then((res) => {
                        expect(res.status).toEqual(201);
                        expect(res.body).toEqual({
                            message: 'successfully created post',
                            id: postId,
                        });

                        // Not Best Practice, just to show item added to datasource
                        const data: PostNotification[] = fetchDataFeed();
                        const filteredResult = data.filter(
                            ({ post }) => post.id === postId
                        );
                        expect(filteredResult[0]).toEqual(testBody);
                    })
            })
            it('Status: 404 Path Not Found for Request', () => {
                return request(handler)
                    .post(`/notifications/feed/wrongpath/`)
                    .send(testBody)
                    .then((res) => {
                        expect(res.status).toEqual(404)
                    });
            })
            it('Status: 400 request body invalid', () => {
                const invalidBoolValue = { read: 999 };
                const invalidBody = { ...testBody, ...invalidBoolValue };
                return request(handler)
                    .post(`${basePath}/`)
                    .send(invalidBody)
                    .then((res) => {
                        expect(res.status).toEqual(400);
                        expect(res.body.error).toBe('"read" must be a boolean');
                        // // Not Best Practice, just to show item added to datasource
                        const data: PostNotification[] = fetchDataFeed();
                        const filteredResult = data.filter(
                            ({ post }) => post.id === postId
                        );
                        expect(filteredResult[0]).not.toEqual(invalidBody);
                    })
            })
        })
    })
})
