import RichTextEditor from "../Editor/RichTextEditor"
import { getMyCommunities } from "../../services/community"
import { getFlairs } from "../../services/flairs"
import { useEffect, useState } from "react"
import { createPost, type PostData } from "../../services/posts"
import { useNavigate } from "react-router-dom"

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

type PostCreationFormProps = {
    communityName?: string
}

const PostCreationForm = ({ communityName }: PostCreationFormProps) => {
    const navigate = useNavigate()
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const [flairs, setFlairs] = useState<Flair[]>([])

    const [selectedCommunity, setSelectedCommunity] = useState(communityName || "")
    const [title, setTitle] = useState("")
    const [selectedFlair, setSelectedFlair] = useState("")

    const [postContentJson, setPostContentJson] = useState("")
    const [postContentHtml, setPostContentHtml] = useState("")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditorChange = (editorState: any, html: string) => {
        const json = editorState.toJSON()
        setPostContentJson(JSON.stringify(json))
        setPostContentHtml(html)
    }

    const handleSubmit = async () => {
        const payload: PostData = {
            title,
            content_html: postContentHtml,
            content_json: JSON.parse(postContentJson),
            community_name: selectedCommunity,
            flair: selectedFlair ? selectedFlair : null,
            is_nsfw: false,
            is_spoiler: false,
        }
        try {
            const newPost = await createPost(payload)
            console.log("Post created successfully:", newPost)
            navigate(`/r/${selectedCommunity}/comments/${newPost.id}/${newPost.slug}`)
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const communities = await getMyCommunities()
                setMyCommunities(communities)
            } catch (error) {
                console.error("Error fetching communities:", error)
            }
        }
        fetchCommunities()
    }, [])

    useEffect(() => {
        if (selectedCommunity.length > 0) {
            const fetchFlairs = async () => {
                try {
                    const flairs = await getFlairs(selectedCommunity)
                    setFlairs(flairs)
                } catch (error) {
                    console.error("Error fetching flairs:", error)
                }
            }
            fetchFlairs()
        }
    }, [selectedCommunity])

    useEffect(() => {
    if (selectedCommunity.length > 0) {
        const fetchFlairs = async () => {
            try {
                const flairs = await getFlairs(selectedCommunity)
                setFlairs(flairs)
            } catch (error) {
                console.error("Error fetching flairs:", error)
            }
        }
        fetchFlairs()
    }
}, [])

    const handleCommunitySelection = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const communityName = event.target.value
        navigate(`/r/${communityName}/submit`)
    }

    return (
        <section className="create-post-section">
            <div className="create-post-desc">
                <h1>Create Post</h1>
                <p>Drafts</p>
            </div>

            <div className="community-selection">
                <select name="choose-community" onChange={handleCommunitySelection} value={selectedCommunity}>
                    <option value=''>Select a community</option>
                    {myCommunities.map((community) => (
                        <option key={community.id} value={community.name}>
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="post-title">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="add-flair-and-tag">
                <select name="flair-tag" value={selectedFlair} onChange={(e) => setSelectedFlair(e.target.value)}>
                    <option value=''>Select a flair</option>
                    {flairs.map((flair) => (
                        <option key={flair.id} value={flair.title}>
                            {flair.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="post-body">
                <RichTextEditor onChange={handleEditorChange} />
            </div>

            <div className="action-buttons">
                <button>Save Draft</button>
                <button onClick={handleSubmit}>Post</button>
            </div>
        </section>
    )
}

export default PostCreationForm