import React from "react"
import { Button, Input, TextField } from "react-aria-components"
import RichTextEditor from "../Editor/RichTextEditor"
import { AriaSelect } from "../ui/Select"
import { getMyCommunities } from "../../services/community"
import { getFlairs } from "../../services/flairs"
import { createPost, type PostData, type PostEditorDraft, updatePost } from "../../services/posts"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

type PostType = "text" | "media" | "link"

const EMPTY_EDITOR_STATE = {
    root: {
        children: [
            {
                children: [],
                direction: null,
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
            },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
    },
}

const POST_TABS: { id: PostType; label: string }[] = [
    { id: "text", label: "Text" },
    { id: "media", label: "Images & Video" },
    { id: "link", label: "Link" },
]

const PostCreationForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { communityName } = useParams()

    const editState = location.state as PostEditorDraft | null
    const isEditMode = editState?.mode === "edit"

    const [selectedCommunity, setSelectedCommunity] = React.useState(editState?.community_name || communityName || "")
    const [title, setTitle] = React.useState(editState?.title || "")
    const [selectedFlair, setSelectedFlair] = React.useState(editState?.flair_title || "")

    const [postType, setPostType] = React.useState<PostType>("text")
    const [mediaFiles, setMediaFiles] = React.useState<File[]>([])
    const [linkUrl, setLinkUrl] = React.useState("")

    const [postContentJson, setPostContentJson] = React.useState(
        JSON.stringify(editState?.content_json ?? EMPTY_EDITOR_STATE),
    )
    const [postContentHtml, setPostContentHtml] = React.useState(editState?.content_html || "")

    const handleEditorChange = (editorState: any, html: string) => {
        const json = editorState.toJSON()
        setPostContentJson(JSON.stringify(json))
        setPostContentHtml(html)
    }

    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? [])
        setMediaFiles((prev) => [...prev, ...files])
        event.target.value = ""
    }

    const removeMediaFile = (index: number) => {
        setMediaFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index))
    }

    const uploadMediaFile = async (file: File) => {
    const formData = new FormData()
    formData.append("data", file)

    const response = await fetch("http://localhost:8000/r/upload/image", {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`)
    }

    const responseData = await response.json()
    return responseData.url as string
    }

    const handleSubmit = async () => {
        try {
            let mediaUrls: string[] | null = null

            if (postType === "media") {
                mediaUrls = await Promise.all(
                    mediaFiles.map((file) => uploadMediaFile(file))
                )
            }

            const payload: PostData = {
                title,
                community_name: selectedCommunity,
                flair: selectedFlair || null,
                is_nsfw: editState?.is_nsfw ?? false,
                is_spoiler: editState?.is_spoiler ?? false,

                post_type: postType,

                content_html: postType === "text" ? postContentHtml : null,
                content_json: postType === "text" ? JSON.parse(postContentJson) : null,

                media_urls: postType === "media" ? mediaUrls : null,

                link_url: postType === "link" ? linkUrl : null,
            }

            if (isEditMode && editState) {
                const updatedPost = await updatePost(editState.postId, payload)
                navigate(`/r/${selectedCommunity}/comments/${updatedPost.id}/${updatedPost.slug}`)
                return
            }

            const newPost = await createPost(payload)
            navigate(`/r/${selectedCommunity}/comments/${newPost.id}/${newPost.slug}`)
        } catch (error) {
            console.error(`Error ${isEditMode ? "updating" : "creating"} post:`, error)
            alert("Failed to submit post. Please try again.")
        }
    }

    const communitiesQuery = useQuery({
        queryKey: ["my-communities"],
        queryFn: getMyCommunities,
    })

    const flairsQuery = useQuery({
        queryKey: ["flairs", selectedCommunity],
        queryFn: async () => await getFlairs(selectedCommunity),
        enabled: selectedCommunity.length > 0,
    })

    const handleCommunitySelection = async (communityName: string) => {
        setSelectedCommunity(communityName)
        navigate(`/r/${communityName}/submit`)
    }

    return (
        <section className="flex min-w-0 flex-1 flex-col gap-5 lg:pr-3">
            <div className="flex items-center justify-between font-bold">
                <h1>{isEditMode ? "Edit Post" : "Create Post"}</h1>
                <p className="text-[1.8rem]">Drafts</p>
            </div>

            <AriaSelect
                className="[&_.aria-select-trigger]:rounded-[25px] [&_.aria-select-trigger]:border-0 [&_.aria-select-trigger]:bg-gray-300 [&_.aria-select-trigger]:px-6 [&_.aria-select-trigger]:py-2.5"
                ariaLabel="Choose community"
                name="choose-community"
                placeholder="Select a community"
                selectedKey={selectedCommunity}
                onSelectionChange={handleCommunitySelection}
                options={
                    communitiesQuery.data?.map((community) => ({
                        id: community.name,
                        label: community.name,
                    })) ?? []
                }
            />

            <div className="flex rounded-[24px] border border-gray-300 bg-white p-1">
                {POST_TABS.map((tab) => (
                    <Button
                        key={tab.id}
                        onPress={() => setPostType(tab.id)}
                        className={`flex-1 rounded-[20px] px-4 py-3 font-semibold ${
                            postType === tab.id ? "bg-gray-900 text-white" : "bg-transparent text-gray-600"
                        }`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            <TextField aria-label="Post title" value={title} onChange={setTitle} isRequired>
                <Input
                    className="block h-[60px] w-full rounded-[30px] border border-gray-500 px-5"
                    type="text"
                    placeholder="Title"
                />
            </TextField>

            <AriaSelect
                className="[&_.aria-select-trigger]:rounded-[25px] [&_.aria-select-trigger]:border-0 [&_.aria-select-trigger]:bg-gray-300 [&_.aria-select-trigger]:px-6 [&_.aria-select-trigger]:py-2.5"
                ariaLabel="Choose flair"
                name="flair-tag"
                placeholder="Select a flair"
                selectedKey={selectedFlair}
                onSelectionChange={setSelectedFlair}
                options={
                    flairsQuery.data?.map((flair) => ({
                        id: flair.title,
                        label: flair.title,
                    })) ?? []
                }
            />

            {postType === "media" && (
                <div className="rounded-[24px] border-2 border-dashed border-gray-400 p-6">
                    <Input
                        aria-label="Upload images or videos"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                    />

                    {mediaFiles.length > 0 && (
                        <div className="mt-5 flex gap-4 overflow-x-auto">
                            {mediaFiles.map((file, index) => (
                                <div key={`${file.name}-${index}`} className="min-w-[180px] rounded-xl border p-3">
                                    <p className="truncate text-sm font-semibold">{file.name}</p>

                                    {file.type.startsWith("image/") && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="mt-3 h-[120px] w-full rounded-lg object-cover"
                                        />
                                    )}

                                    {file.type.startsWith("video/") && (
                                        <video
                                            src={URL.createObjectURL(file)}
                                            className="mt-3 h-[120px] w-full rounded-lg object-cover"
                                            controls
                                        />
                                    )}

                                    <Button
                                        className="mt-3 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                                        onPress={() => removeMediaFile(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {postType === "link" && (
                <TextField aria-label="Post link" value={linkUrl} onChange={setLinkUrl}>
                    <Input
                        className="block h-[55px] w-full rounded-[24px] border border-gray-500 px-5"
                        type="url"
                        placeholder="https://example.com"
                    />
                </TextField>
            )}
            <div className='w-full'>
                <RichTextEditor
                    key={isEditMode && editState ? `edit-${editState.postId}` : "create-post"}
                    onChange={handleEditorChange}
                    initialEditorState={editState?.content_json ?? EMPTY_EDITOR_STATE}
                />
            </div>
            <div className="mr-8 flex justify-end gap-8">
                <Button className="rounded-[20px] border-0 px-4 py-2.5">Save Draft</Button>
                <Button className="rounded-[20px] border-0 px-4 py-2.5" onPress={handleSubmit}>
                    {isEditMode ? "Save Changes" : "Post"}
                </Button>
            </div>
        </section>
    )
}

export default PostCreationForm
