export type PostNotification = {
    type: NotificationType
    read: boolean
    post: Post
    comment?: Comment
    user: User
};

export type User = {
    id: string
    name: string
};

export type Post = {
    id: string
    title: string
};

export type Comment = {
    id: string,
    commentText: string,
};

export type NotificationType = 'Like' | 'Comment';