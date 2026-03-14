import RichTextEditor from "../Editor/RichTextEditor"
import { getMyCommunities } from "../../services/community"
import { getFlairs } from "../../services/flairs"
import { useEffect, useState } from "react"

export type Community = {
    id: number
    name: string
}

export type Flair = {
    id: number
    title: string
    background_color: string
    text_color: string
}

const PostCreationForm = ()=>{
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const [flairs, setFlairs] = useState<Flair[]>([])

    const [selectedCommunity, setSelectedCommunity] = useState("")
    const [title, setTitle] = useState("")
    const [selectedFlair, setSelectedFlair] = useState("")

    useEffect(()=>{
        const fetchCommunities = async()=>{
            try{
                const communities = await getMyCommunities()
                setMyCommunities(communities)
            }catch(error){
                console.error("Error fetching communities:", error)
            }
        }
        fetchCommunities()
    },[])

    const handleCommunitySelection = async (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const communityName = event.target.value
        setSelectedCommunity(communityName)
        try{
            const flairs = await getFlairs(communityName)
            setFlairs(flairs)
            console.log(flairs)
        }catch(error){
            console.error("Error fetching flairs:", error)
        }
    }

    return(
        <section className="create-post-section">
            <div className="create-post-desc">
                <h1>Create Post</h1>
                <p>Drafts</p>
            </div>

            <div className="community-selection">
                <select name="choose-community" onChange={handleCommunitySelection} value={selectedCommunity}>
                    <option value=''>Select a community</option>
                    {myCommunities.map((community)=>(
                        <option key={community.id} value={community.name}>
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="post-title">
                <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            </div>

            <div className="add-flair-and-tag">
                <select name="flair-tag" value={selectedFlair} onChange={(e)=>setSelectedFlair(e.target.value)}>
                    <option value=''>Select a flair</option>
                    {flairs.map((flair)=>(
                        <option key={flair.id} value={flair.title}>
                            {flair.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="post-body">
                <RichTextEditor/>
            </div>

            <div className="action-buttons">
                <button>Save Draft</button>
                <button>Post</button>
            </div>
        </section>
    )
}

export default PostCreationForm