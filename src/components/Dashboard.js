import React from "react"
import withUserContext from "../utils/withUserContext"
import Layout from "./Layout"

const Dashboard = props => {
  const { user } = props
  return (
    <Layout>
      {user && (
        <React.Fragment>
          <p>{user.email}</p>
          <p>{user.displayName}</p>
          <p>{user.phoneNumber}</p>
        </React.Fragment>
      )}
    </Layout>
  )
}

export default withUserContext(Dashboard)
