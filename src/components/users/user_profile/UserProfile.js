import "./UserProfile.css"
import { useEffect, useState } from "react"
import { Post } from "../../posts/Post"
import { getAllUserPosts } from "../../../services/postService"
import { useParams } from "react-router-dom"
import { getUserById } from "../../../services/userService"

export const UserProfile = ({ currentUser }) => {
    const [user, setUser] = useState({})
    const [showPosts, setShowPosts] = useState([])
    const {userId} = useParams()

    useEffect(() => {
        getUserById(userId).then(userObj => {
            setUser(userObj[0])
        })
        getAllUserPosts(userId).then(postArray => {
            setShowPosts(postArray)
        })
    }, [])

    return (
        <section className="user-profile-container">
            {/* User Info */}
            <div className="post-creator-container">
                <div className="creator-profile-picture">
                    <img src={user?.pictureUrl}></img>
                </div>
                    <h3>{user?.firstName} {user?.lastName}</h3>
                <div>
                    <h5>Number of Posts: {user.posts?.length}</h5>
                    <h5>Number of Posts Favorited: {user.postLikes?.length}</h5>
                    <h5>Number of Comments: {user.comments?.length}</h5>
                    <h5>Number of Comments Favorited: {user.commentLikes?.length}</h5>
                </div>
            </div>

            {/* User Posts */}
            <article className="profile-posts">
                {showPosts.map(postObj => {
                    return (
                        <div key={postObj.id}>
                            <Post post={postObj} currentUserId={currentUser.id} userId={userId} />
                        </div>
                    )
                })}
            </article>
        </section>
    )
}