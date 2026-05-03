import api from "./auth";

export type PostData = {
    title: string;
    content_html: string;
    content_json: object;
    community_name: string;
    flair?: string | null;
    is_nsfw?: boolean;
    is_spoiler?: boolean;
}

export type Post = {
    id: number;
    title: string;
    slug: string;
    content_html: string;
    content_json: object;
    score: number;
    comment_count: number;
    author_id:number;
    author_username: string;
    community_id: number;
    community_name: string;
    flair_id: number | null;
    flair_color: string | null;
    flair_title: string | null;
    flair_text_color: string | null;
    vote_status: 'upvoted' | 'downvoted' | 'not_voted'
}

export const createPost = async (postData: PostData) => {
    try{
        const response = await api.post("/posts/create", postData);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const getPostBySlug = async (postId:string, postSlug: string) : Promise<Post> => {
    try {
        const response = await api.get(`/posts/${postId}/${postSlug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

export async function getPostFeed() : Promise<Post[] | null> {
    try{
        const response = await api.get('/posts/feed');
        return response.data;
    } catch(error) {
        console.log("Error fetching feed:", error);
        throw error;
    }
}