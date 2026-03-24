import api from "./auth"

export type Flair = {
    id: number
    title: string
    background_color: string
    text_color: string
    mod_only: boolean
    hue: number
    saturation: number
}

const createNewFlair = async (communityName: string, title: string, background_color: string, hue: number, saturation:number, text_color: string) => {
    console.log({ communityName, title, background_color, hue, saturation, text_color })
    try{
        const response = await api.post(`/r/${communityName}/create/flair`, {
            title,
            background_color,
            hue,
            saturation,
            text_color
        })
        return response.data
    }catch(error){
        console.error('Error creating flair:', error)
        return null
    }
}

const getFlairs = async (communityName: string):Promise<Flair[]> => {
    try{
        const response = await api.get(`/r/${communityName}/flairs`)
        return response.data
    }catch(error){
        console.error('Error fetching flairs:', error)
        return []
    }
}

export { createNewFlair, getFlairs }