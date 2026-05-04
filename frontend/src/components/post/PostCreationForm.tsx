import React from 'react'
import { Button, Input, TextField } from 'react-aria-components'
import RichTextEditor from "../Editor/RichTextEditor"
import { AriaSelect } from '../ui/Select'
import { getMyCommunities } from "../../services/community"
import { getFlairs } from "../../services/flairs"
import { createPost, type PostData } from "../../services/posts"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'

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

const PostCreationForm = () => {
    const navigate = useNavigate()
    const { communityName } = useParams()
    const [selectedCommunity, setSelectedCommunity] = React.useState(communityName || "")
    const [title, setTitle] = React.useState("")
    const [selectedFlair, setSelectedFlair] = React.useState("")

    const [postContentJson, setPostContentJson] = React.useState("")
    const [postContentHtml, setPostContentHtml] = React.useState("")

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

    const communitiesQuery = useQuery({
        queryKey: ['my-communities'],
        queryFn: async () => await getMyCommunities()
    })

    const flairsQuery = useQuery({
        queryKey: ['flairs', selectedCommunity],
        queryFn: async () => await getFlairs(selectedCommunity),
        enabled: selectedCommunity.length > 0
    })

    const handleCommunitySelection = async (communityName: string) => {
        setSelectedCommunity(communityName)
        navigate(`/r/${communityName}/submit`)
    }

    return (
        <section className="create-post-section">
            <div className="create-post-desc">
                <h1>Create Post</h1>
                <p>Drafts</p>
            </div>

            <div className="community-selection">
                <AriaSelect
                    ariaLabel="Choose community"
                    name="choose-community"
                    placeholder="Select a community"
                    selectedKey={selectedCommunity}
                    onSelectionChange={handleCommunitySelection}
                    options={communitiesQuery.data?.map((community) => ({
                        id: community.name,
                        label: community.name,
                    })) ?? []}
                />
            </div>

            <div className="post-title">
                <TextField aria-label="Post title" value={title} onChange={setTitle} isRequired>
                    <Input type="text" placeholder="Title" />
                </TextField>
            </div>

            <div className="add-flair-and-tag">
                <AriaSelect
                    ariaLabel="Choose flair"
                    name="flair-tag"
                    placeholder="Select a flair"
                    selectedKey={selectedFlair}
                    onSelectionChange={setSelectedFlair}
                    options={flairsQuery.data?.map((flair) => ({
                        id: flair.title,
                        label: flair.title,
                    })) ?? []}
                />
            </div>

            <div className="post-body">
                <RichTextEditor onChange={handleEditorChange} />
            </div>

            <div className="action-buttons">
                <Button>Save Draft</Button>
                <Button onPress={handleSubmit}>Post</Button>
            </div>
        </section>
    )
}

export default PostCreationForm
