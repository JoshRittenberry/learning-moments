export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?&_embed=postLikes&_embed=comments&_expand=user&_expand=topic").then(res => res.json())
}

export const getAllUserPosts = (id) => {
    return fetch(`http://localhost:8088/posts?userId=${id}&_embed=postLikes&_embed=comments&_expand=user&_expand=topic`).then(res => res.json())
}

export const getAllUserPostLikes = (id) => {
    return fetch(`http://localhost:8088/postLikes?userId=${id}`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}&_embed=postLikes&_embed=comments&_expand=user&_expand=topic`).then(res => res.json())
}

export const getAllPostLikes = () => {
    return fetch(`http://localhost:8088/postLikes`).then(res => res.json())
}

export const getPostLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/postLikes?postId=${postId}`).then(res => res.json())
}

// My Code
// export const updatePostLikes = (postId, userId) => {

//     getAllPostLikes().then(data => {
//         const allPostLikes = data

//         // Finds a commentLike object that matches the commentId and userId, if it doesn't find one it is null
//         const currentPostLike = allPostLikes?.find(postLike => postLike.userId === userId && postLike.postId === postId)

//         // If currentCommentLike is an object, delete that object
//         if (currentPostLike) {
//             return fetch(`http://localhost:8088/postLikes/${currentPostLike.id}`, {
//                 method: "DELETE",
//             }).then(() => {
//                 console.log(`postLike #${currentPostLike.id} Removed`)
//             })
//         }

//         // If currentCommentLike is null, create an object for it
//         else {
//             const postLike = {
//                 "userId": userId,
//                 "postId": postId
//             }

//             return fetch(`http://localhost:8088/postLikes`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(postLike),
//             }).then(() => {
//                 console.log(`postLike Added`)
//             })
//         }
//     })
// }

export const updatePostLikes = (postId, userId) => {
    return getAllPostLikes().then(data => { // Ensure this promise is returned
        const allPostLikes = data
        const currentPostLike = allPostLikes?.find(postLike => postLike.userId === userId && postLike.postId === postId)

        if (currentPostLike) {
            return fetch(`http://localhost:8088/postLikes/${currentPostLike.id}`, {
                method: "DELETE",
            }).then(() => {
                console.log(`postLike #${currentPostLike.id} Removed`);
            })
        } else {
            const postLike = {
                "userId": userId,
                "postId": postId
            }

            return fetch(`http://localhost:8088/postLikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postLike),
            }).then(() => {
                console.log(`postLike Added`)
            })
        }
    })
}


export const createNewPost = (postObj) => {
    return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj),
        }).then(() => {
            console.log(`post Added`)
    })
}

export const editPost = (postObj, postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topicId: postObj.topicId,
            title: postObj.title,
            body: postObj.body,
        }),
    }).then(() => {
        console.log(`post #${postId} Updated`)
    })
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`post #${postId} Deleted`)
    })
}

export const deletePostLike = (postLikeId) => {
    return fetch(`http://localhost:8088/postLikes/${postLikeId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`postLike #${postLikeId} Deleted`)
    })
}