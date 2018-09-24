import React from "react"
import Nav from "./Nav"

const Layout = props => {
  return (
    <React.Fragment>
      <Nav />
      {props.children}
    </React.Fragment>
  )
}

export default Layout
