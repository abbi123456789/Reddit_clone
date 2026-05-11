import api from "./auth";
import type { Flair } from "./flairs";
import type { Post } from './posts';

export type CommunityCreation = {
    name: string
    description: string
    visibility: 'public' | 'private' | 'restricted'
    nsfw: boolean
    category: string
}

export type Community = {
    id: number
    name: string
    description: string
    visibility: 'public' | 'private' | 'restricted'
    nsfw: boolean
    category: string
    creator: number
    flairs?: Flair[]
}

export type CommunityJoinStatus = {
    is_member: boolean
}

export const createCommunity = async ({name, description, visibility, nsfw, category}: CommunityCreation): Promise<Community | null> => {
    try{
        const response = await api.post(
            '/r/create',
            {name, description, visibility, nsfw, category}
        )
        return response.data
    }catch(error){
        console.log(error)
        return null
    }

}

export const getMyCommunities = async (): Promise<Community[] | null> => {
    try{
        const response = await api.get('/r/my-communities')
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}

export const getCommunity = async (communityName: string): Promise<Community | null> => {
    try{
        const response = await api.get(`/r/${communityName}`)
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}

export async function didUserJoinedCommunity(communityName: string) : Promise<CommunityJoinStatus | null>{ 
    try{
        const response = await api.get(`/r/${communityName}/join/status`)
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}

export async function getCommunityPosts(communityName: string) : Promise<Post[] | null>{
    try{
        const response = await api.get(`/r/${communityName}/posts`)
        return response.data;
    }catch(error){
        console.log(error)
        return null;
    }
}

export async function getUserJoinedCommunities() : Promise<Pick<Community, 'id' | 'name'>[] | null>{
    try{
        const response = await api.get('/user/joined-communities')
        console.log(response.data)
        return response.data;
    }catch(error){
        console.log(error)
        return null;
    }
}

export async function joinCommunity(communityName: string) : Promise<CommunityJoinStatus | null>{
    try{
        const response =await api.post(`/r/${communityName}/join`)
        return response.data;
    }catch(error){
        console.log(error)
        return null;
    }
}
