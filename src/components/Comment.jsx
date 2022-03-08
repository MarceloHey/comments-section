import styles from '../styles/Comment.module.css'
import CommentVote from './CommentVote'
import { ReactComponent as Reply } from '../assets/images/icon-reply.svg'
import { ReactComponent as Edit } from '../assets/images/icon-edit.svg'
import { ReactComponent as Delete } from '../assets/images/icon-delete.svg'
import CommentForm from './CommentForm'
import { useContext, useState } from 'react'
import UserContext from '../UserContext'
import { deleteComment, getComments } from '../api'

const Comment = ({ comment, setComments, canReply }) => {
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)
  const userContext = useContext(UserContext)

  function handleReply() {
    setReply(!reply)
  }

  function handleEdit() {
    setEdit(!edit)
  }

  async function hendleDelete() {
    await deleteComment(+comment.commentId || null, +comment.id)
    setComments(await getComments())
  }

  return (
    <div>
      <div className={styles.commentCard}>
        <div className={styles.votes}>
          <CommentVote setComments={setComments} comment={comment} />
        </div>
        <div className={styles.comment}>
          <div className={styles.commentHeader}>
            <div className={styles.commentInfo}>
              <img src={comment.user.image.webp} alt="Profile picture" className={styles.profilePicture} />
              <p>{comment.user.username}</p>
              <span>{comment.createdAt}</span>
            </div>
            {
              userContext && userContext.username && comment.user.username === userContext.username &&
              <div className={styles.buttons}>
                <button onClick={handleEdit} className={`${styles.edit} ${reply ? styles.active : ''}`}> <Edit /> Edit </button>
                <button onClick={hendleDelete} className={`${styles.delete} ${reply ? styles.active : ''}`}> <Delete /> Delete</button>
              </div>
            }
            {
              userContext && userContext.username && comment.user.username !== userContext.username && canReply &&
              <button onClick={handleReply} className={`${styles.reply} ${reply ? styles.active : ''}`}> <Reply /> Reply</button>
            }
          </div>
          {edit
            ? <CommentForm
              edit={true}
              setEdit={setEdit}
              data={comment}
              commentId={comment.commentId}
              setComments={setComments}
            />
            : <div className={styles.commentContent}>
              {comment.content}
            </div>
          }
        </div>
      </div>
      {reply &&
        <CommentForm
          setComments={setComments}
          setEdit={setEdit}
          setReply={setReply}
          replyTo={comment}
        />
      }
      {
        comment.replies && comment.replies.length > 0 &&
        <div className={styles.replies}>
          <ul>
            {comment.replies.map((reply) => (
              <li key={reply.id}>
                <Comment
                  comment={reply}
                  setComments={setComments}
                  canReply={false}
                />
              </li>
            ))}
          </ul>
        </div>
      }
    </div >
  )
}

export default Comment