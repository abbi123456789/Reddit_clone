import api from "./auth";

export type CommunityCreation = {
    name: string
    description: string
    visibility: 'public' | 'private' | 'restricted'
    nsfw: boolean
    category: string
}

export const createCommunity = async ({name, description, visibility, nsfw, category}: CommunityCreation) => {
    try{
        const response = await api.post(
            '/community/create',
            {name, description, visibility, nsfw, category}
        )
        return response.data
    }catch(error){
        console.log(error)
        return null
    }

}

