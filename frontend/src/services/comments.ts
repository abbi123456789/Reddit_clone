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
    vote_status: 'upvoted' | 'downvoted' | 'not_voted';
    score: number;
    parent: number | null;
    depth: number;
    children: PostComment[];
}

export const createComment = async (data: CommentBody) => {
    const response = await api.post(`/r/${data.community_name}/comments/${data.post}/create`, data);
    return response.data;
}

export const getPostComments = async (postId: number, communityName:string):Promise<PostComment[]> => {
    const response = await api.get(`/r/${communityName}/comments/${postId}`)
    return response.data
}

export async function getCommentById(commentId: number):Promise<PostComment> {
    const response = await api.get(`/comments/${commentId}`)
    return response.data
}