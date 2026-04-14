import api from "./auth";

export type UserPosts = {
    id: number;
    title: string;
    content_html: string;
    score: number;
    status: 'upvoted' | 'downvoted' | 'not_voted';
    community_name: string;
    community_id: number;
}

export type UserComments = {
    id: number;
    content_html: string;
    score: number;
    status: 'upvoted' | 'downvoted' | 'not_voted';
    community_name: string;
    community_id: number;
}

export async function getUserPosts() : Promise<UserPosts[]>{
    const response = await api.get('/profile/posts')
    return response.data
}

export async function getUserComments() : Promise<UserComments[]>{
    const response = await api.get('/profile/comments')
    return response.data
}

export async function getUserUpvotedPosts() : Promise<UserPosts[]> {
    const response = await api.get('/profile/upvoted-posts')
    return response.data
}

export async function getUserDownvotedPosts() : Promise<UserPosts[]> {
    const response = await api.get('/profile/downvoted-posts')
    return response.data
}