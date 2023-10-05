import "./MyProfile.css"
import { useEffect, useState } from "react"
import { Post } from "../../posts/Post"
import { getAllUserPosts } from "../../../services/postService"

export const MyProfile = ({ currentUser }) => {
    const [showPosts, setShowPosts] = useState([])

    useEffect(() => {
        getAllUserPosts(currentUser.id).then(postArray => {
            setShowPosts(postArray)
        })
    }, [])

    return (
        <section className="user-profile-container">
            {/* User Info */}
            <div className="post-creator-container">
                <div className="creator-profile-picture">
                    <img src={currentUser?.pictureUrl}></img>
                </div>
                    <h3>{currentUser?.firstName} {currentUser?.lastName}</h3>
                <div>
                    <h5>Number of Posts: {currentUser?.posts.length}</h5>
                    <h5>Number of Posts Favorited: {currentUser?.postLikes.length}</h5>
                    <h5>Number of Comments: {currentUser?.comments.length}</h5>
                    <h5>Number of Comments Favorited: {currentUser?.commentLikes.length}</h5>
                </div>
                <div>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>

            {/* User Posts */}
            <article className="profile-posts">
                {showPosts.map(postObj => {
                    return (
                        <div key={postObj.id}>
                            <Post post={postObj} currentUserId={currentUser.id} userId={currentUser.id}/>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}