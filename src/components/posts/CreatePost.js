import { useState } from "react"
import "./CreatePost.css"
import { PostTopicDropdown } from "./PostTopicDropdown"
import { CreatePostSaveBtn } from "./CreatePostSaveBtn"

export const CreatePost = ({ currentUser }) => {
    const [postValues, setPostValues] = useState({
        userId: currentUser.id,
        topicId: 0,
        title: "",
        body: "",
        date: ""
    })

    return (
        <div className="new-post-container">
            {/* New Post Header */}
            <header className="new-post-header">
                <h1>Create A New Post</h1>
            </header>

            {/* New Post Main Section */}
            <section className="new-post-main">

                {/* Input Form */}
                <form>
                    {/* New Post Top Inputs */}
                    <div className="post-creator-top">
                        {/* Title Input */}
                        <input
                            className="post-title"
                            type="text"
                            placeholder="Post Title"
                            required
                            value={postValues.title}
                            onChange={(event) => {
                                const copy = { ...postValues }
                                copy.title = event.target.value
                                setPostValues(copy)
                            }}
                        />
                        {/* Topic Dropdown */}
                        <PostTopicDropdown setPostValues={setPostValues} postValues={postValues} />
                    </div>

                    {/* New Post Main Inputs */}
                    <div className="post-creator-middle">
                        {/* Body Textarea */}
                        <textarea
                            className="post-body"
                            type="text"
                            placeholder="Post Body"
                            required
                            value={postValues.body}
                            onChange={(event) => {
                                const copy = { ...postValues }
                                copy.body = event.target.value
                                setPostValues(copy)
                            }}
                        />
                    </div>
                </form>
                

                {/* New Post Footer/Buttons */}
                <footer className="post-creator-bottom">
                    <CreatePostSaveBtn postValues={postValues} setPostValues={setPostValues} />
                    <button>Cancel</button>
                </footer>

            </section>
        </div>
    )
}