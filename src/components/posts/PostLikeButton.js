import { useEffect, useState } from "react"
import { updatePostLikes } from "../../services/postService"

export const PostLikeButton = ({ postId, postLikes, userId}) => {
    const [postLikeStatus, setPostLikeStatus] = useState(false)

    useEffect(() => {
        // Looks to find if there is a postLike that is owned by the current user
        const postLikeObj = postLikes?.find(postLike => postLike.postId === postId && postLike.userId === userId)

        if (postLikeObj) {
            setPostLikeStatus(true)
        } else {
            setPostLikeStatus(false)
        }
    }, [postId, postLikes])

    return (
        <>
            {postLikeStatus && (
                <button className="pst-like-btn" onClick={() => {
                    updatePostLikes(postId, userId)
                    setPostLikeStatus(!postLikeStatus)
                }}>
                    <i className="fa-solid fa-heart"></i>
                </button>
            )}
            {!postLikeStatus && (
                <button className="pst-like-btn" onClick={() => {
                    updatePostLikes(postId, userId)
                    setPostLikeStatus(!postLikeStatus)
                }}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            )}
        </>
    )
}