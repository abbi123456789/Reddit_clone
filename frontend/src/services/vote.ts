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

export const votePost = async (data: {postId:string, value: 1 | -1}) :Promise<VotePost>=> {
    const body = {value: data.value}
    const response = await api.post(`/posts/${data.postId}/vote`, body)
    return response.data as VotePost
}

export const voteComment = async (data: {commentId:number, value: 1 | -1}) :Promise<VoteComment>=> {
    const body = {value: data.value}
    const response = await api.post(`/comments/${data.commentId}/vote`, body)
    return response.data as VoteComment
}