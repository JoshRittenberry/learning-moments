export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/users?id=${id}&_embed=posts&_embed=postLikes&_embed=comments&_embed=commentLikes`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const editUser = (userObj, userId) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      cohort: userObj.cohort,
      pictureUrl: userObj.pictureUrl
    }),
  }).then(() => {
    console.log(`user #${userId} Updated`)
  })
}
