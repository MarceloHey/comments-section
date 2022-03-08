import styles from '../styles/CommentForm.module.css'
import { useContext, useEffect, useState } from 'react'
import { editComment, getComments, postComment, postReply } from '../api'
import UserContext from '../UserContext'

const CommentForm = ({ username, edit, data, setComments, setEdit, setReply, replyTo }) => {
  const [comment, setComment] = useState('')
  const userContext = useContext(UserContext)

  useEffect(() => {
    if (edit && data.content) {
      setComment(data.content)
    }
    if (replyTo) {
      setComment(`@${replyTo.user.username}`)
    }
  }, [])

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (edit) {
      const newComment = { ...data, content: comment }
      await editComment(data.commentId || null, newComment)
      setComments(await getComments())
      setEdit(false)
    } else {
      const newComment = {
        createdAt: 'Today',
        content: comment,
        score: 0,
        user: {
          image: {
            png: userContext.image.png,
            webp: userContext.image.webp
          },
          replyingTo: replyTo && replyTo.user.username || '',
          username: userContext.username
        },
        replies: []
      }
      if (replyTo) {
        await postReply(+replyTo.id, newComment)
        setReply(false)
      } else {
        await postComment(newComment)
      }
    }
    setComments(await getComments())
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className={`${edit ? styles.formEdit : styles.form}`}>
      {!edit && <img src={userContext.image.webp} alt="" />}
      <textarea
        placeholder='Add a comment...'
        name="comment"
        id="comment"
        value={comment}
        onChange={(ev) => setComment(ev.target.value)}
      ></textarea>
      {edit ? <button>EDIT</button> : <button>{username ? 'REPLY' : 'SEND'}</button>}
    </form>
  )
}

export default CommentForm