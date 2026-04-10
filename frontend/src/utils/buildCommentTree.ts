import type { PostComment } from '../services/comments'

export type CommentNode = PostComment & {
    children: CommentNode[]
}

export function buildCommentTree(comments: PostComment[]) : CommentNode[] {
    console.log('build comment tree', comments)
    const map = new Map<number, CommentNode>()
    const roots : CommentNode[] = []

    comments.forEach(comment => {
        map.set(comment.id, {...comment, children: []})
    })

    comments.forEach(comment => {
        const node = map.get(comment.id)
        if(comment.parent === null) {
            roots.push(node!)
        }else{
            map.get(comment.parent)?.children.push(node!)
        }
    })
    return roots
}