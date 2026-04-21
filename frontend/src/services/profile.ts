import api from "./auth";

export type UserPosts = {
    id: number;
    title: string;
    left: string;
    score: number;
    status: 'upvoted' | 'downvoted' | 'not_voted';
    community_name: string;
    community_id: number;
}

export type UserComments = {
    id: number;
    left: string;
    score: number;
    post_title: string;
    comment_author: string;
    status: 'upvoted' | 'downvoted' | 'not_voted';
    community_name: string;
    community_id: number;
}

export async function getUserPosts() : Promise<UserPosts[]>{
    const response = await api.get('/profile/posts')
    return response.data
}

export async function getUserComments() : Promise<UserComments[]>{
    await new Promise((resolve)=>setTimeout(resolve, 500))
    const response = await api.get('/profile/comments')
    return response.data
}

export async function getUserVotedPosts(value: number) : Promise<UserPosts[]> {
    const response = await api.get(`/profile/voted-posts/?value=${value}`)
    return response.data
}