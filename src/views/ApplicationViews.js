import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { useEffect, useState } from "react"
import { getUserById } from "../services/userService"
import { ViewPost } from "../components/posts/ViewPost"
import { CreatePost } from "../components/posts/CreatePost"
import { EditPost } from "../components/posts/EditPost"
import { MyPosts } from "../components/posts/MyPosts"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        getUserById(learningUserObject.id).then(user => setCurrentUser(user[0]))
    }, [])

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllPosts currentUser={currentUser} />} />
                <Route path="view_post">
                    <Route path=":postId" element={<ViewPost currentUser={currentUser}/>} />
                </Route>
                <Route path="post_editor">
                    <Route index element={<CreatePost currentUser={currentUser} />} />
                    <Route path=":postId" element={<EditPost currentUser={currentUser}/>} />
                </Route>
                <Route path="my_posts" element={<MyPosts currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}