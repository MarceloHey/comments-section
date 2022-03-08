import { UserContextProvider } from "./UserContext"

const GlobalContext = ({ children }) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default GlobalContext