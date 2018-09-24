import React, { Component } from "react"
import firebase from "./lib/firebase"
import UserContext from "./UserContext"

class UserStore extends Component {
  state = {
    user: null
  }

  setUser = user => {
    this.setState({ user: user })
    localStorage.setItem("user", user.uid)
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: null })
        localStorage.removeItem("user")
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          logout: this.logout,
          setUser: this.setUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserStore
