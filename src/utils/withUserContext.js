import React from "react"
import UserContext from "../UserContext"

const withUserContext = Component => {
  return props => (
    <UserContext.Consumer>
      {({ user, setUser, logout }) => {
        return (
          <Component {...props} user={user} logout={logout} setUser={setUser} />
        )
      }}
    </UserContext.Consumer>
  )
}
export default withUserContext
