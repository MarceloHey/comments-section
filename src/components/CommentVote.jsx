import { useContext, useEffect, useState } from 'react';
import { editComment, getComments, removeVote, voteComment } from '../api';
import styles from '../styles/CommentVote.module.css'
import UserContext from '../UserContext';


const CommentVote = ({ setComments, comment }) => {
  const userContext = useContext(UserContext)
  const [canUpvote, setCanUpvote] = useState(true)
  const [canDownvote, setCanDownvote] = useState(true)
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)

  useEffect(() => {
    if (userContext.votedCommentsIds.some(c => c.id === comment.id && c.vote === 'up')) {
      setCanUpvote(false)
      setCanDownvote(true)
      setUpvoted(true)
    }
    if (userContext.votedCommentsIds.some(c => c.id === comment.id && c.vote === 'down')) {
      setCanUpvote(true)
      setCanDownvote(false)
      setDownvoted(true)
    }
  }, [])

  async function handleUpvote() {
    if (!canUpvote) {
      if (upvoted) {
        const updatedComment = { ...comment, score: --comment.score }
        // await removeVote(userContext, )
        await editComment(null, updatedComment)
        setComments(await getComments())
        setCanUpvote(true)
        setCanDownvote(true)
      }
    } else {
      const updatedComment = { ...comment, score: ++comment.score }
      await editComment(null, updatedComment)
      setComments(await getComments())
      await voteComment(userContext, { commentId: comment.id, vote: 'up' })
      setCanUpvote(false)
      setCanDownvote(true)
    }
  }

  async function handleDownvote() {
    if (!canDownvote) {
      if (downvoted) {
        const updatedComment = { ...comment, score: ++comment.score }
        await editComment(null, updatedComment)
        setComments(await getComments())
        setCanDownvote(true)
        setCanUpvote(true)
      }
    } else {
      const updatedComment = { ...comment, score: --comment.score }
      await editComment(null, updatedComment)
      setComments(await getComments())
      await voteComment(userContext, { commentId: comment.id, vote: 'down' })
      setCanDownvote(false)
      setCanUpvote(true)
    }
  }

  return (
    <div className={styles.vote}>
      <button
        disabled={downvoted}
        className={upvoted ? styles.active : ''}
        onClick={handleUpvote}>+</button>
      <div className={styles.voteDisplay}>{comment.score}</div>
      <button
        disabled={comment.score < 1 || upvoted}
        className={downvoted ? styles.active : ''}
        onClick={handleDownvote}>-</button>
    </div>
  )
}
export default CommentVote