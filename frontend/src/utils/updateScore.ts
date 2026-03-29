export function updateScore(score: number, value: 1 | -1, vote_status: 'upvoted' | 'downvoted' | 'not_voted') {
    if(value === 1 && vote_status == 'not_voted') return {score: score + 1, vote_status: 'upvoted'}
    if(value === -1 && vote_status === 'not_voted') return {score: score - 1, vote_status: 'downvoted'}
    if(value === 1 && vote_status === 'upvoted') return {score: score - 1, vote_status: 'not_voted'}
    if(value == -1 && vote_status === 'upvoted') return {score: score - 2, vote_status: 'downvoted'}
    if(value === 1 && vote_status === 'downvoted') return {score: score + 2, vote_status: 'upvoted'}
    if(value === -1 && vote_status === 'downvoted') return {score: score + 1, vote_status: 'not_voted'}
}