import api from "./auth";
import type { Flair } from "./flairs";

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

export const createCommunity = async ({name, description, visibility, nsfw, category}: CommunityCreation) => {
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

export async function userJoinedCommunity(communityName: string) : Promise<boolean | null>{ 
    try{
        const response = await api.get(`/r/${communityName}/join/status`)
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}
