import api from "./auth"

const createNewFlair = async (communityName: string, title: string, color: string, hue: number, saturation:number) => {
    try{
        const response = await api.post(`/r/${communityName}/create/flair`, {
            title,
            color,
            hue,
            saturation
        })
        return response.data
    }catch(error){
        console.error('Error creating flair:', error)
        return null
    }
}

export { createNewFlair }