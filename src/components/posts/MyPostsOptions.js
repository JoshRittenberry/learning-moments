import { useEffect, useState } from "react"
import { deletePost, deletePostLike } from "../../services/postService"
import { deletePostComment, deletePostCommentLike, getCommentLikesByCommentId } from "../../services/commentService"
import { Link, useNavigate } from "react-router-dom"

export const MyPostsOptions = ({ post }) => {
    const [postLikes, setPostLikes] = useState([])
    const [postComments, setPostComments] = useState([])
    const [postCommentLikes, setPostCommentLikes] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        setPostLikes(post.postLikes)
        setPostComments(post.comments)

        // Use Promise.all to handle an array of promises
        Promise.all(post.comments.map(postComment => {
            return getCommentLikesByCommentId(postComment.id);
        }))
            .then(allCommentLikesArrays => {
                // Flatten the array of arrays into a single array
                const flattenedCommentLikes = [].concat.apply([], allCommentLikesArrays);
                setPostCommentLikes(flattenedCommentLikes);
            });

    }, [post])

    return (
        <div className="dropdown">
            <div className="btn-group">
                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Post Options
                </button>
                <ul className="dropdown-menu">

                    {/* Edit Button */}
                    <li>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => {
                                navigate(`/post_editor/${post.id}`)
                            }}
                        >
                            Edit
                        </a>
                    </li>
                    
                    {/* Delete Button */}
                    <li>
                        <a
                            className="dropdown-item" 
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();

                                // Delete postLikes associated with post
                                const postLikeDeletions = postLikes.map(postLike => deletePostLike(postLike.id));

                                // Delete commentLikes associated with post's comments
                                const postCommentLikeDeletions = postCommentLikes.map(postCommentLike => deletePostCommentLike(postCommentLike.id));

                                // Deletes comments associated with post
                                const postCommentDeletions = postComments.map(postComment => deletePostComment(postComment.id));

                                // Wait for all postLikes, postCommentLikes, and postComments to be deleted first
                                Promise.all([...postLikeDeletions, ...postCommentLikeDeletions, ...postCommentDeletions])
                                    .then(() => {
                                        // After all associated data has been deleted, delete the post
                                        return deletePost(post.id)
                                    })
                                    .then(() => {
                                        console.log('Post and all associated data successfully deleted!')
                                        navigate("/")
                                    })
                            }}
                        >
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}