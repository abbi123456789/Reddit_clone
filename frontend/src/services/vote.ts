import api from "./auth";

export type VotePost = {
    status: 'upvoted' | 'downvoted' | 'toggled_off' | 'no_change';
    post_id: number;
    new_score: number;
}

export type VoteComment = {
    status: 'upvoted' | 'downvoted' | 'toggled_off' | 'no_change';
    comment_id: number;
    new_score: number;
}

export const votePost = async (postId:string, value: number) :Promise<VotePost>=> {
    const data = {value:value}
    const response = await api.post(`/posts/${postId}/vote`, data)
    return response.data as VotePost
}

export const voteComment = async (commentId:number, value:number) :Promise<VoteComment>=> {
    const data = {value:value}
    const response = await api.post(`/comments/${commentId}/vote`, data)
    return response.data as VoteComment
}