# API - Social Media Notifications

## Description

This a simple Node/TypeScript Express server that exposes three endpoints to fetch, add and update notifications for a fictious social media platform.

## How to Setup Locally

1. Run `npm run install` to install all necessary dependencies.
2. To run the server locally, run `npm run start-dev` and open an API testing application like Postman to test the endpoints listed below.
3. You can run tests using `npm run test`.

Can be optimised for production use by running `npm run build` followed by `npm run start`.

## Endpoints

You can view all endpoints and exmaple requests and responses by accessing `/notifications/feed/endpoints`.

### Get All Notifications for a Post

Endpoint available at `/notifications/feed/endpoints/post/:id`

```
    "GET /notifications/feed/post/:id": {
        "description": "serves a list of notifications by post",
        "queries": [],
        "exampleResponse": [
            {
                "type": "Like",
                "read": false,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "user": {
                    "id": "7bd3695eba3be49ef29bd423b12555bc",
                    "name": "Hamish Sutcliffe"
                }
            },
            {
                "type": "Like",
                "read": false,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "user": {
                    "id": "9a1afe07885bac989383b7b145c516d6",
                    "name": "Chuck Looij"
                }
            }
        ]
    }
```

### Add a Notification for a Post

Endpoint available at `/notifications/feed/endpoints/post`

```
    "POST /notifications/feed/post": {
        "description": "posts a notifications to the feed",
        "request body": {
            "type": "Like",
            "read": false,
            "post": {
                "id": "b9999f970c3ddd528671df76c4dcf13e",
                "title": "dynamically dynamic worldwide sales"
            },
            "user": {
                "id": "403f220c3d413fe9cb0b36142ebfb35d",
                "name": "Mr Ye"
            }
        },
        "exampleResponse": {
            "message": "string",
            "id": "b9999f970c3ddd528671df76c4dcf13e"
        }
    }
```
### Mark Notifications as Read

Endpoint available at `/notifications/feed/endpoints/post/:id`

```
"PATCH /notifications/feed/post/:id": {
        "description": "marks notifications as read",
        "request body": { "read": true },
        "exampleResponse": [
            {
                "type": "Like",
                "read": true,
                "post": {
                    "id": "b1638f970c3ddd528671df76c4dcf13e",
                    "title": "Acme Inc dynamically scales niches worldwide"
                },
                "user": {
                    "id": "4c18d43d4deccbac21a26c55f1033f53",
                    "name": "William Hunt"
                }
            },
            {
                "type": "Like",
                "read": true,
                "post": {
                    "id": "b1638f970c3ddd528671df76c4dcf13e",
                    "title": "Acme Inc dynamically scales niches worldwide"
                },
                "user": {
                    "id": "38be3079117301f2f61264d6e0fbf7db",
                    "name": "An Mao"
                }
            }
        ]
    }
```
## Potential Improvements

- Improve testing coverage and depth of tests.
- Add in a simple database with schema's for testing, development and production.
- Implement more of an mvc pattern with models doing the logic to fetch, add and update data. 
- Host the API in a platform like Heroku so it is available online.
- Add in a simple form of authentication on HTTP requests.
- Add in some logging for better observability.
