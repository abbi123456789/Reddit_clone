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
        <section className="flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between font-bold">
                <h1>Create Post</h1>
                <p className="text-[1.8rem]">Drafts</p>
            </div>

            <div>
                <AriaSelect
                    className="[&_.aria-select-trigger]:rounded-[25px] [&_.aria-select-trigger]:border-0 [&_.aria-select-trigger]:bg-gray-300 [&_.aria-select-trigger]:px-6 [&_.aria-select-trigger]:py-2.5"
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

            <div className="w-full">
                <TextField aria-label="Post title" value={title} onChange={setTitle} isRequired>
                    <Input className="block h-[60px] w-full rounded-[30px] border border-gray-500 px-5" type="text" placeholder="Title" />
                </TextField>
            </div>

            <div>
                <AriaSelect
                    className="[&_.aria-select-trigger]:rounded-[25px] [&_.aria-select-trigger]:border-0 [&_.aria-select-trigger]:bg-gray-300 [&_.aria-select-trigger]:px-6 [&_.aria-select-trigger]:py-2.5"
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

            <div className="w-full">
                <RichTextEditor onChange={handleEditorChange} />
            </div>

            <div className="mr-8 flex justify-end gap-8">
                <Button className="rounded-[20px] border-0 px-4 py-2.5">Save Draft</Button>
                <Button className="rounded-[20px] border-0 px-4 py-2.5" onPress={handleSubmit}>Post</Button>
            </div>
        </section>
    )
}

export default PostCreationForm
