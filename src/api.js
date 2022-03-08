const API_URL = 'http://localhost:3000'

export async function getComments() {
  const response = await fetch(API_URL + '/comments')
  if (response.ok) {
    return await response.json()
  } else return []
}

// export async function getCommentReplies(commentId) {
//   const response = await fetch(`${API_URL}/comments/${commentId}/replies`)
//   if (response.ok) {
//     return await response.json()
//   } else return []
// }

export async function getCurrentUser() {
  const response = await fetch(API_URL + '/currentUser')
  if (response.ok) {
    return await response.json()
  }
}

export async function postComment(comment) {
  await fetch(API_URL + '/comments', {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(comment)
  })
}

export async function postReply(commentId, comment) {
  await fetch(`${API_URL}/comments/${commentId}/replies`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(comment)
  })
}

export async function editComment(commentId, comment) {
  try {
    const requestUrl = commentId
      ? `${API_URL}/comments/${commentId}/replies/${comment.id}`
      : `${API_URL}/comments/${comment.id}`

    await fetch(requestUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'PUT',
      body: JSON.stringify(comment)
    })
  } catch (err) {
    throw new Error(err)
  }
}

export async function deleteComment(commentId, id) {
  const requestUrl = commentId
    ? `${API_URL}/comments/${commentId}/replies/${id}`
    : `${API_URL}/comments/${id}`

  await fetch(requestUrl, {
    method: 'DELETE',
  })
}

export async function voteComment(user, vote) {
  user.votedCommentsIds.push(vote)
  await fetch(`${API_URL}/currentUser`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(user)
  })
}

export async function removeVote(user, id) {
  user.votedCommentsIds.filter(vote => vote.id !== id)
  await fetch(`${API_URL}/currentUser`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(user)
  })
}