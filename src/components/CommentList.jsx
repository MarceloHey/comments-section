import { useEffect, useState } from 'react'
import { getComments } from '../api'
import styles from '../styles/CommentList.module.css'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentList = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchComments() {
      setComments(await getComments())
    }
    fetchComments()
    console.log(comments)
  }, [])

  if (comments.length > 0)
    return (
      <>
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                comment={comment}
                setComments={setComments}
                canReply={true}
              />
            </li>
          ))}
        </ul>
        <CommentForm setComments={setComments} />
      </>
    )
  else return null
}

export default CommentList