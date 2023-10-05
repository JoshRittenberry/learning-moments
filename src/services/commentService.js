export const getCommentById = (commentId) => {
    return fetch(`http://localhost:8088/comments?id=${commentId}&_expand=user&_embed=commentLikes`).then(res => res.json())
}

export const getAllCommentLikes = () => {
    return fetch(`http://localhost:8088/commentLikes`).then(res => res.json())
}

export const getCommentLikesByCommentId = (commentId) => {
    return fetch(`http://localhost:8088/commentLikes?commentId=${commentId}`).then(res => res.json())
}

export const updateCommentLikes = (commentId, userId) => {
    
    return getAllCommentLikes().then(data => {
        const allCommentsLikes = data

        // Finds a commentLike object that matches the commentId and userId, if it doesn't find one it is null
        const currentCommentLike = allCommentsLikes?.find(commentLike => commentLike.userId === userId && commentLike.commentId === commentId)

        // If currentCommentLike is an object, delete that object
        if (currentCommentLike) {
            return fetch(`http://localhost:8088/commentLikes/${currentCommentLike.id}`, {
                method: "DELETE",
            }).then(() => {
                console.log(`commentLike #${currentCommentLike.id} Removed`)
            })
        }

        // If currentCommentLike is null, create an object for it
        else {
            const commentLike = {
                "userId": userId,
                "commentId": commentId
            }

            return fetch(`http://localhost:8088/commentLikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentLike),
            }).then(() => {
                console.log(`commentLike Added`)
            })
        }
    })
}

export const deletePostCommentLike = (commentLikeId) => {
    return fetch(`http://localhost:8088/commentLikes/${commentLikeId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`commentLike #${commentLikeId} Deleted`)
    })
}

export const deletePostComment = (commentId) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`comment #${commentId} Deleted`)
    })
}