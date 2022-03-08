import { createContext, useEffect, useState } from "react"
import { getCurrentUser } from "./api"

const DEFAULT_VALUE = {
  votedCommentsIds: [],
  image: {
    png: '',
    webp: ''
  },
  username: ''
}

const UserContext = createContext(DEFAULT_VALUE)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_VALUE)

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider }
export default UserContext