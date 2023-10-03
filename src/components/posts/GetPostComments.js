import { useEffect, useState } from "react"
import { getCommentById, updateCommentLikes } from "../../services/commentService"

export const GetPostComments = ({ commentId, userId }) => {

    const [comment, setComment] = useState({})
    const [commentLikeStatus, setCommentLikeStatus] = useState(false)

    // Sets the current comment
    useEffect(() => {
        getCommentById(commentId).then(data => {
            const commentObj = data[0]
            setComment(commentObj)
        })
    }, [commentId])

    // Sets a boolean to tell if the current user has liked the current comment or not
    useEffect(() => {
        const liked = comment.commentLikes?.find(commentLike => commentLike.userId === userId)

        if (liked) {
            setCommentLikeStatus(true)
        }
    }, [comment])

    return (
        // Comment Container
        <div className="comment-container">

            {/* Comment Header */}
            <header className="comment-header">
                <div className="comment-creator">{comment.user?.firstName} {comment.user?.lastName}</div>
                <div className="comment-date">{comment.date}</div>
            </header>

            {/* Comment Body */}
            <section className="comment-main">
                <div className="comment-body">{comment.body}</div>
            </section>

            {/* Comment Footer */}
            <footer className="comment-footer">
                {commentLikeStatus && (
                    <button className="comment-like-btn" onClick={() => {
                        updateCommentLikes(commentId, userId)
                        setCommentLikeStatus(!commentLikeStatus)
                    }}>
                        <i className="fa-solid fa-heart"></i>
                    </button>
                )}
                {!commentLikeStatus && (
                    <button className="comment-like-btn" onClick={() => {
                        updateCommentLikes(commentId, userId)
                        setCommentLikeStatus(!commentLikeStatus)
                    }}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                )}
                <div className="comment-like-count">
                    {comment.commentLikes?.length} Total Comment Likes
                </div>
            </footer>

        </div>
    )
}