import api from "./auth";

export type CommentBody = {
    content_json: object;
    content_html: string;
    parent: number | null;
    post: number;
    community_name: string;
}

export type PostComment = {
    id: number;
    content_json: object;
    content_html: string;
    author_id: number;
    author_name: string;
    vote_status: 'upvoted' | 'downvoted' | 'no_change';
    score: number;
}

export const createComment = async (data: CommentBody) => {
    const response = await api.post(`/r/${data.community_name}/comments/${data.post}/create`, data);
    return response.data;
}

export const getPostComments = async (postId: number, communityName:string):Promise<PostComment[]> => {
    const response = await api.get(`/r/${communityName}/comments/${postId}`)
    console.log(response.data)
    return response.data
}