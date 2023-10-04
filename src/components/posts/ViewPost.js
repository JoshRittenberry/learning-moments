import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import "./ViewPost.css"
import { GetPostComments } from "./GetPostComments"
import { PostLikeButton } from "./PostLikeButton"

export const ViewPost = ({ currentUser }) => {
    const [post, setPost] = useState({})
    const [currentUserIsAuthor, setCurrentUserIsAuthor] = useState(false)
    const {postId} = useParams()

    const navigate = useNavigate()

    // Sets the current post
    useEffect(() => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])

    // Sets a boolean to tell if the current user is or isn't the author of the viewed post
    useEffect(() => {
        if (currentUser.id === post.userId) {
            setCurrentUserIsAuthor(true)
        } else {
            setCurrentUserIsAuthor(false)
        }
    },[post])

    return (
        <div className="view-post-container">
            {/* Post Header */}
            <header className="post-header">
                <h1>{post?.title}</h1>
            </header>

            {/* Post Main Section */}
            <section className="post-main">

                {/* Post Header */}
                <div className="post-creator-container">
                    <div className="creator-profile-picture">
                        <img src={post.user?.pictureUrl}></img>
                    </div>
                    <h3>{post.user?.firstName} {post.user?.lastName}</h3>
                    <h5>Topic: {post.topic?.name}</h5>
                    <h5>Date Posted: {post.date}</h5>
                    <h5>Total Post Likes: {post.postLikes?.length}</h5>
                </div>

                {/* Post Body */}
                <div className="post-body-container">
                    {post.body}
                </div>

                {/* Post Comments */}
                <div className="post-comments-container">
                    {post.comments?.map(commentObj => {
                        return(
                            <GetPostComments commentId={commentObj.id} userId={currentUser.id} key={commentObj.id}/>
                        )
                    })}
                </div>
            </section>

            {/* Post Footer */}
            <footer className="post-footer">
                {currentUserIsAuthor && (
                    <button className="post-edit-btn" onClick={() => {
                        navigate(`/post_editor/${postId}`)
                    }}>
                        Edit
                    </button>
                )}
                {!currentUserIsAuthor && (
                    <PostLikeButton postId={post.id} postLikes={post.postLikes} userId={currentUser.id} />
                )}
                <button className="post-comment-btn">Comment</button>
                <button className="post-return-btn" onClick={() => {
                    {currentUserIsAuthor && (navigate("/my_posts"))}
                    {!currentUserIsAuthor && (navigate("/"))}
                }}>Return</button>
            </footer>
        </div>
    )
}