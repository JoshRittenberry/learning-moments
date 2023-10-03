import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MyPostsOptions } from "./MyPostsOptions"

export const Post = ({ post, currentUserId }) => {

    const [isMyPost, setIsMyPost] = useState(false)

    useEffect(() => {
        if (post.userId === currentUserId) {
            setIsMyPost(!isMyPost)
        }
    }, [post, currentUserId])

    return (
        <div className="post-preview">
            <div className="post-preview-header">
                <Link to={`/view_post/${post.id}`}>
                    <h5>{post.title}</h5>
                </Link>
                {isMyPost && <MyPostsOptions post={post} />}
            </div>

            <h6>Topic: {post.topic.name}</h6>
            <h6>Date Posted: {post.date}</h6>
            <h6>Total Post Likes: {post.postLikes.length}</h6>
        </div>
    )
}