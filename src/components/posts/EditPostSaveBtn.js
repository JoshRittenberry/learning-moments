import { Link } from "react-router-dom"
import { createNewPost } from "../../services/postService"

export const EditPostSaveBtn = ({ postValues, setPostValues }) => {
    return (
        <Link
            to="/"
            onClick={(event) => {
                if (postValues.title === "" || postValues.body === "" || postValues.topicId === 0) {
                    alert("Please fill out all fields!")
                    event.preventDefault()
                    return
                } else {
                    const copy = { ...postValues }
                    const date = new Date();

                    let month = (date.getMonth() + 1).toString().padStart(2, '0');
                    let day = date.getDate().toString().padStart(2, '0');
                    let year = date.getFullYear();

                    let hours = date.getHours().toString().padStart(2, '0');
                    let minutes = date.getMinutes().toString().padStart(2, '0');
                    let seconds = date.getSeconds().toString().padStart(2, '0');

                    copy.date = `${month}-${day}-${year}T${hours}:${minutes}:${seconds}`;

                    setPostValues(copy);
                    createNewPost(postValues);
                }
            }}
        >
            <button>
                Save
            </button>
        </Link>
    )
}